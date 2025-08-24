import {Request,Response} from 'express';
import bd from '../../models/index';
const BloodGroups = bd.BloodGroups;
export const createBloodGroup = async (req: Request, res: Response) => {
    try {
        const { bloodGroup } = req.body;
        const newBloodGroup = await BloodGroups.create({ bloodGroup });
        res.status(201).json(newBloodGroup);
    } catch (error) {
        console.error("Error creating blood group:", error);
        res.status(500).json({ error: 'Failed to create blood group' });
    }
};
export const getAllBloodGroups = async (req: Request, res: Response) => {
    try {
        const bloodGroups = await BloodGroups.findAll({ attributes: ['id', 'bloodGroup'] });
        res.status(200).json(bloodGroups);
    } catch (error) {
        console.error("Error fetching blood groups:", error);
        res.status(500).json({ error: 'Failed to fetch blood groups' });
    }
};
