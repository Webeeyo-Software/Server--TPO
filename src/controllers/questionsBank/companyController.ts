import { Request, Response } from "express";
import db from "../../models";

const Company = db.Company;

export const createCompany = async (req: Request, res: Response) => {
  try {
    const company = await Company.create(req.body);
    res.status(201).json(company);
  } catch (error) {
    res.status(400).json({ error: (error as Error).message });
  }
};

export const getCompanies = async (req: Request, res: Response) => {
  try {
    const companies = await Company.findAll();
    res.json(companies);
  } catch (error) {
    res.status(500).json({ error: (error as Error).message });
  }
};

export const getCompanyById = async (req: Request, res: Response) => {
  try {
    const company = await Company.findByPk(req.params.id);
    if (!company) return res.status(404).json({ error: "Company not found" });
    res.json(company);
  } catch (error) {
    res.status(500).json({ error: (error as Error).message });
  }
};

export const updateCompany = async (req: Request, res: Response) => {
  try {
    const company = await Company.findByPk(req.params.id);
    if (!company) return res.status(404).json({ error: "Company not found" });
    await company.update(req.body);
    res.json(company);
  } catch (error) {
    res.status(400).json({ error: (error as Error).message });
  }
};

export const deleteCompany = async (req: Request, res: Response) => {
  try {
    const company = await Company.findByPk(req.params.id);
    if (!company) return res.status(404).json({ error: "Company not found" });
    await company.destroy();
    res.json({ message: "Company deleted" });
  } catch (error) {
    res.status(500).json({ error: (error as Error).message });
  }
};
