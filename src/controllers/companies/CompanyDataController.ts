import { Request, Response } from "express";
import db from "../../models";

const PlacementDrives = db.PlacementDrives;

export const getCompanyData = async (req: Request, res: Response) => {
  try {
    const { companyId } = req.params;
    if (!companyId) {
      return res.status(400).json({ success: false, message: "companyId is required in the URL" });
    }

    const companyData = await PlacementDrives.findOne({
      where: { companyId },
      attributes: [
        "id",
        "companyId",
        "position",
        "location",
        "eligibilityCriteria",
        "jobDescription",
        "minPack",
        "maxPack",
        "ctc",
        "driveDate",
        "applicationDeadline"
      ],
    });

    if (!companyData) {
      return res.status(400).json({ success: false, message: "No data found for that companyId" });
    }

    return res.status(200).json({ success: true, data: companyData });
  } catch (err: any) {
    console.error(err);
    return res.status(500).json({
      success: false,
      message: "Internal server error while fetching company data",
      error: err.message,
    });
  }
};
