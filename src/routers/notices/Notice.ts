import express from "express";
import { createNotice } from "../../controllers/notices/PostNotice";
import { getNotices } from "../../controllers/notices/NoticeGet";
//import { getNoticeById } from "../../controllers/notices/NoticeGet";

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

router.post("/createNotice", upload.single("pdf"), createNotice);


router.get("/", getNotices);


export default router;