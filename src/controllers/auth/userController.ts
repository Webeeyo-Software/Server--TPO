import { Request, Response } from "express";
import db from "../../models";

const Users = db.Users;

export const createUser = async (req: Request, res: Response) => {
  const { email, password, firstName, lastName } = req.body;

  if (!email || !password || !firstName || !lastName) {
    return res.status(400).json({ message: "All fields are required." });
  }

  try {
    const existingUser = await Users.findOne({ where: { email } });
    if (existingUser) {
      return res.status(409).json({ message: "Email already registered." });
    }

    const newUser = await Users.create({
      email,
      password,
      firstName,
      lastName,
    });

    res
      .status(201)
      .json({ message: "User created successfully.", userId: newUser.id });
  } catch (err) {
    res.status(500).json({ message: "Server error.", error: err });
  }
};
