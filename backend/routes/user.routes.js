import express from "express";
import {
  changePassword,
  forgotPassword,
  generateOtp,
  login,
  logout,
  register,
  verifyOtp,
} from "../controllers/user.controller.js";

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.get("/logout", logout)
router.post("/generate-otp", generateOtp);
router.post("/verify-otp", verifyOtp);
router.post("/forgot-password", forgotPassword);
router.post("/change-password", changePassword);

export default router;
