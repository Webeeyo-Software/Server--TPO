import { Request, Response } from "express";
import { Op } from "sequelize";
import db from "../../models"; // imports the `db` object from your index
const { Companies } = db; // destructure the Companies model

export const searchCompanies = async (req: Request, res: Response) => {
  try {
    const {
      search = "",
      page = "1",
      limit = "10",
      status = "Active",
    } = req.query as any;
    const pageNum = Math.max(1, parseInt(page));
    const limitNum = Math.min(50, Math.max(1, parseInt(limit)));
    const offset = (pageNum - 1) * limitNum;

    const where: any = { isDeleted: false, status };
    if (search.trim()) {
      const term = `%${search.trim()}%`;
      where[Op.or] = [
        { id: { [Op.like]: term } },
        { name: { [Op.like]: term } },
        { description: { [Op.like]: term } },
        { location: { [Op.like]: term } },
      ];
    }

    const { count, rows } = await Companies.findAndCountAll({
      where,
      limit: limitNum,
      offset,
      order: [["name", "ASC"]],
      distinct: true,
      attributes: ["id", "name", "userId", "description"], 
    });

    res.status(200).json({
      success: true,
      data: rows,
      pagination: {
        currentPage: pageNum,
        totalPages: Math.ceil(count / limitNum),
        totalItems: count,
      },
    });
  } catch (err: any) {
    console.error(err);
    res.status(500).json({
      success: false,
      message: "Internal server error while searching companies",
      error: err.message,
    });
  }
};
