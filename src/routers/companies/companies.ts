import { Router } from 'express';
import { 
  searchCompanies, 
  filterforCompanies, 
  filterforPlacementDrives 
} from '../../controllers/companies/CompaniesController';
import { 
  getCompanyData, 
  getPlacementDriveData 
} from "../../controllers/companies/CompanyDataController";

const router = Router();

router.get('/search', searchCompanies);

router.get('/filter', filterforCompanies);

router.get('/placement-drives', filterforPlacementDrives);

router.get('/placement-drives/:driveId', getPlacementDriveData);

router.get('/:companyId', getCompanyData);

export default router;