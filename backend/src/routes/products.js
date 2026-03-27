import express from "express";

export const productsRouter = express.Router();

import models from "../config/db.js";
import products from "../models/products.js";

// -> get all products
productsRouter.get('/', async (req, res) => {
  const products = await models.products.findAll();
  res.json(products);
})

// -> get products from a certain business
productsRouter.get('/:businessId', async (req, res) => {
  const businessId = req.params.businessId;
  const products = await models.products.findAll({
    where: {
      business_id: businessId,
    }
  })
  res.json(products);
})

// -> add new product
