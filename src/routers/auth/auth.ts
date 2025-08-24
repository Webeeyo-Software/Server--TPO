import express from "express";
import { login } from ".././../controllers/auth/authController";
import { createUser } from "../../controllers/auth/userController";
import { sendOtp } from "../../controllers/auth/sentController";
import { verifyOtp } from "../../controllers/auth/sentController";
import { resetPasswordByEmail } from "../../controllers/auth/resetpassword";
const router = express.Router();

router.post("/login", login);
router.post("/register",createUser);
router.post("/verification",sendOtp);
router.post("/otp-verification",verifyOtp);
router.post("/reset-password",resetPasswordByEmail);

export default router;
