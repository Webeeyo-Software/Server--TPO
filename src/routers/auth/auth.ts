import express from "express";
import { login, forgotPassword } from ".././../controllers/auth/authController";

const router = express.Router();

router.post("/login", login);
router.post("/forgot-password", forgotPassword);

export default router;
