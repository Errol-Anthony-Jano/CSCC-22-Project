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
  it('should return 200/ok if successfully added admin user', async () => {
    const validUser = {
        username: "username",
        password: "hashedPassword",
        confirmPassword: "hashedPassword",
        role: "admin"
    };
    const res = await request(app).post('/users').send(validUser);
    expect(res.statusCode).toEqual(200);
    //expect(res.body.message).toEqual("Adding user successful");
  });
  
  it('should return 200/ok if successfully added employee user', async () => {
    const validUser = {
      username: "username2",
      password: "hashedPassword",
      confirmPassword: "hashedPassword",
      role: "employee"
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
    const res = await request(app).post('/users/2').send(validUser);
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
      const res = await request(app).post('/users/login').send(invalidUser);
      expect(res.statusCode).toEqual(400);
      //expect(res.body.message).toEqual("");
    });
    //invalid input
    it('should return an error when logging in with invalid input', async () => {
      const invalidUser = {
          username: "username",
          password: "hashedPassword",
          id: "not a number"
      };
      const res = await request(app).post('/users/login').send(invalidUser);
      expect(res.statusCode).toEqual(400);
      //expect(res.body.message).toEqual("");
    });
    //wrong password
    it('should return an error when logging in with a wrong password', async () => {
      const invalidUser = {
          username: "username",
          password: "NotMyPassword",
          id: 1
      };
      const res = await request(app).post('/users/login').send(invalidUser);
      expect(res.statusCode).toEqual(400);
      //expect(res.body.message).toEqual("");
    });
    //user not found (inactive and not existing)
    it('should return an error when logging in an inactive account', async () => {
      const invalidUser = {
          username: "inactiveUser",
          password: "hashedPassword",
          id: 3
      };
      const res = await request(app).post('/users/login').send(invalidUser);
      expect(res.statusCode).toEqual(400);
      //expect(res.body.message).toEqual("");
    });
    it('should return an error when logging in a non-existent account', async () => {
      const invalidUser = {
          username: "inactiveUser",
          password: "hashedPassword",
          id: 3
      };
      const res = await request(app).post('/users/login').send(invalidUser);
      expect(res.statusCode).toEqual(400);
      //expect(res.body.message).toEqual("");
    });
    //wrong user id
    it('should return an error when logging in with a wrong id', async () => {
      const invalidUser = {
          username: "username",
          password: "hashedPassword",
          id: 24
      };
      const res = await request(app).post('/users/login').send(invalidUser);
      expect(res.statusCode).toEqual(400);
      //expect(res.body.message).toEqual("");
    });

  //ADD
    //missing fields
    it('should return an error when adding user with missing fields', async () => {
      const invalidUser = {
        username: "username",
        password: "hashedPassword",
        confirmPassword: "hashedPassword",
      };
      const res = await request(app).post('/users').send(invalidUser);
      expect(res.statusCode).toEqual(400);
      //expect(res.body.message).toEqual("");
    });
    //invalid input
    it('should return an error when adding user with invalid input', async () => {
      const invalidUser = {
        username: "username",
        password: "hashedPassword",
        confirmPassword: "hashedPassword",
        role: 1
      };
      const res = await request(app).post('/users').send(invalidUser);
      expect(res.statusCode).toEqual(400);
      //expect(res.body.message).toEqual("");
    });
    //short password (< 8 chars)
    it('should return an error when adding user with a short password', async () => {
      const invalidUser = {
        username: "username",
        password: "pass",
        confirmPassword: "pass",
        role: "admin"
      };
      const res = await request(app).post('/users').send(invalidUser);
      expect(res.statusCode).toEqual(400);
      //expect(res.body.message).toEqual("");
    });
    // invalid role
    it('should return an error when adding user with an invalid role', async () => {
      const invalidUser = {
        username: "username",
        password: "pass",
        confirmPassword: "pass",
        role: "admin"
      };
      const res = await request(app).post('/users').send(invalidUser);
      expect(res.statusCode).toEqual(400);
      //expect(res.body.message).toEqual("");
    });
    //passwords dont match
    it('should return an error when adding user with mismatching passwords', async () => {
      const invalidUser = {
        username: "username",
        password: "password123",
        confirmPassword: "password124",
        role: "admin"
      };
      const res = await request(app).post('/users').send(invalidUser);
      expect(res.statusCode).toEqual(400);
      //expect(res.body.message).toEqual("");
    });
    //username already exists
    it('should return an error when adding an existing user', async () => {
      const invalidUser = {
        username: "username",
        password: "password123",
        confirmPassword: "password123",
        role: "admin"
      };
      const res = await request(app).post('/users').send(invalidUser);
      expect(res.statusCode).toEqual(400);
      //expect(res.body.message).toEqual("");
    });

  //ARCHIVE
    //user not found
    it('should return an error when adding user with mismatching passwords', async () => {
      const invalidUser = {
        username: "username23",
        password: "password123",
      };
      const res = await request(app).post('/users/24').send(invalidUser);
      expect(res.statusCode).toEqual(400);
      //expect(res.body.message).toEqual("");
    });

})