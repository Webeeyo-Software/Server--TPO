import { Request, Response } from "express";
import db from "../../models";

const Notices = db.Notices;

export const getNoticeById = async (req: Request, res: Response) => {
  try {
    const { noticeId } = req.params;

    const notice = await Notices.findOne({
      where: { id: noticeId },
      attributes: ["title", "description", "pdfUrl","createdBy"],
    });

    if (!notice) {
      return res.status(404).json({ error: "Notice not found" });
    }

    res.json(notice);
  } catch (error) {
    res.status(500).json({ error: (error as Error).message });
  }
};
