const express = require('express');
const router = express.Router();
const { createOtp, getOtps, deleteOtp } = require('../controllers/otpController');
const checkApiKey = require('../middlewares/checkApiKey'); // Import middleware kiểm tra API Key

// Route để tạo OTP
router.post('/', checkApiKey, createOtp);

// Route để lấy danh sách OTPs
router.get('/', getOtps);

// Route để xóa OTP theo ID
router.delete('/:id', deleteOtp);

module.exports = router;