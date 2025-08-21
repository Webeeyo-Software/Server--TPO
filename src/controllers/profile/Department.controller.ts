import {Request,Response} from 'express';
import db from '../../models/index';
const Departments=db.Departments;
export const createDepartments = async (req:Request,res:Response) =>{
  try{
    const {deptName} = req.body;
    if(!deptName || !deptName.trim()){
      return res.status(400).json({error:"Department name is required"});
    }
    const existing = await Departments.findOne({where:{deptName: deptName.trim()}});
    if(existing){
      return res.status(400).json({error:`Department "${deptName}"already exists`});
    }
    const newDepartment = await Departments.create({
      deptName: deptName.trim(),
    });
    return res.status(201).json({
      message:"Department created successfully",
      data:newDepartment,
    });
}catch(error){
  console.error("Error creating department:", error);
  return res.status(500).json({error: (error as Error).message});
}

}