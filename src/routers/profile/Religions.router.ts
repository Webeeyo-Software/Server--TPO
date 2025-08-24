import {Router} from "express";
import { createReligions,getAllReligions } from "../../controllers/profile/Religions.controller";

const Religionsrouter = Router();

Religionsrouter.post("/", createReligions);
Religionsrouter.get("/", getAllReligions);

export default Religionsrouter;
