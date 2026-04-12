import { describe, it, expect } from 'vitest';
import request from 'supertest';
import app from '../app.js';
import products from '../models/products.js';

describe('Products API', () => {
    //negative path tests

    // CREATE
    it('should return an error when adding a product with missing fields', async () => {
        const incompleteProduct = {
            product_name: "Incomplete Product",
            product_unit_price: 100000,
        };
        const res = await request(app).post('/products').send(incompleteProduct);
        expect(res.statusCode).toEqual(400);
        // expect(res.body.message).toEqual("All fields are required.");
    });

    it('should return an error when adding a product with invalid data types', async () => {
        const invalidProduct = {
            product_name: "Invalid Product",
            product_unit_price: "Fake number",
            product_quantity: "Fake number",
            is_still_offered: "Not a boolean"
        };
        const res = await request(app).post('/products').send(invalidProduct);
        expect(res.statusCode).toEqual(400);
        // expect(res.body.message).toEqual("Invalid data types provided.");
    });

    it('should return an error when adding a product using non-existent fields', async () => {
        const fakeProduct = {
            not_a_name: "Fake Product",
            not_a_price: 123456,
            not_a_quantity: 78910,
            not_a_boolean: true
        }
        const res = await request(app).post('/products').send(fakeProduct);
        expect(res.statusCode).toEqual(400);
        // expect(res.body.message).toEqual("Error adding product.");
    })

    // UPDATE

    it('should return an error when updating product with invalid data types', async () => {
        const invalidUpdate = {
            product_name: "Invalid product",
            products_unit_price: "Fake number",
            product_quantity: "Fake number",
            is_still_offered: "Not a boolean"
        }
        const res = await request(app).patch('/products/1').send(invalidUpdate);
        expect(res.statusCode).toEqual(400);
        // expect(res.body.message).toEqual("Invalid data types provided.");
    })
});