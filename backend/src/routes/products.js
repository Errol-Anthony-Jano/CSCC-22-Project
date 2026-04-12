import express from "express";
export const productsRouter = express.Router();
import models from "../config/db.js";
import { validateInsertPayload } from "../middleware/productsMiddleware.js";
import { validatePatchPayload } from "../middleware/productsMiddleware.js";

const productsSchema = {
  product_name: "string",
  product_unit_price: "number",
  product_quantity: "number",
  is_still_offered: "boolean"
}

//add error handling
// -> get all products
productsRouter.get('/', async (req, res) => {
  const products = await models.products.findAll();
  res.json(products);
})

// -> add new product
productsRouter.post('/', validateInsertPayload(productsSchema), async (req, res) => {
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
productsRouter.patch('/:productId', validatePatchPayload(productsSchema), async (req, res) => {
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
