import { Request, Response } from "express";
import db from "../../models";

const { QuestionBank } = db;

export const deleteQuestion = async (req: Request, res: Response) => {
  try {
    const rows = await QuestionBank.destroy({ where: { id: req.params.id } });
    if (!rows) return res.status(404).json({ error: "Question not found" });
    res.status(204).end();
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
};
