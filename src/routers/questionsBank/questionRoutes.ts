import { Router } from "express";
import {
  createQuestion,
  getQuestions,
  getQuestionById,
  updateQuestion,
  deleteQuestion,
} from "../../controllers/questionsBank/questionController";

const router = Router();

router.post("/", createQuestion);
router.get("/", getQuestions);
router.get("/:id", getQuestionById);
router.put("/:id", updateQuestion);
router.delete("/:id", deleteQuestion);

export default router;
