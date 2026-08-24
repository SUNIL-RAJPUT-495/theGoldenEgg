import express from 'express';
import { getAllBanners, createBanner, updateBanner, deleteBanner } from '../controllers/bannerController.js';

const router = express.Router();

router.get('/', getAllBanners);
router.post('/', createBanner);
router.put('/:id', updateBanner);
router.delete('/:id', deleteBanner);

export default router;
