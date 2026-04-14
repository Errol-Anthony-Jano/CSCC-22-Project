import { describe, it, expect } from 'vitest';
import request from 'supertest';
import app from '../app.js';

describe('Users API', () => {
  //positive
  // LOGIN
  it('should return 200/ok if valid login', async () => {
    const validUser = {
        username: "user-admin",
        password: "Admin123!",
        id: 1
    };
    const res = await request(app).post('/users/login').send(validUser);
    expect(res.statusCode).toEqual(200);
    //expect(res.body.message).toEqual("Login successful");
  });
  
  //ADD USER
  it('should return 200/ok if user is successfully added admin user', async () => {
    const validUser = {
        username: "username",
        password: "hashedPassword",
        is_admin: true,
        is_active: true
    };
    const res = await request(app).post('/users').send(validUser);
    expect(res.statusCode).toEqual(200);
    //expect(res.body.message).toEqual("Adding user successful");
  });
  
  it('should return 200/ok if user is successfully added regular user', async () => {
    const validUser = {
        username: "username2",
        password: "hashedPassword",
        is_admin: false,
        is_active: true
    };
    const res = await request(app).post('/users/2').send(validUser);
    expect(res.statusCode).toEqual(200);
    //expect(res.body.message).toEqual("User removed");
  });
  //ARCHIVE
  it('should return 200/ok if user is successfully removed user', async () => {
    const validUser = {
        username: "username2",
        password: "hashedPassword",
        is_admin: false,
        is_active: true
    };
    const res = await request(app).post('/2').send(validUser);
    expect(res.statusCode).toEqual(200);
    //expect(res.body.message).toEqual("User removed");
  });

  //negative
  //LOGIN
    //missing fields
    it('should return an error when logging in with missing fields', async () => {
      const invalidUser = {
          username: "username",
          password: "hashedPassword",
      };
      const res = await request(app).post('users/2').send(invalidUser);
      expect(res.statusCode).toEqual(400);
      //expect(res.body.message).toEqual("User removed");
    });
    //invalid input
    //wrong password
    //user not found (inactive and not existing)
    //wront user id
  //ADD
    //missing fields
    //invalid input
    //short password (< 8 chars)
    // invalid role
    //passwords dont match
    //username already exists
  //ARCHIVE
    //user not found
})