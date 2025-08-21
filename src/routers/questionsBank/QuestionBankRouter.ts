import { Router } from "express";
import { createQuestion } from "../../controllers/questionsBank/CreateQuestionController";
import { getQuestions, getQuestion } from "../../controllers/questionsBank/ReadQuestionController";
import { deleteQuestion } from "../../controllers/questionsBank/DeleteQuestion";

const router = Router();

router.post("/create", createQuestion);
router.get("/", getQuestions);
router.get("/:id", getQuestion);
router.delete("/:id", deleteQuestion);

export default router;
