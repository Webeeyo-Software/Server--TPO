import { Router } from "express";
import { filterNotices } from "../controllers/FilterNotice.Get";

const router = Router();

router.post("/filter", filterNotices);

export default router;
