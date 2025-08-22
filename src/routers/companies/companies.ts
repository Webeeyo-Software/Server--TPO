// routes/companies.ts
import { Router } from 'express';
import { searchCompanies } from '../../controllers/companies/CompaniesController';
import { getCompanyData } from "../../controllers/companies/CompanyDataController";

const router = Router();

/**
 * GET /api/companies/search
 * Query params:
 *   search (string, optional)
 *   page   (number, default=1)
 *   limit  (number, default=10, max=50)
 *   status (Active|Inactive, default=Active)
 */
router.get('/search', searchCompanies);
router.get("/:companyId", getCompanyData);


export default router;
