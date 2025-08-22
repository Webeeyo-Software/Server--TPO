import { Request, Response } from "express";
import validator from "validator";
import db from "../../models";

const { QuestionBank, Companies } = db;

export const getQuestions = async (req: Request, res: Response) => {
  try {
    const where = req.query.companyId ? { companyId: req.query.companyId } : {};
    const data = await QuestionBank.findAll({
      attributes: ['id', 'question', 'options', 'answer'],  
     
    });
    res.json(data);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
};

export const getQuestion = async (req: Request, res: Response) => {
  try {
    const id = req.params.id.toLowerCase();
    if (!validator.isUUID(id)) {
      return res.status(400).json({ error: "Invalid UUID format" });
    }
    console.log("Fetching question with ID:", id);

    const data = await QuestionBank.findByPk(id, {
      include: [{ model: Companies, as: "company" }]
    });

    if (!data) {
      console.log(`No question found for ID: ${id}`);
      return res.status(404).json({ error: "Question not found" });
    }

    res.json(data);
  } catch (err: any) {
    console.error("Error fetching question:", err.message);
    res.status(500).json({ error: err.message });
  }
};
