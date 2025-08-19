import { Request, Response } from 'express';
import db from '../models';

const Notice = db.Notice;

// Create a new notice
export const createNotice = async (req: Request, res: Response) => {
  try {
    const notice = await Notice.create(req.body);
    res.status(201).json(notice);
  } catch (error) {
    res.status(400).json({ error: (error as Error).message });
  }
};
