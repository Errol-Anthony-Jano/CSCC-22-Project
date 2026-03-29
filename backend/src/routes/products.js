import express from "express";

export const productsRouter = express.Router();

import models from "../config/db.js";
import products from "../models/products.js";

// -> get all products
productsRouter.get('/', async (req, res) => {
  const products = await models.products.findAll();
  res.json(products);
})

// -> add new product
productsRouter.post('/', async (req, res) => {
  const newProduct = await models.products.create(req.body);
  res.json({
    message: "Product added successfully.",
    data: req.body,
  })
})

// -> delete a product 
productsRouter.delete('/:productId', async (req, res) => {
  const deleteProduct = await models.products.destroy({
    where: {
      "product_id": req.params.productId,
    }
  })
  res.json({
    message: `Product ${req.params.productId} deleted successfully.`
  })
})

productsRouter.patch('/:productId', async (req, res) => {
  const updatedProduct = await models.products.update({

  })
})
