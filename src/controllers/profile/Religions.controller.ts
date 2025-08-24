import { Request, Response } from "express";
import db from "../../models/index";

const Religions = db.Religions;

export const createReligions = async (req: Request, res: Response) => {
  try {
    const { religionName } = req.body;

    // ------------------------
    // ✅ Validate input
    // ------------------------
    if (!religionName || !religionName.trim()) {
      return res.status(400).json({ error: "Religion name is required" });
    }

    // ------------------------
    // ✅ Check if already exists
    // ------------------------
    const existing = await Religions.findOne({ where: { religionName: religionName.trim() } });
    if (existing) {
      return res.status(400).json({ error: `Religion "${religionName}" already exists` });
    }

    // ------------------------
    // ✅ Create new religion
    // ------------------------
    const newReligion = await Religions.create({
      religionName: religionName.trim(),
    });

    return res.status(201).json({
      message: "Religion created successfully",
      data: newReligion,
    });
  } catch (error) {
    console.error("Error creating religion:", error);
    return res.status(500).json({ error: (error as Error).message });
  }
};
export const getAllReligions = async (req: Request, res: Response) => {
  try {
    const religions = await Religions.findAll({ attributes: ['id', 'religionName'] });
    return res.status(200).json(religions);
  } catch (error) {
    console.error("Error fetching religions:", error);
    return res.status(500).json({ error: (error as Error).message });
  }
}
