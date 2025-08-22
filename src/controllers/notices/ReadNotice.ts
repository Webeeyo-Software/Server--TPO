import { Request, Response } from "express";
import db from "../../models";

const Notices = db.Notices;

// Get a single notice by id (only title, description, pdf)
export const getNoticeById = async (req: Request, res: Response) => {
  try {
    const { noticeId } = req.params;

    const notice = await Notices.findOne({
      where: { id: noticeId },
      attributes: ["title", "description", "pdfUrl"],
    });

    if (!notice) {
      return res.status(404).json({ error: "Notice not found" });
    }

    res.json(notice);
  } catch (error) {
    res.status(500).json({ error: (error as Error).message });
  }
};
