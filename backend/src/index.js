import { sequelize, testDBConnection } from './config/db.js'
import 'dotenv/config';
import express from 'express';
const app = express()
const port = 3000

app.get('/', (req, res) => {
  res.send('Hello World!')
})

const startServer = async () => {
  await testDBConnection();

  app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
  })
}

import { productsRouter } from "./routes/products.js";
import { transactionsRouter } from './routes/transactions.js';

app.use(express.json())
app.use("/products", productsRouter);
app.use("/transactions", transactionsRouter);

startServer();
