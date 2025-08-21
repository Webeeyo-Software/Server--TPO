import express from "express";
import { getNotices } from "../../controllers/notices/NoticeGet";


const router = express.Router();



router.get("/", getNotices);



export default router;