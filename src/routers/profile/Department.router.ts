import { Router } from "express";
import { createDepartments } from "../../controllers/profile/Department.controller";

const DepartmentRouter = Router();

DepartmentRouter.post("/", createDepartments);

export default DepartmentRouter;
