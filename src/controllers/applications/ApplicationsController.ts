import { Request, Response } from "express";
import db from "../../models";

const Applications = db.Applications;

const getApplicationStatus = async (req: Request, res: Response) => {
  try {
    const { applicationId } = req.params;
    
    if (!applicationId) {
      return res.status(400).json({ 
        success: false, 
        message: "applicationId is required in the URL" 
      });
    }

    const application = await Applications.findOne({
      where: { id: applicationId },
      include: [
        {
          model: db.ApplicationStatuses,
          as: "status",
          attributes: ["statusName"]
        }
      ],
    });

    if (!application) {
      return res.status(404).json({ 
        success: false, 
        message: "No application found with that ID" 
      });
    }

    return res.status(200).json({ 
      success: true, 
      data: {
        status: application.status
      }
    });
  } catch (err: any) {
    console.error("Error in getApplicationStatus:", err);
    return res.status(500).json({
      success: false,
      message: "Internal server error while fetching application status",
      error: process.env.NODE_ENV === 'development' ? err.message : 'Something went wrong'
    });
  }
};

export { getApplicationStatus };