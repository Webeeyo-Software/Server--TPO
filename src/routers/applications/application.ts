import {Router} from "express";
import { getApplicationStatus, createApplication } from "../../controllers/applications/ApplicationsController";

const router = Router();

router.get("/:applicationId/status", getApplicationStatus);
router.post("/", createApplication);

export default router;
