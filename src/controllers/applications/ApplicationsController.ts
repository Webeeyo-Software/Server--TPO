import { Request, Response } from "express";
import db from "../../models";

const Applications = db.Applications;
const ApplicationStatuses = db.ApplicationStatuses;

export const createApplication = async (req: Request, res: Response) => {
  try {
    const { userId, placementDriveId } = req.body;

    if (!userId || !placementDriveId) {
      return res.status(400).json({
        success: false,
        message: "userId and placementDriveId are required",
      });
    }

    const applicationstatus = await ApplicationStatuses.findOne({
      where: { statusName: "Applied" }, 
    });

    const newApplication = await Applications.create({
      userId,
      placementDriveId,
      driveId: placementDriveId, 
      documentUrl: "N/A",        
      statusId: applicationstatus.id, 
    });

    return res.status(201).json({
      success: true,
      data: newApplication,
    });
  } catch (err: any) {
    console.error("Error in createApplication:", err);
    return res.status(500).json({
      success: false,
      message: "Internal server error while creating application",
      error:
        process.env.NODE_ENV === "development"
          ? err.message
          : "Something went wrong",
    });
  }
};

export const getApplicationStatus = async (req: Request, res: Response) => {
  try {
    const { applicationId } = req.params;

    if (!applicationId) {
      return res.status(400).json({
        success: false,
        message: "applicationId is required in the URL",
      });
    }

    const application = await Applications.findOne({
      where: { id: applicationId },
      include: [
        {
          model: ApplicationStatuses,
          as: "status",
          attributes: ["statusName"],
        },
      ],
    });

    if (!application) {
      return res.status(404).json({
        success: false,
        message: "No application found with that ID",
      });
    }

    return res.status(200).json({
      success: true,
      statusName: application.status?.statusName,
    });
  } catch (err: any) {
    console.error("Error in getApplicationStatus:", err);
    return res.status(500).json({
      success: false,
      message: "Internal server error while fetching application status",
      error:
        process.env.NODE_ENV === "development"
          ? err.message
          : "Something went wrong",
    });
  }
};

