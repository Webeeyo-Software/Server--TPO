import { Request, Response } from "express";
import db from "../../models";
const Companies = db.Companies;
const PlacementDrives = db.PlacementDrives;

export const getCompanyData = async (req: Request, res: Response) => {
  try {
    const { companyId } = req.params;
    if (!companyId) {
      return res.status(400).json({ success: false, message: "companyId is required in the URL" });
    }

    const companyDatafromCompanies = await Companies.findOne({
      where: { id: companyId },
      attributes: [
        'name', 
        'description',
        'website',
        'email',
        'contactNumber',
        'location',
        'logoUrl',
      ],
    });

    const companyDatafromPlacementDrives = await PlacementDrives.findOne({
      where: { companyId },
      attributes: [
        'companyId',
        'position',
        'eligibilityCriteria',
        'jobDescription',
        'ctc',
        'applicationDeadline',
        'minPack',
        'maxPack',
      ],
    });

    if (!companyDatafromPlacementDrives && !companyDatafromCompanies) {
      return res.status(404).json({ success: false, message: "No data found for that companyId" });
    }

    const companyData = {
      ...(companyDatafromCompanies ? companyDatafromCompanies.toJSON() : {}),
      ...(companyDatafromPlacementDrives ? companyDatafromPlacementDrives.toJSON() : {})
    };

    return res.status(200).json({ success: true, data: companyData });
  } catch (err: any) {
    console.error("Error in getCompanyData:", err);
    return res.status(500).json({
      success: false,
      message: "Internal server error while fetching company data",
      error: err.message,
    });
  }
};