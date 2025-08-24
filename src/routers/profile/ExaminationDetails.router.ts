import { Router } from "express";
import {createExaminationDetails,getExaminationDetails, updateExaminationDetails} from "../../controllers/profile/ExaminationDetails.controller";
const ExaminationDetailsRouter = Router();

ExaminationDetailsRouter.post("/", createExaminationDetails);
ExaminationDetailsRouter.get("/:registrationNo", getExaminationDetails);
ExaminationDetailsRouter.put("/:registrationNo", updateExaminationDetails);

export default ExaminationDetailsRouter;
