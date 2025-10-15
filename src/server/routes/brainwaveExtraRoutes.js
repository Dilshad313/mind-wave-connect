import express from 'express';
import {
  getCategories,
  getBrainwavesByCategory,
  getTrendingBrainwaves,
  getBrainwavesByUser,
} from '../controllers/brainwaveExtraController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

// Get all categories
router.route('/categories').get(getCategories);

// Get brainwaves by category
router.route('/category/:category').get(getBrainwavesByCategory);

// Get trending brainwaves
router.route('/trending').get(getTrendingBrainwaves);

// Get brainwaves by user
router.route('/user/:userId').get(protect, getBrainwavesByUser);

export default router;