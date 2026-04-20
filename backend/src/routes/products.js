import express from "express";
export const productsRouter = express.Router();
import models from "../config/db.js";
import { validateInsertPayload } from "../middleware/productsMiddleware.js";
import { validatePatchPayload } from "../middleware/productsMiddleware.js";
import { insertNewProduct, updateExistingProduct } from "../controllers/productsController.js";

const productsSchema = {
  product_name: "string",
  product_unit_price: "number",
  product_quantity: "number",
  is_still_offered: "boolean"
}

// -> get all products
productsRouter.get('/', async (req, res) => {
  const products = await models.products.findAll();
  res.json(products);
})

// -> add new product
productsRouter.post('/', validateInsertPayload(productsSchema), insertNewProduct)

// update any of the product details (except for product_id)
productsRouter.patch('/:productId', validatePatchPayload(productsSchema), updateExistingProduct);
