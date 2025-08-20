import { Request, Response } from "express";
import db from "../../models";

const Quiz = db.Quiz;
const Question = db.Question;

export const startQuiz = async (req: Request, res: Response) => {
  try {
    const quiz = await Quiz.create({
      userId: req.body.userId,
      companyId: req.body.companyId,
      status: "in_progress",
      score: 0,
    });
    res.status(201).json(quiz);
  } catch (error) {
    res.status(400).json({ error: (error as Error).message });
  }
};

export const submitAnswer = async (req: Request, res: Response) => {
  try {
    const { quizId } = req.params;
    const { questionId, selectedOption } = req.body;

    const question = await Question.findByPk(questionId);
    if (!question) return res.status(404).json({ error: "Question not found" });

    const isCorrect = question.answerIndex === selectedOption;

    const quiz = await Quiz.findByPk(quizId);
    if (!quiz) return res.status(404).json({ error: "Quiz not found" });

    if (isCorrect) quiz.score += 1;
    await quiz.save();

    res.json({ correct: isCorrect, score: quiz.score });
  } catch (error) {
    res.status(500).json({ error: (error as Error).message });
  }
};

export const submitQuiz = async (req: Request, res: Response) => {
  try {
    const quiz = await Quiz.findByPk(req.params.id);
    if (!quiz) return res.status(404).json({ error: "Quiz not found" });

    quiz.status = "completed";
    await quiz.save();

    res.json({ message: "Quiz submitted", score: quiz.score });
  } catch (error) {
    res.status(500).json({ error: (error as Error).message });
  }
};

export const getQuizResult = async (req: Request, res: Response) => {
  try {
    const quiz = await Quiz.findByPk(req.params.id);
    if (!quiz) return res.status(404).json({ error: "Quiz not found" });

    res.json({
      quizId: quiz.id,
      score: quiz.score,
      status: quiz.status,
    });
  } catch (error) {
    res.status(500).json({ error: (error as Error).message });
  }
};
