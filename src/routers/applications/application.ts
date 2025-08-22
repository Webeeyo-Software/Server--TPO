import {Router} from "express";
import { getApplicationStatus } from "../../controllers/applications/ApplicationsController";

const router = Router();

router.get("/:applicationId/status", getApplicationStatus);

export default router;
