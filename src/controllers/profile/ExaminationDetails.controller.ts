import { Request, Response } from "express";
import db from "../../models"; // adjust path as per your project
const ExaminationDetails = db.ExaminationDetails;

export const createExaminationDetails = async (req: Request, res: Response) => {
  try {
    const {
      registrationNo,
      academicYear,
      semester,
      cpi,
      spi,
      deadBacklog,
      activeBacklog,
      backlogName,
      action,
    } = req.body;

    // ✅ Validate required fields
    if (
      !registrationNo ||
      !academicYear ||
      semester === undefined ||
      !cpi ||
      !spi
    ) {
      return res.status(400).json({
        error: "registrationNo, academicYear, semester, cpi and spi are required",
      });
    }

    // ✅ Create record
    const newExamDetails = await ExaminationDetails.create({
      registrationNo,
      academicYear,
      semester,
      cpi,
      spi,
      deadBacklog: deadBacklog || 0,
      activeBacklog: activeBacklog || 0,
      backlogName: backlogName || null,
      action: action || null,
    });

    return res.status(201).json({
      message: "Examination details created successfully",
      data: newExamDetails,
    });
  } catch (error: any) {
    console.error("Error creating ExaminationDetails:", error);
    return res.status(500).json({
      error: "Internal server error",
      details: error.message,
    });
  }
};
export const getExaminationDetails = async (req: Request, res: Response) => {
  try {
    const { registrationNo } = req.params;

    const examDetails = await ExaminationDetails.findOne({
      where: { registrationNo },
    });

    if (!examDetails) {
      return res.status(404).json({ error: "Examination details not found" });
    }

    return res.status(200).json({
      message: "Examination details retrieved successfully",
      data: examDetails,
    });
  } catch (error: any) {
    console.error("Error retrieving ExaminationDetails:", error);
    return res.status(500).json({
      error: "Internal server error",
      details: error.message,
    });
  }
};
export const updateExaminationDetails = async (req: Request, res: Response) => {
  try {
    const { registrationNo } = req.params;
    const {
      academicYear,
      semester,
      cpi,
      spi,
      deadBacklog,
      activeBacklog,
      backlogName,
      action,
    } = req.body;

    const examDetails = await ExaminationDetails.findOne({
      where: { registrationNo },
    });

    if (!examDetails) {
      return res.status(404).json({ error: "Examination details not found" });
    }

    // ✅ Update record
    await ExaminationDetails.update(
      {
        academicYear,
        semester,
        cpi,
        spi,
        deadBacklog,
        activeBacklog,
        backlogName,
        action,
      },
      { where: { registrationNo } }
    );

    return res.status(200).json({
      message: "Examination details updated successfully",
    });
  } catch (error: any) {
    console.error("Error updating ExaminationDetails:", error);
    return res.status(500).json({
      error: "Internal server error",
      details: error.message,
    });
  }
};
