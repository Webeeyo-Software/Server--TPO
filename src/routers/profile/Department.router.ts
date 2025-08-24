import { Router } from "express";
import { createDepartments,getAllDepartments } from "../../controllers/profile/Department.controller";

const DepartmentRouter = Router();

DepartmentRouter.post("/", createDepartments);
DepartmentRouter.get("/", getAllDepartments);

export default DepartmentRouter;
