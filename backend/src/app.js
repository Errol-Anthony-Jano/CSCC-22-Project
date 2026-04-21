import 'dotenv/config';
import express from 'express';
import { productsRouter } from "./routes/products.js";
import { transactionsRouter } from './routes/transactions.js';
import { usersRouter } from './routes/users.js';
import { reportsRouter } from './routes/reports.js';

const app = express();

app.use(express.json());

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.use("/products", productsRouter);
app.use("/transactions", transactionsRouter); 
app.use('/users', usersRouter);
app.use("/reports", reportsRouter);

export default app;
