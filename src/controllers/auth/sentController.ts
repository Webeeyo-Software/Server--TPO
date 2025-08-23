// controllers/auth.controller.ts
import { Request, Response } from "express";
import nodemailer from "nodemailer";

interface User {
  id: number;
  email: string;
  password?: string; // in real DB this would be hashed
}

interface OtpRecord {
  otp: string;
  expiresAt: Date;
}

const users: Record<string, User> = {
  "alohot07@gmail.com": { id: 1, email: "alohot07@gmail.com" },
};

const otpStore: Map<string, OtpRecord> = new Map();
const OTP_EXPIRATION_MINUTES = 5;

// Nodemailer setup
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "tnpportal233@gmail.com",
    pass: "ipvk rvxf zozg gqvi", // use App Password
  },
});

const generateOtp = () =>
  Math.floor(100000 + Math.random() * 900000).toString();

async function sendOtpEmail(email: string, otp: string) {
  await transporter.sendMail({
    from: "TNP <tnpportal233@gmail.com>",
    to: email,
    subject: "Your Password Reset OTP",
    html: `<h2>Your OTP is: <b>${otp}</b></h2><p>Expires in ${OTP_EXPIRATION_MINUTES} minutes</p>`,
  });
}

// 📩 Send OTP
export const sendOtp = async (req: Request, res: Response) => {
  try {
    const { email } = req.body;
    if (!email) return res.status(400).json({ message: "Email is required" });

    const normalizedEmail = email.toLowerCase();
    if (!users[normalizedEmail])
      return res.status(404).json({ message: "Email not registered" });

    const otp = generateOtp();
    const expiresAt = new Date(Date.now() + OTP_EXPIRATION_MINUTES * 60000);
    otpStore.set(normalizedEmail, { otp, expiresAt });

    await sendOtpEmail(normalizedEmail, otp);
    return res.json({ message: "OTP sent successfully" });
  } catch (error) {
    console.error("Send OTP error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// ✅ Verify OTP
export const verifyOtp = async (req: Request, res: Response) => {
  try {
    const { email, otp } = req.body;
    if (!email || !otp)
      return res.status(400).json({ message: "Email and OTP required" });

    const normalizedEmail = email.toLowerCase();
    const record = otpStore.get(normalizedEmail);

    if (!record) return res.status(400).json({ message: "OTP not found" });
    if (record.expiresAt < new Date())
      return res.status(400).json({ message: "OTP expired" });
    if (record.otp !== otp)
      return res.status(400).json({ message: "Invalid OTP" });

    otpStore.delete(normalizedEmail);
    return res.json({ message: "OTP verified successfully" });
  } catch (error) {
    console.error("Verify OTP error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// 🔑 Reset password
export const resetPassword = async (req: Request, res: Response) => {
  try {
    const { email, newPassword } = req.body;
    if (!email || !newPassword)
      return res.status(400).json({ message: "Email and new password required" });

    const normalizedEmail = email.toLowerCase();
    if (!users[normalizedEmail])
      return res.status(404).json({ message: "User not found" });

    // Here we’d hash password
    users[normalizedEmail].password = newPassword;

    return res.json({ message: "Password reset successfully" });
  } catch (error) {
    console.error("Reset password error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
