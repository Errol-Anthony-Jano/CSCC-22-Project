import express from "express";

export const transactionsRouter = express.Router();

import models, { sequelize } from "../config/db.js";

// -> get all transactions
transactionsRouter.get('/', async (req, res) => {
  const transactions = await models.transactions.findAll();
  res.json(transactions);
})


