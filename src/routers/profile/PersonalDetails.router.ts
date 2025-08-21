import { Router } from "express";
import { createPersonalDetails } from "../../controllers/profile/PersonalDetails.controller";

const router = Router();

router.post("/", createPersonalDetails);

export default router;
