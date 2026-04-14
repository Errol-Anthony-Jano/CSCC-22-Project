import express from "express";

export const transactionsRouter = express.Router();

import models, { sequelize } from "../config/db.js";

const transactionsSchema = {
  prev_txn_id: "number",
  transaction_timestamp: "number",
  payment_type: "string",
  payment_refstr: "string",
  created_by: "bigint",
  voided_at: "number",
}

//add error handling
// -> get all transactions
transactionsRouter.get('/', async (req, res) => {
  const transactions = await models.transactions.findAll({
    include: {
      model: models.transaction_items,
      as: "transaction_items",
    }
  });
  res.json(transactions);
})

// -> record transaction
transactionsRouter.post('/', async (req, res) => {
  try {
    const result = await sequelize.transaction(async t => {
      const newTransaction = await models.transactions.create(
        {
          "payment_type": req.body.payment_type,
        },
        { transaction: t },
      )

      const transactionItems = req.body.items.map(async (item) => {
        const transactionItem = await models.transaction_items.create(
          {
            "transaction_id": newTransaction.transaction_id,
            "product_id": item.product_id,
            "product_quantity": item.product_quantity,
          },
          { transaction: t },
        )
      })

      return await Promise.all(transactionItems);
    })

    res.json({ "message": "Success" })
  }
  catch (error) {
    res.json({ "message": error.message, "full_message": error.parent })
  }
})
