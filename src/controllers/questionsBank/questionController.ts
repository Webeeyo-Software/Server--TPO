import { Request, Response } from "express";
import db from "../../models";

const Question = db.Question;

export const createQuestion = async (req: Request, res: Response) => {
  try {
    const question = await Question.create(req.body);
    res.status(201).json(question);
  } catch (error) {
    res.status(400).json({ error: (error as Error).message });
  }
};

export const getQuestions = async (req: Request, res: Response) => {
  try {
    const where: any = {};
    if (req.query.companyId) where.companyId = req.query.companyId;

    const questions = await Question.findAll({ where });
    res.json(questions);
  } catch (error) {
    res.status(500).json({ error: (error as Error).message });
  }
};

export const getQuestionById = async (req: Request, res: Response) => {
  try {
    const question = await Question.findByPk(req.params.id);
    if (!question) return res.status(404).json({ error: "Question not found" });
    res.json(question);
  } catch (error) {
    res.status(500).json({ error: (error as Error).message });
  }
};

export const updateQuestion = async (req: Request, res: Response) => {
  try {
    const question = await Question.findByPk(req.params.id);
    if (!question) return res.status(404).json({ error: "Question not found" });
    await question.update(req.body);
    res.json(question);
  } catch (error) {
    res.status(400).json({ error: (error as Error).message });
  }
};

export const deleteQuestion = async (req: Request, res: Response) => {
  try {
    const question = await Question.findByPk(req.params.id);
    if (!question) return res.status(404).json({ error: "Question not found" });
    await question.destroy();
    res.json({ message: "Question deleted" });
  } catch (error) {
    res.status(500).json({ error: (error as Error).message });
  }
};
