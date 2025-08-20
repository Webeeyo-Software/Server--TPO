import { Router } from "express";
import {
  startQuiz,
  submitAnswer,
  submitQuiz,
  getQuizResult,
} from "../../controllers/questionsBank/quizController";

const router = Router();

router.post("/", startQuiz);
router.post("/:quizId/answer", submitAnswer);
router.post("/:id/submit", submitQuiz);
router.get("/:id/result", getQuizResult);

export default router;
