import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import { productsRouter } from "./routes/products.js";
import { transactionsRouter } from './routes/transactions.js';
import { usersRouter } from './routes/users.js';

const app = express();

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.use("/products", productsRouter);
app.use("/transactions", transactionsRouter); 
app.use('/users', usersRouter);

export default app;
