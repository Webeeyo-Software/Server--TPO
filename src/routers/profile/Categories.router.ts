import {Router} from 'express';
import { createCategory } from '../../controllers/profile/Categories.controller';
const categoryrouter=Router();
categoryrouter.post("/",createCategory)
export default categoryrouter;
