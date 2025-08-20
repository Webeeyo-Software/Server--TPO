import { Router } from "express";
import { CreateCompany, getAllCompanies, getActiveCompanies } from "../../controllers/companies/CompaniesController";

const router = Router();

// GET all companies
router.get("/", getAllCompanies);

// POST new company
router.post("/", CreateCompany);

// GET /api/companies/active
router.get("/active", getActiveCompanies);

export default router;
