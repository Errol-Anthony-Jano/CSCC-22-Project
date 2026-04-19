import express from "express";
import { loginUser, refreshToken, logoutUser } from "../controllers/authController";

export const authRouter = express.Router;

authRouter.post("/login", loginUser);
authRouter.post("/token", refreshToken);
authRouter.delete("/logout", logoutUser);