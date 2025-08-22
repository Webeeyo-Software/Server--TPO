// controllers/academicDetailsController.ts
import { Request, Response } from "express";
import db from "../../models"; // adjust path to your models/index
const AcademicDetails = db.AcademicDetails;

export const createAcademicDetails = async (req: Request, res: Response) => {
  try {
    const {
      registrationNo,
      sscPercent,
      sscBoard,
      sscInstitute,
      sscYear,
      hscPercent,
      hscBoard,
      hscInstitute,
      hscYear,
      diplomaPercent,
      diplomaBoard,
      diplomaYear,
      diplomaInstitute,
      graduationCPI,
      graduationPercent,
      graduationYear,
      graduationInstitute,
      graduationUniversity,
      postGraduationCPI,
      highestQualification,
      isDirectSecondYear,
      isGoingForHigherStudies,
      isInterestedOnlyInInternship,
    } = req.body;

    // Validation: check required field
    if (!registrationNo) {
      return res.status(400).json({ error: "registrationNo is required" });
    }

    // Create new record
    const academicDetail = await AcademicDetails.create({
      registrationNo,
      sscPercent,
      sscBoard,
      sscInstitute,
      sscYear,
      hscPercent,
      hscBoard,
      hscInstitute,
      hscYear,
      diplomaPercent,
      diplomaBoard,
      diplomaYear,
      diplomaInstitute,
      graduationCPI,
      graduationPercent,
      graduationYear,
      graduationInstitute,
      graduationUniversity,
      postGraduationCPI,
      highestQualification,
      isDirectSecondYear,
      isGoingForHigherStudies,
      isInterestedOnlyInInternship,
    });

    return res.status(201).json({
      message: "Academic details created successfully",
      data: academicDetail,
    });
  } catch (error: any) {
    console.error("Error creating AcademicDetails:", error);
    return res.status(500).json({
      error: "Internal server error",
      details: error.message,
    });
  }
};
export const getAcademicDetails = async (req: Request, res: Response) => {
  try {
    const { registrationNo } = req.params;

    if (!registrationNo) {
      return res.status(400).json({ error: "registrationNo is required" });
    }

    const academicDetail = await AcademicDetails.findOne({
      where: { registrationNo },
    });

    if (!academicDetail) {
      return res.status(404).json({ error: "Academic details not found" });
    }

    return res.status(200).json({
      message: "Academic details retrieved successfully",
      data: academicDetail,
    });
  } catch (error: any) {
    console.error("Error retrieving AcademicDetails:", error);
    return res.status(500).json({
      error: "Internal server error",
      details: error.message,
    });
  }
};
export const updateAcademicDetails = async (req: Request, res: Response) => {
  try {
    const { registrationNo } = req.params; // URL param: /academic-details/:registrationNo
    const updateData = req.body;

    // Validate
    if (!registrationNo) {
      return res.status(400).json({ error: "registrationNo is required" });
    }

    // Find record
    const academicDetails = await AcademicDetails.findOne({
      where: { registrationNo },
    });

    if (!academicDetails) {
      return res
        .status(404)
        .json({ error: "Academic details not found for this student" });
    }

    // Update record
    await academicDetails.update(updateData);

    return res.status(200).json({
      message: "Academic details updated successfully",
      data: academicDetails,
    });
  } catch (error: any) {
    console.error("Error updating academic details:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
};