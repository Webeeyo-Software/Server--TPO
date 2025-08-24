import { Router } from "express";
import { createNationality,getAllNationalities } from "../../controllers/profile/Nationalities.controller";

const NationalitiesRouter = Router();

NationalitiesRouter.post("/", createNationality);
NationalitiesRouter.get("/", getAllNationalities);

export default NationalitiesRouter;