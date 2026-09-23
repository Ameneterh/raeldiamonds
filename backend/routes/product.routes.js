import express from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { verifyToken } from "../middlewares/verifyToken.js";
import {
  addProduct,
  getProducts,
  editPost,
  sendComment,
  incrementReads,
} from "../controllers/product.controller.js";

const router = express.Router();

router.post("/add-product", addProduct);
router.get("/get-products", getProducts);
router.put("/read/:slug", incrementReads);
router.put("/edit-post/:postId", editPost);
router.put("/send-comment", sendComment);

export default router;
