import express from "express";
import {
  addUser,
  login,
  logout,
  resetPassword,
  CheckAuth,
  getUsers,
  updateUser,
  updatePassword,
  addAbout,
  editAbout,
  getAboutContent,
} from "../controllers/auth.controller.js";
import { verifyToken } from "../middlewares/verifyToken.js";

const router = express.Router();

router.get("/check-auth", verifyToken, CheckAuth);
router.post("/add-user", addUser);
router.post("/user-login", login);

router.put("/update-user/:userId", verifyToken, updateUser);
router.put("/update-password/:userId", verifyToken, updatePassword);

router.post("/logout", logout);

router.post("/add-about", addAbout);
router.get("/get-about", getAboutContent);
router.put("/edit-about/:pageId", verifyToken, editAbout);

router.get("/get-users", getUsers);

router.post("/reset-password", resetPassword);

export default router;
