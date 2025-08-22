import { Router } from "express";
import { createNationality } from "../../controllers/profile/Nationalities.controller";

const NationalitiesRouter = Router();

NationalitiesRouter.post("/", createNationality);

export default NationalitiesRouter;