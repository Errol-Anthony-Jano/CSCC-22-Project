import { vi, describe, it, expect } from 'vitest';
import request from 'supertest';
import app from '../app.js';

vi.mock('../models', () => ({
    default: {
        transactions: {
            create: vi.fn(),
        },
        users: {
            findByPk: vi.fn(),
        }
    }
}))

describe('Creating a transaction via POST', () => {
    it('should return an error when the update/insert value isn\'t in the payload', async () => {
        const invalidTransaction = {
            // missing operation key
            transaction_timestamp: Date.now(),
            payment_type: "GCash",
            payment_refstr: "1234567",
            created_by: 1,
        }
        const res = await request(app).post('/transactions').send(invalidTransaction);
        expect(res.statusCode).toEqual(400);
    })

    it('should return an error when a timestamp isn\'t included in the payload', async () => {
        const incompleteTransaction = {
            operation: "insert",
            payment_type: "GCash",
            payment_refstr: "0521678",
            created_by: 1,
        }
        const res = await request(app).post('/transactions').send(incompleteTransaction);
        expect(res.statusCode).toEqual(400);
    })

    it('should return an error when the payment type isn\'t included in the payload', async () => {
        const incompleteTransaction = {
            operation: "insert",
            // missing payment_type and payment_refstr
            transaction_timestamp: Date.now(),
            created_by: 1,
        }
        const res = await request(app).post('/transactions').send(incompleteTransaction);
        expect(res.statusCode).toEqual(400);
    })

    it('should return an error when the payment type isn\'t cash but no reference string is included', async () => {
        const invalidTransaction = { 
            operation: "insert",
            transaction_timestamp: Date.now(),
            payment_type: "GCash",
            // missing payment_refstr
            created_by: 1,
        }

        const res = await request(app).post('/transactions').send(invalidTransaction);
        expect(res.statusCode).toEqual(400);
    })


    it('should return an error when the handler of the transaction isn\'t included', async () => {
        const incompleteTransaction = {
            operation: "insert",
            transaction_timestamp: Date.now(),
            payment_type: "GCash",
            payment_refstr: "1234567"
            // missing created_by
        }

        models.users.findByPk.mockResolvedValue(null);

        const res = await request(app).post('/transactions').send(incompleteTransaction);
        expect(res.statusCode).toEqual(400);
    })

    it('should return an error when the referenced user is non-existent', async () => {
        const incompleteTransaction = {
            operation: "insert",
            transaction_timestamp: Date.now(),
            payment_type: "GCash",
            payment_refstr: "1234567",
            created_by: 9999
        }

        models.users.findByPk.mockResolvedValue(null);

        const res = await request(app).post('/transactions').send(incompleteTransaction);
        expect(res.statusCode).toEqual(404); // user not found
    })

    it('should return an error when the referenced user account is inactive', async () => {
        const inactiveHandler = {
            operation: "insert",
            transaction_timestamp: Date.now(),
            payment_type: "GCash",
            payment_refstr: "1234567",
            created_by: 2, // 2 is marked with is_active = false
        }

        models.users.findByPk.mockResolvedValue({
            user_id: 2,
            username: "calcifer",
            is_admin: false,
            is_active: false
        })

        const res = await request(app).post('/transactions').send(inactiveHandler);
        expect(res.statusCode).toEqual(400);
    })
})