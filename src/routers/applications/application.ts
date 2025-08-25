import {Router} from "express";
import { getApplicationStatus, createApplication } from "../../controllers/applications/ApplicationsController";
import { getAllPlacementDrives } from "../../controllers/applications/Applicationdrives";
const router = Router();

router.get("/:applicationId/status", getApplicationStatus);
router.get("/alldrives",getAllPlacementDrives);
router.post("/", createApplication);

export default router;
