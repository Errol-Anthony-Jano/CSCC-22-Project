import { registerConsoleShortcuts } from "vitest/node";
import models, { sequelize } from "../config/db.js";
import { where } from "sequelize";
import { getValidProduct, getValidUser, insertTransactionItem, updateProductQuantity, validatePurchasedAmount } from "../services/transactionService.js";

export const insertTransaction = async (data, t) => {
    // req.body -> data 
    const user = await getValidUser(data.created_by, t) 
    const { items, ...transactionData } = data  
    const txn = await models.transactions.create(transactionData, { transaction: t })
    const txnJSON = txn.toJSON()

    for (const item of items) {
        const product = await getValidProduct(item.product_id, t);
        const productJSON = product.toJSON();
        await validatePurchasedAmount(item.quantity_bought, product.product_quantity)   
        const txnItem = await insertTransactionItem(productJSON, txnJSON, item, t)  
        await product.decrement('product_quantity', { by: item.quantity_bought }, { transaction: t });
    }

    return txnJSON;
}