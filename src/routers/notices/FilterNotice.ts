import { Router } from "express";
import { filterNotices } from "../../controllers/notices/NoticeFilter";

const router = Router();

router.post("/filter", filterNotices);

export default router;
