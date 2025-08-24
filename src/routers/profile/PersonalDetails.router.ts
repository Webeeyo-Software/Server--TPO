import { Router } from "express";
import { createPersonalDetails, getStudentProfileById, updateStudentProfile,} from "../../controllers/profile/PersonalDetails.controller";

const router = Router();

router.post("/", createPersonalDetails);
router.get("/:id", getStudentProfileById);
router.put("/:registrationNo", updateStudentProfile);


export default router;
