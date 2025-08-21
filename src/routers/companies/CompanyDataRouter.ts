import { getCompanyData } from "../../controllers/companies/CompanyDataController";
import {Router} from "express"

const router = Router();

router.get("/", getCompanyData);

export default router;

