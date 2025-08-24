import { Request, Response } from "express";
import nodemailer from "nodemailer";
import db from "../../models";

interface OtpRecord {
  otp: string;
  expiresAt: Date;
}

const otpStore: Map<string, OtpRecord> = new Map();
const OTP_EXPIRATION_MINUTES = 5;

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
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

export const sendOtp = async (req: Request, res: Response) => {
  try {
    const { email } = req.body;
    if (!email) return res.status(400).json({ message: "Email is required" });

    const normalizedEmail = email.toLowerCase();

    const user = await db.Users.findOne({ where: { email: normalizedEmail } });
    if (!user) return res.status(404).json({ message: "Email not registered" });

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
