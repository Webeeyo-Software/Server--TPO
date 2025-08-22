import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import db from "../../models";
import nodemailer from "nodemailer";
import crypto from "crypto";

const Users = db.Users;
const JWT_SECRET = process.env.JWT_SECRET || "supersecretkey";

// LOGIN
export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  try {
    const user = await Users.findOne({ where: { email }, include: ["userRoles"] });
    if (!user) return res.status(401).json({ message: "Invalid credentials" });

    const validPassword = await user.isValidPassword(password);
    if (!validPassword) return res.status(401).json({ message: "Invalid credentials" });

    const role = user.userRoles?.role || "USER";

    const token = jwt.sign({ userId: user.id, role }, JWT_SECRET, { expiresIn: "7d" });

    res.json({ token, userId: user.id, role });
  } catch (err) {
    res.status(500).json({ error: "Internal server error", details: err });
  }
};

// FORGOT PASSWORD
export const forgotPassword = async (req: Request, res: Response) => {
  const { email } = req.body;

  try {
    const user = await Users.findOne({ where: { email } });
    if (!user) return res.status(404).json({ message: "Email not registered" });

    const resetToken = crypto.randomBytes(32).toString("hex");
    const resetTokenExpiry = Date.now() + 3600000;

    await user.update({ resetToken, resetTokenExpiry });

    const resetLink = `http://localhost:3000/reset-password/${resetToken}`;

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: { user: process.env.EMAIL_USER, pass: process.env.EMAIL_PASS },
    });

    await transporter.sendMail({
      from: `"MyApp Support" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: "Password Reset",
      html: `<p>You requested a password reset.</p><p>Click <a href="${resetLink}">here</a> to reset your password.</p>`,
    });

    res.json({ message: "Password reset mail sent!" });
  } catch (err) {
    res.status(500).json({ error: "Error sending email", details: err });
  }
};
