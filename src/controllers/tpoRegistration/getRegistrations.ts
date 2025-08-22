import { Request, Response } from "express";
import db from "../../models";

declare module "express-session" {
  interface SessionData {
    uuid?: string;
    username?: string;
  }
}

const TPORegistrations = db.TPORegistrations;
const DriveTypes = db.DriveTypes;

export const getRegistrationsByUser = async (req: Request, res: Response) => {
  try {
    const userId = req.params.userId;
    if (!userId) {
      return res.status(400).json({ error: "userId parameter is required" });
    }

    const registrations = await TPORegistrations.findAll({
      attributes: ["id", "userId", "academicYear"],
      include: [
        {
          model: DriveTypes,
          as: "driveType",
          attributes: ["driveTypeName"],
        },
      ],
      where: { isDeleted: false, userId: userId },
      order: [["createdAt", "DESC"]],
    });

    res.json(registrations);
  } catch (error) {
    res.status(500).json({ error: (error as Error).message });
  }
};
