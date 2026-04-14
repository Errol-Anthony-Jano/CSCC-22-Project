import express from "express";
import models from "../config/db.js";
import { validateLoginPayload, validateAddPayload } from "../middleware/usersMiddleware.js";
import { loginUser, addUser, archiveUser } from "../controllers/usersController.js";

export const usersRouter = express.Router();

const usersSchema = {
  username: "string",
  password: "string",
  confirmPassword: "string",
  role: "string"
}
const loginSchema = {
  username: "string",
  password: "string",
  id: "number"
}

// -> login 
usersRouter.post('/login', validateLoginPayload(loginSchema), loginUser);

// -> add user
usersRouter.post('/', validateAddPayload(usersSchema), addUser);

// -> remove(archive) user
usersRouter.delete('/:user_id', archiveUser);