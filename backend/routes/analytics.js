import express from 'express';
import { getAnalyticsStats } from '../controllers/analyticsController.js';

const router = express.Router();

router.get('/', getAnalyticsStats);

export default router;
