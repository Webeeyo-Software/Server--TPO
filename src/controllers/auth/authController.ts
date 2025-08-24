import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import db from "../../models";

const Users = db.Users;
const JWT_SECRET = process.env.JWT_SECRET || "supersecretkey";

export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  try {
    const user = await Users.findOne({
      where: { email },
      include: ["userRoles"],
    });

    if (!user) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const validPassword = await user.isValidPassword(password);
    if (!validPassword) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const role = user.userRoles?.role || "USER";

    const token = jwt.sign(
      { userId: user.id, role },
      JWT_SECRET,
      { expiresIn: "15d" }
    );

    return res.json({
      token,
      userId: user.id,
      role,
      firstname: user.firstName,
    });
  } catch (err) {
    return res.status(500).json({ error: "Internal server error", details: err });
  }
};
