import { Request, Response } from "express";
import db from "../../models";

const Notices = db.Notices;

export const getNotices = async (_req: Request, res: Response) => {
  try {
    const notices = await Notices.findAll({
      attributes: ["id", "title", "description", "createdBy"], // 👈 only select these
    });

    res.json(notices);
  } catch (error) {
    res.status(500).json({ error: (error as Error).message });
  }
};