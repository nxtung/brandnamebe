import express from 'express';
import { createOtp, getOtps, deleteOtp } from '../controllers/otpController.js'
import checkApiKey from '../middlewares/checkApiKey.js';

const router = express.Router();

// Route để tạo OTP
router.post('/', checkApiKey, createOtp);

// Route để lấy danh sách OTPs
router.get('/', getOtps);

// Route để xóa OTP theo ID
router.delete('/:id', deleteOtp);

export default router;