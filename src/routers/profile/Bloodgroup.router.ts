import { Router } from "express";
import { createBloodGroup } from "../../controllers/profile/Bloodgroup.controller";

const BloodgroupRouter = Router();

BloodgroupRouter.post("/", createBloodGroup);

export default BloodgroupRouter;
