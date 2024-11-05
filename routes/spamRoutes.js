const express = require('express');
const { checkSpam } = require('../controllers/spamController');

const router = express.Router();

// Route để kiểm tra spam
router.get('/', checkSpam);

module.exports = router;