import express from "express";
import { getNotices } from "../../controllers/notices/NoticeGet";
import { getNoticeById } from "../../controllers/notices/ReadNotice";


const router = express.Router();



router.get("/", getNotices);
router.get("/:noticeId", getNoticeById);


export default router;
