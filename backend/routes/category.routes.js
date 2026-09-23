import express from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { verifyToken } from "../middlewares/verifyToken.js";
import {
  addCategory,
  getCategories,
} from "../controllers/category.controller.js";

const router = express.Router();

router.post("/add-category", addCategory);
router.get("/get-categories", getCategories);
// router.put("/read/:slug", incrementReads);
// router.put("/edit-post/:postId", editPost);
// router.put("/send-comment", sendComment);

export default router;
