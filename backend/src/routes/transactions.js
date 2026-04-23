import express from "express";

export const transactionsRouter = express.Router();

import models, { sequelize } from "../config/db.js";
import { validate } from "../middleware/transactionsMiddleware.js";
import { insertTransaction, updateTransaction } from "../controllers/transactionsController.js";
import { insertTransactionSchema, updateTransactionSchema } from "../schemas/schemas.js";

/*
expected payload: 
{
  transaction: {...},
  items: {...},
}
*/

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
transactionsRouter.post('/', validate(insertTransactionSchema), async (req, res, next) => {
  try {
    await sequelize.transaction(async t => {
      const txnPayload = await insertTransaction(req.body, t);
      if (txnPayload) {
        return res.status(201).json({ message: "Transaction inserted successfully.", data: txnPayload });
      }
    })
  }
  catch (error) {
    return res.status(error.status || 500).json({ message: error.message });
  }
})

// -> update transaction 
transactionsRouter.post('/:transactionId', validate(updateTransactionSchema), async (req, res, next) => {
  try {
    await sequelize.transaction(async t => {
      const txnPayload = await updateTransaction(req.params.transactionId, req.body, t);
      if (txnPayload) {
        return res.status(200).json({ message: "Transaction updated successfully.", data: txnPayload });
      }
    })
  }
  catch (error) {
    return res.status(error.status || 500).json({ message: error.message });
  }
})