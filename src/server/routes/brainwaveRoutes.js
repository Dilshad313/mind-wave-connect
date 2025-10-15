import express from 'express';
import {
  createBrainwave,
  getBrainwaves,
  getBrainwaveById,
  updateBrainwave,
  deleteBrainwave,
  addComment,
  likeBrainwave,
} from '../controllers/brainwaveController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.route('/')
  .get(getBrainwaves)
  .post(protect, createBrainwave);

router.route('/:id')
  .get(getBrainwaveById)
  .put(protect, updateBrainwave)
  .delete(protect, deleteBrainwave);

router.route('/:id/comments').post(protect, addComment);
router.route('/:id/like').put(protect, likeBrainwave);

export default router;