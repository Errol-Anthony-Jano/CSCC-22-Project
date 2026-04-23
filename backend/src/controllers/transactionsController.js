import { registerConsoleShortcuts } from "vitest/node";
import models, { sequelize } from "../config/db.js";
import { where } from "sequelize";
import { getValidProduct, getValidUser, insertTransactionItem, isPayloadIdentical, patchTransactionPayload, validatePurchasedAmount } from "../services/transactionService.js";
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
        const txnItem = await insertTransactionItem(productJSON, txnJSON, item, t);

        await models.products.decrement('product_quantity', {
            by: item.quantity_bought,
            where: {
                product_id: item.product_id,
            },
            transaction: t,
        })
    }

    return txn;
}

export const updateTransaction = async (oldTxn, updatedPayload, t) => {
    console.log("im here");
    // rollback items
    for (const item of oldTxn.transaction_items) {
        const product = await getValidProduct(item.product_id, t);
        await product.increment('product_quantity', {
            by: item.quantity_bought,
            transaction: t,
        })
    }

    await models.transactions.update(
        { voided_at: new Date(), prev_txn_id: oldTxn.transaction_id },
        { where: { transaction_id: oldTxn.transaction_id }, transaction: t }
    );

    const newTxn = await insertTransaction(updatedPayload, t);

    return newTxn;
}