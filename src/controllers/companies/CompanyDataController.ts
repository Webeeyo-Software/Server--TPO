import { Request, Response } from "express";
import db from "../../models"; 

const CompanyData = db.PlacementDrives;

export const getCompanyData = async (req: Request, res: Response) => {
  try {
    const { companyId } = req.params;

    const companyData = await CompanyData.findOne({
      where: { companyId },
      attributes: ["id", "companyName", "location", "eligibilityCriteria", "jobDescription", "minSalary", "maxSalary"]
    });

    if (!companyData) {
      return res.status(404).json({
        success: false,
        message: "Company data not found"
      });
    }

    res.status(200).json({
      success: true,
      data: companyData
    });
  } catch (err: any) {
    console.error(err);
    res.status(500).json({
      success: false,
      message: "Internal server error while fetching company data",
      error: err.message,
    });
  }
};
