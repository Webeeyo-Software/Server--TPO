import { Router } from "express";
import { getCompanyData } from "../../controllers/companies/CompanyDataController";

const router = Router();

// GET /api/companies/:companyId
router.get("/:companyId", getCompanyData);

// Optional: quick health check for the router
router.get("/ping/check", (_req, res) => res.json({ ok: true }));

export default router;
