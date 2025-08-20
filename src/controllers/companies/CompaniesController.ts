import { Request, Response } from "express";
import db from "../../models";

const Companies = db.Companies;

/**
 * Create a new company
 */
export const CreateCompany = async (req: Request, res: Response) => {
  try {
    const {
      id,
      name,
      userId,
      description,
      website,
      email,
      contactNumber,
      location,
      logoUrl,
      status
    } = req.body;

    // ---- Validation ----
    if (!id) return res.status(400).json({ error: "Company ID is required" });
    if (!name) return res.status(400).json({ error: "Company name is required" });
    if (!userId) return res.status(400).json({ error: "User ID is required" });

    if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return res.status(400).json({ error: "Invalid email format" });
    }

    if (contactNumber && contactNumber.length !== 10) {
      return res.status(400).json({ error: "Contact number must be 10 digits" });
    }

    if (status && !["Active", "Inactive"].includes(status)) {
      return res.status(400).json({ error: "Status must be Active or Inactive" });
    }

    // ---- Create Company ----
    const company = await Companies.create({
      id,
      name,
      userId,
      description,
      website,
      email,
      contactNumber,
      location,
      logoUrl,
      status: status || "Active",
      createdAt: new Date(),
      isDeleted: false
    });

    res.status(201).json({
      message: "Company created successfully",
      data: company,
    });

  } catch (error) {
    console.error("Error creating company:", error);
    res.status(500).json({ error: (error as Error).message });
  }
};

/**
 * Get all companies
 */
export const getAllCompanies = async (req: Request, res: Response) => {
  try {
    const companies = await Companies.findAll({
      where: { isDeleted: false },
      order: [["createdAt", "DESC"]],
    });

    if (companies.length === 0) {
      return res.status(200).json({
        message: "No companies found",
        data: [],
      });
    }

    res.status(200).json({
      message: "Companies fetched successfully",
      data: companies,
    });

  } catch (error) {
    console.error("Error fetching companies:", error);
    res.status(500).json({ error: (error as Error).message });
  }
};


/**
 * Get Active Companies
 */
export const getActiveCompanies = async (req: Request, res: Response) => {
  try {
    const { status } = req.params;

    const companies = await Companies.findAll({
      where: { isDeleted: false, status: "Active" },
      order: [["createdAt", "DESC"]],
    });

    res.status(200).json({
      message: "Companies fetched successfully",
      data: companies,
    });

  } catch (error) {
    console.error("Error fetching companies:", error);
    res.status(500).json({ error: (error as Error).message });
  }
};
