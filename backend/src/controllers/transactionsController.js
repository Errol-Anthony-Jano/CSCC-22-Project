import { registerConsoleShortcuts } from "vitest/node";
import models, { sequelize } from "../config/db.js";
import { where } from "sequelize";
import { getValidProduct, getValidUser, insertTransactionItem, isPayloadIdentical, patchTransactionPayload, validatePurchasedAmount } from "../services/transactionService.js";
import _ from "lodash";
// TODO: Create custom object comparison function for old and new payloads

export const insertTransaction = async (data, t) => {
    // req.body -> data 
    const user = await getValidUser(data.created_by, t)
    const { transaction_items, ...transactionData } = data  
    const txn = await models.transactions.create(transactionData, { transaction: t })
    const txnJSON = txn.toJSON()

    for (const item of transaction_items) {
        const product = await getValidProduct(item.product_id, t);
        const productJSON = product.toJSON();
        validatePurchasedAmount(item.quantity_bought, product.product_quantity)   
        const txnItem = await insertTransactionItem(productJSON, txnJSON, item, t)  
        await product.decrement('product_quantity', { by: item.quantity_bought }, { transaction: t });
    }

    return txnJSON;
}

export const updateTransaction = async (transactionId, patchPayload, t) => {
    const txn = await models.transactions.findByPk(transactionId, {
        include: {
            model: models.transaction_items,
            as: "transaction_items",
        }
    });
    const txnJSON = txn.toJSON();

    const updatedPayload = patchTransactionPayload(txnJSON, patchPayload);

    isPayloadIdentical(txnJSON, updatedPayload);

    updatedPayload["prev_txn_id"] = txn.transaction_id;
    
    // rollback items
    for (const item of txnJSON.transaction_items) {
        const product = await getValidProduct(item.product_id, t);
        await product.increment('product_quantity', { by: item.quantity_bought }, { transaction: t });
    }
    
    // remove fields first
    delete updatedPayload["transaction_id"];

    for (const item of updatedPayload.transaction_items) {
        delete item["transaction_id"];
        delete item["item_id"];
        delete item["product_name"];
        delete item["product_unit_price"];
    }

    await txn.update({ voided_at: Date.now () }, { transaction: t })

    const result = await insertTransaction(updatedPayload, t);

    return result;
}