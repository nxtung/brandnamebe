import express from 'express';
import { ekycTokens, remainRequest } from '../controllers/ekycTokensController.js';
import checkApiKey from '../middlewares/checkApiKey.js';

const router = express.Router();

router.post('/', checkApiKey, ekycTokens);
router.post('/remain', checkApiKey, remainRequest);

export default router;