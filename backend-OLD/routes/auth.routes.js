import express from "express";
import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import {
  login,
  logout,
  registerUser,
  verifyEmail,
  forgotPassword,
  resetPassword,
  CheckAuth,
} from "../controllers/auth.controllers.js";
import { verifyToken } from "../middlewares/verifyToken.js";

const router = express.Router();

router.get("/check-auth", verifyToken, CheckAuth);

router.post("/add-user", registerUser);
router.post("/verify-email", verifyEmail);

router.post("/user-login", login);
router.post("/logout", logout);

router.post("/forgot-password", forgotPassword);

router.post("/reset-password/:token", resetPassword);

export default router;
