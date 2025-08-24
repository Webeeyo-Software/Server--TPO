import { Router } from "express";
import { createBloodGroup,getAllBloodGroups} from "../../controllers/profile/Bloodgroup.controller";

const BloodgroupRouter = Router();

BloodgroupRouter.post("/", createBloodGroup);
BloodgroupRouter.get("/", getAllBloodGroups);

export default BloodgroupRouter;
