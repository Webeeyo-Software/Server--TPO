import { Request, Response } from "express";
import db from "../../models";

const TPORegistrations = db.TPORegistrations;
const DriveTypes = db.DriveTypes;

export const addRegistration = async (req: Request, res: Response) => {
  const { userId, driveTypeName, academicYear } = req.body;

  if (!userId || !driveTypeName || !academicYear) {
    return res.status(400).json({ error: "userId, driveTypeName and academicYear are required" });
  }

  try {
    const driveType = await DriveTypes.findOne({
      where: { driveTypeName },
      attributes: ['id']
    });

    if (!driveType) {
      return res.status(400).json({ error: `DriveType not found for name: '${driveTypeName}'` });
    }

    const registration = await TPORegistrations.create({
      userId,
      driveTypeId: driveType.id,
      academicYear,
      status: "Pending",
      isDeleted: false,
      verifiedBy: userId,
      createdAt: new Date()
    });

    res.status(201).json(registration);
  } catch (error) {
    res.status(500).json({ error: (error as Error).message });
  }
};
