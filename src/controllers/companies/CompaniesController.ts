import { Request, Response } from "express";
import { Op } from "sequelize";
import db from "../../models";
const { Companies, PlacementDrives, DriveTypes, Departments } = db;

export const searchCompanies = async (req: Request, res: Response) => {
  try {
    const {
      search = "",
      page = "1",
      limit = "10",
      status = "Active",
    } = req.query as any;
    const pageNum = Math.max(1, parseInt(page));
    const limitNum = Math.min(50, Math.max(1, parseInt(limit)));
    const offset = (pageNum - 1) * limitNum;

    const where: any = { isDeleted: false, status };
    if (search.trim()) {
      const term = `%${search.trim()}%`;
      where[Op.or] = [
        { name: { [Op.like]: term } },
        { description: { [Op.like]: term } },
        { location: { [Op.like]: term } }
      ];
    }

    const { count, rows } = await Companies.findAndCountAll({
      where,
      limit: limitNum,
      offset,
      order: [["name", "ASC"]],
      distinct: true,
      attributes: ["id", "name", "userId", "description"],
    });

    res.status(200).json({
      success: true,
      data: rows,
      pagination: {
        currentPage: pageNum,
        totalPages: Math.ceil(count / limitNum),
        totalItems: count,
      },
    });
  } catch (err: any) {
    console.error(err);
    res.status(500).json({
      success: false,
      message: "Internal server error while searching companies",
      error: err.message,
    });
  }
};

export const filterforCompanies = async (req: Request, res: Response) => {
  try {
    const {   
      minPackage, 
      maxPackage, 
      deptId, 
      driveTypeId,
    } = req.query as any;

    const whereClause: any = {
      isDeleted: false
    };

    if (deptId) {
      whereClause.deptId = deptId;
    }

    if (driveTypeId) {
      whereClause.driveTypeId = driveTypeId;
    }

    if (minPackage) {
      whereClause.minPack = { [Op.gte]: Number(minPackage) };
    }
    
    if (maxPackage) {
      whereClause.maxPack = { [Op.lte]: Number(maxPackage) };
    }

    console.log('Filter whereClause:', whereClause);

    const { count, rows } = await PlacementDrives.findAndCountAll({
      where: whereClause,
      order: [["driveDate", "DESC"]],
      include: [
        {
          model: Companies,
          as: 'company',
          attributes: ['id', 'name', 'description', 'location']
        },
        {
          model: Departments,
          as: 'departments',
          attributes: ['deptName']
        },
        {
          model: DriveTypes,
          as: 'driveType',
          attributes: ['driveTypeName']
        }
      ],
      distinct: true
    });

    return res.json({ 
      success: true, 
      data: rows,
    });
    
  } catch (error: any) {
    console.error("Error filtering companies:", error);
    return res.status(500).json({ 
      success: false, 
      message: "Internal server error",
      error: process.env.NODE_ENV === 'development' ? error.message : 'Internal server error'
    });
  }
};

export const filterforPlacementDrives = async (req: Request, res: Response) => {
  try {
    const { 
      companyId, 
      minPackage, 
      maxPackage, 
      driveTypeId, 
      page = "1", 
      limit = "10" 
    } = req.query as any;

    const pageNum = Math.max(1, parseInt(page));
    const limitNum = Math.min(50, Math.max(1, parseInt(limit)));
    const offset = (pageNum - 1) * limitNum;

    const whereClause: any = { isDeleted: false };

    if (companyId) whereClause.companyId = companyId;
    if (driveTypeId) whereClause.driveTypeId = driveTypeId;
    if (minPackage) whereClause.minPack = { [Op.gte]: Number(minPackage) };
    if (maxPackage) whereClause.maxPack = { [Op.lte]: Number(maxPackage) };

    console.log("Filter whereClause:", whereClause);

    console.log("filter endpoint hit");
    const { count, rows } = await PlacementDrives.findAndCountAll({
      where: whereClause,
      limit: limitNum,
      offset,
      order: [["driveDate", "DESC"]],
      include: [
        {
          model: Companies,
          as: "company",
          attributes: ["id", "name", "description", "location"],
        },
        {
          model: Departments,
          as: "departments",
          attributes: ["deptName"],
        },
        {
          model: DriveTypes,
          as: "driveType",
          attributes: ["driveTypeName"],
        },
      ],
      distinct: true,
    });

    if (count === 0) {
      return res.json({
        success: true,
        data: [],
        message: "No placement drives found for given filters",
        pagination: {
          currentPage: pageNum,
          totalPages: 0,
          totalItems: 0,
        },
      });
    }

    return res.json({
      success: true,
      data: rows,
      pagination: {
        currentPage: pageNum,
        totalPages: Math.ceil(count / limitNum),
        totalItems: count,
      },
    });
  } catch (error: any) {
    console.error("Error filtering placement drives:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
      error: process.env.NODE_ENV === "development" ? error.message : "Internal server error",
    });
  }
};
