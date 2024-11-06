import express from 'express';
import  checkSpam  from '../controllers/spamController.js';

const router = express.Router();

// Route để kiểm tra spam
router.get('/', checkSpam);

export default router;