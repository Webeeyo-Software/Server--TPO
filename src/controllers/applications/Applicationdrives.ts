import { Request, Response } from "express";
import db from "../../models"; 

const { PlacementDrives, Companies, DriveTypes } = db;

export const getAllPlacementDrives = async (req: Request, res: Response) => {
  try {
    const placementDrives = await PlacementDrives.findAll({
      attributes: ["id", "companyId", "position", "driveDate", "applicationDeadline"],
      include: [
        {
          model: Companies,
          as: "company",
          attributes: ["id", "name", "logoUrl"], 
        },
        {
          model: DriveTypes,
          as: "driveType",
          attributes: ["id", "driveTypeName"], 
        },
      ],
      where: { isDeleted: false }, 
      order: [["createdAt", "DESC"]], 
    });

    const formattedDrives = placementDrives.map((drive: any) => ({
      id: drive.id,
      companyId: drive.companyId,
      position: drive.position,
      driveDate: drive.driveDate,
      applicationDeadline: drive.applicationDeadline,
      companyName: drive.company?.name || null,
      companyLogo: drive.company?.logoUrl || null,
      driveType: drive.driveType?.driveTypeName || null,
    }));

    return res.status(200).json({
      success: true,
      data: formattedDrives,
    });
  } catch (err: any) {
    console.error("Error fetching placement drives:", err);
    return res.status(500).json({
      success: false,
      message: "Failed to fetch placement drives",
    });
  }
};
