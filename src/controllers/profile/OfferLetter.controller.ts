import { Request, Response } from "express";
import db from "../../models";

const OfferLetter = db.OfferLetter;

interface MulterRequest extends Request {
  file?: Express.Multer.File;
}

export const uploadOfferLetter = async (req: MulterRequest, res: Response) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: "No file uploaded" });
    }
    const { userId, isDefault } = req.body;
    const filePath = req.file.path; 

    const offerLetter = await OfferLetter.create({
      userId,
      filePath,
      isDefault: isDefault === "true", 
    });

    res.status(201).json({
      message: "Offer letter uploaded successfully",
      data: offerLetter,
    });
  } catch (error) {
    res.status(500).json({ error: (error as Error).message });
  }
};

export const getOfferLetterById = async (req: Request, res: Response) => {
  try {
    const offerLetter = await OfferLetter.findByPk(req.params.id);
    if (!offerLetter) {
      return res.status(404).json({ error: "Offer letter not found" });
    }
    res.json(offerLetter);
  } catch (error) {
    res.status(500).json({ error: (error as Error).message });
  }
};


