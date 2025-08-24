import {Request,Response} from 'express';
import db from '../../models/index';
const Nationalities = db.Nationalities;
export const createNationality = async (req: Request, res: Response) => {
    try {
        const { nationalityName } = req.body;
        if (!nationalityName || !nationalityName.trim()) {
            return res.status(400).json({ error: "Nationality name is required" });
        }
        const existing = await Nationalities.findOne({ where: { nationalityName: nationalityName.trim() } });
        if (existing) {
            return res.status(400).json({ error: `Nationality "${nationalityName}" already exists` });
        }
        const newNationality = await Nationalities.create({ nationalityName: nationalityName.trim() });
        res.status(201).json(newNationality);
    } catch (error) {
        console.error("Error creating Nationality:", error);
        res.status(500).json({ error: 'Failed to create nationality' });
    }
};
export const getAllNationalities = async (req: Request, res: Response) => {
    try {
        const nationalities = await Nationalities.findAll({ attributes: [ 'nationalityName'] });
        res.status(200).json(nationalities);
    } catch (error) {
        console.error("Error fetching nationalities:", error);
        res.status(500).json({ error: 'Failed to fetch nationalities' });
    }
};
