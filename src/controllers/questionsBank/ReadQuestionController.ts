import { Request, Response } from "express";
import db from "../../models";
const { QuestionBank, Companies } = db;

export const getQuestions = async (req: Request, res: Response) => {
  try {
    const where = req.query.companyId ? { companyId: req.query.companyId } : {};
    const data = await QuestionBank.findAll({
      where,
      include: [{ model: Companies, as: "company" }]
    });
    res.json(data);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
};

export const getQuestion = async (req: Request, res: Response) => {
  try {
    const data = await QuestionBank.findByPk(req.params.id, {
      include: [{ model: Companies, as: "company" }]
    });
    if (!data) return res.status(404).json({ error: "Question not found" });
    res.json(data);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
};
