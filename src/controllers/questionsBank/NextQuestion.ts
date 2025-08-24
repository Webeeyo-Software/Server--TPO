import { Request, Response } from "express";
import db from "../../models";

const { QuestionBank } = db;

export const getAllQuestionIds = async (req: Request, res: Response) => {
  try {
    const questions = await QuestionBank.findAll({
      attributes: ['id'],
      order: [['createdAt', 'ASC']],
    });
    const ids = questions.map((q: { id: string }) => q.id);
    res.json(ids);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
};
