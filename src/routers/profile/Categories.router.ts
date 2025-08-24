import {Router} from 'express';
import { createCategory,getAllCategories } from '../../controllers/profile/Categories.controller';
const categoryrouter=Router();
categoryrouter.post("/",createCategory)
categoryrouter.get("/",getAllCategories)
export default categoryrouter;
