import { Request, Response } from "express";
import db from "../../models";
import { ValidationError } from "sequelize";

const Notices = db.Notices;

interface NoticeInput {
  title: string;
  description: string;
  createdBy: string;
  pdfUrl?: string;
}

export const createNotice = async (req: Request, res: Response) => {
  const { title, description, createdBy } = req.body as NoticeInput;
  const pdfUrl = req.file ? req.file.path : undefined;

  // Validate required fields
  if (!title || !description || !createdBy) {
    return res
      .status(400)
      .json({ error: "Title, description, and createdBy are required." });
  }

  try {
    const notice = await Notices.create({ title, description, createdBy, pdfUrl });
    return res.status(201).json(notice);
  } catch (error: any) {
    if (error instanceof ValidationError) {
      return res.status(400).json({ error: error.errors.map((e) => e.message) });
    }
    console.error("Create Notice Error:", error);
    return res.status(500).json({ error: error.message || "Internal Server Error" });
  }
};