import { Request, Response } from "express";
import db from "../../models";

const { QuestionBank } = db;

export const createQuestion = async (req: Request, res: Response) => {
  try {
    const data = await QuestionBank.create(req.body);
    res.status(201).json(data);
  } catch (err: any) {
    res.status(400).json({ error: err.message });
  }
};
