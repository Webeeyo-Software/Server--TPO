import { Request, Response } from 'express';
import db from '../models';

const Notice = db.Notice;

// Get all notices
export const getNotices = async (_req: Request, res: Response) => {
  try {
    const notices = await Notice.findAll();
    res.json(notices);
  } catch (error) {
    res.status(500).json({ error: (error as Error).message });
  }
};

// Get notice by ID
export const getNoticeById = async (req: Request, res: Response) => {
  try {
    const notice = await Notice.findByPk(req.params.id);
    if (!notice) return res.status(404).json({ error: 'Notice not found' });
    res.json(notice);
  } catch (error) {
    res.status(500).json({ error: (error as Error).message });
  }
};
