import express from "express";

export const productsRouter = express.Router();

import models from "../config/db.js";

//add error handling
// -> get all products
productsRouter.get('/', async (req, res) => {
  const products = await models.products.findAll();
  res.json(products);
})

// -> add new product
productsRouter.post('/', async (req, res) => {
  try {
    await models.products.create(req.body);
    res.json({
      message: "Product added successfully.",
      data: req.body,
    })
  }
  catch (err) {
    res.status(400).json({
      message: "Error adding product.",
      error: err.message,
    })
  }
})

// update any of the product details (except for product_id)
productsRouter.patch('/:productId', async (req, res) => {
  try {
    const productId = req.params.productId;
    await models.products.update(req.body, {
      where: {
        product_id: productId,
      }
    })
    res.json({
      message: "Product updated successfully.",
      data: req.body,
    })
  } catch (err) {
    res.status(400).json({
      message: "Error updating product.",
      error: err.message,
    })
  }
})
