import { Request, Response } from "express";
import db from "../../models";


const TPORegistrations = db.TPORegistrations;

export const deleteRegistration = async (req: Request, res: Response) => {
  try {
    const registration = await TPORegistrations.findByPk(req.params.id);
    if (!registration) {
      return res.status(404).json({ error: "Registration not found" });
    }

    await registration.update({ isDeleted: true });

    res.json({ message: "Registration deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: (error as Error).message });
  }
};
