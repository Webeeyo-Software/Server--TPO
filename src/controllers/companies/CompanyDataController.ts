import { Request, Response } from "express";
import db from "../../models";

const Companies = db.Companies;
const PlacementDrives = db.PlacementDrives;

/**
 * Get company details by companyId
 */
export const getCompanyData = async (req: Request, res: Response) => {
  try {
    const { companyId } = req.params;
    if (!companyId) {
      return res.status(400).json({ success: false, message: "companyId is required in the URL" });
    }

    const companyDatafromCompanies = await Companies.findOne({
      where: { id: companyId },
      attributes: [
        "name",
        "description",
        "website",
        "email",
        "contactNumber",
        "location",
        "logoUrl",
      ],
    });

    const companyDatafromPlacementDrives = await PlacementDrives.findOne({
      where: { companyId },
      attributes: [
        "companyId",
        "position",
        "eligibilityCriteria",
        "jobDescription",
        "ctc",
        "applicationDeadline",
        "minPack",
        "maxPack",
      ],
    });

    if (!companyDatafromCompanies && !companyDatafromPlacementDrives) {
      return res.status(404).json({ success: false, message: "Company not found" });
    }

    return res.json({
      success: true,
      company: companyDatafromCompanies,
      placementDrive: companyDatafromPlacementDrives,
    });
  } catch (error: any) {
    console.error("Error in getCompanyData:", error);
    return res.status(500).json({ success: false, message: "Internal server error" });
  }
};

/**
 * Get placement drive details by driveId
 */
export const getPlacementDriveData = async (req: Request, res: Response) => {
  try {
    const { driveId } = req.params;
    if (!driveId) {
      return res.status(400).json({ success: false, message: "driveId is required in the URL" });
    }

    const placementDrive = await PlacementDrives.findOne({
      where: { id: driveId },
      attributes: [
        "id",
        "companyId",
        "position",
        "eligibilityCriteria",
        "jobDescription",
        "ctc",
        "applicationDeadline",
        "minPack",
        "maxPack",
      ],
    });

    if (!placementDrive) {
      return res.status(404).json({ success: false, message: "Placement drive not found" });
    }

    return res.json({ success: true, placementDrive });
  } catch (error: any) {
    console.error("Error in getPlacementDriveData:", error);
    return res.status(500).json({ success: false, message: "Internal server error" });
  }
};
