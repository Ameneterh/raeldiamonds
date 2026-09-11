import express from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { verifyToken } from "../middlewares/verifyToken.js";
import {
  addCategory,
  getAllCategories,
} from "../controllers/category.controller.js";

const router = express.Router();

router.post("/save-category", addCategory);
router.get("/get-categories", getAllCategories);
// router.put("/read/:slug", incrementReads);
// router.put("/edit-post/:postId", editPost);
// router.put("/send-comment", sendComment);

export default router;
