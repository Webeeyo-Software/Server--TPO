import {Request,Response} from 'express';
import db from '../../models/index';
const Categories = db.Categories;
export const createCategory = async (req: Request, res: Response) => {
    try {
        const { categoryName } = req.body;
        if (!categoryName || !categoryName.trim()) {
            return res.status(400).json({ error: "Category name is required" });
        }
        const existing = await Categories.findOne({ where: { categoryName: categoryName.trim() } });
        if (existing) {
            return res.status(400).json({ error: `Category "${categoryName}" already exists` });
        }
        const newCategory = await Categories.create({ categoryName: categoryName.trim() });
        res.status(201).json(newCategory);
    } catch (error) {
        console.error("Error creating category:", error);
        res.status(500).json({ error: 'Failed to create category' });
    }
};
