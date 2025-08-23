import { Request, Response } from "express";
import db from "../../models"; // Adjust your import as needed
const Users = db.Users;

export const resetPasswordByEmail = async (req: Request, res: Response) => {
  try {
    const { email, newPassword } = req.body;

    if (!email || !newPassword) {
      return res.status(400).json({ message: "Email and new password are required" });
    }

    const user = await Users.findOne({ where: { email, isDeleted: false } });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    user.password = newPassword; // password will be hashed by the model hook
    await user.save();

    return res.json({ message: "Password updated successfully" });
  } catch (error) {
    return res.status(500).json({ message: "Server error" });
  }
};
