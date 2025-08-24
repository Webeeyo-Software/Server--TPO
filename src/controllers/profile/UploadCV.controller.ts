
import { Request, Response } from "express";
import db from "../../models";
const UploadCVS = db.UploadCVS;

export const addCVS = async (req: Request, res: Response) => {
  try {
    const { cvName, cvType, isDefault } = req.body;
    const fileUrl = req.file?.path || ""; 

    if (!cvName || !cvType || !fileUrl) {
      return res.status(400).json({ error: "cvName, cvType, and file are required" });
    }
    if (isDefault) {
      await UploadCVS.update({ isDefault: false }, { where: {} });
    }
    const cv = await UploadCVS.create({ cvName, cvType, fileUrl, isDefault });
    res.status(201).json(cv);
  } catch (error) {
    res.status(500).json({ error: "Failed to upload CV" });
  }
};

export const getAllCVs = async (req: Request, res: Response) => {
  try {
    const cvs = await UploadCVS.findAll();
    res.json(cvs);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch CVs" });
  }
};


export const updateCV = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { cvName, cvType, isDefault } = req.body;

    if (isDefault) {
      await UploadCVS.update({ isDefault: false }, { where: {} });
    }

    const [updated] = await UploadCVS.update({ cvName, cvType, isDefault }, { where: { id } });

    if (updated) {
      const updatedCV = await UploadCVS.findByPk(id);
      return res.json(updatedCV);
    }
    res.status(404).json({ error: "CV not found" });
  } catch (error) {
    res.status(500).json({ error: "Failed to update CV" });
  }
};


export const deleteCV = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const deleted = await UploadCVS.destroy({ where: { id } });
    if (deleted) {
      return res.json({ message: "CV deleted successfully" });
    }
    res.status(404).json({ error: "CV not found" });
  } catch (error) {
    res.status(500).json({ error: "Failed to delete CV" });
  }
};
