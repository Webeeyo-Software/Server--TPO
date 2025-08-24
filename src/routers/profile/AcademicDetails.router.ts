// routes/academicRoutes.ts
import { Router } from "express";
import { createAcademicDetails, getAcademicDetails,updateAcademicDetails  } from "../../controllers/profile/AcademicDetails.controller";

const AcademicDetailsrouter = Router();

AcademicDetailsrouter.post("/", createAcademicDetails);
AcademicDetailsrouter.get("/:registrationNo", getAcademicDetails);
AcademicDetailsrouter.put("/:registrationNo", updateAcademicDetails);


export default AcademicDetailsrouter;
