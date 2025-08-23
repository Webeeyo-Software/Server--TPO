import express from 'express';
import { sendOtp } from '../../controllers/auth/sentController';

const router = express.Router();

router.post('/send-otp', sendOtp);

export default router;
