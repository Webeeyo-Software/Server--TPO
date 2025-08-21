import express from "express";
import { createNotice } from "../../controllers/notices/PostNotice";
import { getNotices, getNoticeById } from "../../controllers/notices/NoticeGet";

import multer from "multer";
import path from "path";

const router = express.Router();

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "uploads/"),
  filename: (req, file, cb) => {
    const uniqueName = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, uniqueName + path.extname(file.originalname));
  },
});
const upload = multer({ storage });

// POST create notice
router.post("/createNotice", upload.single("pdf"), createNotice);

// GET all notices
router.get("/", getNotices);

// GET notice by ID
router.get("/:id", getNoticeById);

export default router;