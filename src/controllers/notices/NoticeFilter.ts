import { Request, Response } from "express";
import db from "../../models";
import { Op } from "sequelize";

const Notices = db.Notices;

export const filterNotices = async (req: Request, res: Response) => {
  try {
    const { types, programs, minPackage, maxPackage, startDate, endDate } = req.body;
    const where: any = {};

    if (types && types.length > 0) {
      where.type = { [Op.in]: types };
    }
    if (programs && programs.length > 0) {
      where.program = { [Op.in]: programs };
    }
    if (minPackage || maxPackage) {
      where.package = {
        [Op.between]: [minPackage || 0, maxPackage || 99999999],
      };
    }
    if (startDate && endDate) {
      where.date = {
        [Op.between]: [new Date(startDate), new Date(endDate)],
      };
    }

    const notices = await Notices.findAll({ where });
    res.json(notices);
  } catch (error) {
    res.status(500).json({ error: (error as Error).message });
  }
};
