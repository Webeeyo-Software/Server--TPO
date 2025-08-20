import {Router} from "express";
import { createReligions } from "../../controllers/profile/Religions.controller";

const Religionsrouter = Router();

Religionsrouter.post("/", createReligions);

export default Religionsrouter;
