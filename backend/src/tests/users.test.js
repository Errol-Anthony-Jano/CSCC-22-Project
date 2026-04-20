import { describe, it, expect } from 'vitest';
import request from 'supertest';
import app from '../app.js';

describe('Users API', () => {
    describe('POST /users/login', () => {
        it('should return an error when logging in with missing fields', async () => {
            const incompleteData = {
                username: "testuser",
                // password and user_id are missing
            };

            const res = await request(app).post('/users/login').send(incompleteData);
            expect(res.statusCode).toEqual(400);
            expect(res.body.error).toEqual("Should input in all fields");
        });

        it('should return an error when logging in with wrong password', async () => {
            // First create a user
            const newUser = {
                username: "testuser1",
                role: "customer",
                password: "password123",
                confirmPassword: "password123"
            };
            const createUserRes = await request(app).post('/users').send(newUser);
            expect(createUserRes.statusCode).toEqual(201);
            
            const userId = createUserRes.body.user_id;

            // Now try to login with wrong password
            const invalidPasswordData = {
                user_id: userId,
                username: "testuser1",
                password: "wrongpassword"
            };

            const res = await request(app).post('/users/login').send(invalidPasswordData);
            expect(res.statusCode).toEqual(401); 
            expect(res.body.message).toEqual("Wrong password");
        });

        it('should return an error when user is not found', async () => {
            const invalidUserData = {
                user_id: 9999,
                username: "nonexistentuser",
                password: "password123"
            };

            const res = await request(app).post('/users/login').send(invalidUserData);
            expect(res.statusCode).toEqual(404);
            expect(res.body.error).toEqual("Active user not found");
        });
    });
});
