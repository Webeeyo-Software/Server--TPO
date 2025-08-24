import { Request, Response } from "express";
import db from "../../models";

const { QuestionBank } = db;

interface Question {
  id: string;
  question: string;
  answer: string;
  options: string[];
}

interface UserAnswer {
  questionId: string;
  answer: string;
}

export const submitAnswers = async (req: Request, res: Response) => {
  try {
    const userAnswers: UserAnswer[] = req.body.answers;

    if (!Array.isArray(userAnswers) || userAnswers.length === 0) {
      return res.status(400).json({ error: "Answers must be a non-empty array" });
    }

    for (const ua of userAnswers) {
      if (!ua.questionId || typeof ua.answer !== 'string') {
        return res.status(400).json({ error: "Each answer must have a questionId and a string answer" });
      }
    }

    const questionIds = userAnswers.map(ua => ua.questionId);

    // Fetch questions with answer and options
    const questions: Question[] = await QuestionBank.findAll({
      where: { id: questionIds },
      attributes: ['id', 'question', 'answer', 'options'],
      raw: true,
    });

    if (questions.length !== questionIds.length) {
      return res.status(400).json({ error: "Some questions not found" });
    }

    let correctCount = 0;
    const correctQuestions = [];
    const incorrectQuestions = [];

    // Normalize and compare ignoring case and spaces
    const normalize = (str: string) => str.trim().toLowerCase();

    for (const ua of userAnswers) {
      const q = questions.find(q => q.id === ua.questionId)!;

      if (normalize(ua.answer) === normalize(q.answer)) {
        correctCount++;
        correctQuestions.push({
          id: q.id,
          questionText: q.question,
          options: q.options,
          userAnswer: ua.answer,
        });
      } else {
        incorrectQuestions.push({
          id: q.id,
          questionText: q.question,
          options: q.options,
          userAnswer: ua.answer,
          correctAnswer: q.answer,
        });
      }
    }

    const totalQuestions = userAnswers.length;
    const percentageScore = (correctCount / totalQuestions) * 100;

    res.json({
      totalQuestions,
      correctCount,
      percentageScore,
      correctQuestions,
      incorrectQuestions,
    });

  } catch (error: any) {
    console.error("SubmitAnswers error:", error);
    const message = error?.message || "Unknown error occurred";
    res.status(500).json({ error: message });
  }
};
