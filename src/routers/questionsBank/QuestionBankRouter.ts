import { Router } from "express";
import {
  getQuestions,
  getQuestion
} from "../../controllers/questionsBank/ReadQuestionController";
import { createQuestion } from "../../controllers/questionsBank/CreateQuestionController";
import { deleteQuestion } from "../../controllers/questionsBank/DeleteQuestion";
import { getAllQuestionIds } from "../../controllers/questionsBank/NextQuestion";
import { submitAnswers } from "../../controllers/questionsBank/SubmitAnswer";

const router = Router();

router.get("/questions/ids", getAllQuestionIds);
router.get("/questions", getQuestions);
router.get("/questions/:id", getQuestion);
router.post("/questions/create", createQuestion);

router.delete("/questions/:id", deleteQuestion);

router.post("/submit", submitAnswers);


export default router;
