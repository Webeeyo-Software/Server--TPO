import { Router } from 'express';

import { getNotices, getNoticeById } from '../controllers/Notice.Get';
import { createNotice } from '../controllers/NoticePost';

const router = Router();

// GET routes
router.get('/', getNotices);
router.get('/:id', getNoticeById);
// POST route
router.post('/', createNotice);

export default router;
