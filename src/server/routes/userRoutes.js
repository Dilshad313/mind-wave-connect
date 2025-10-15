import express from 'express';
const router = express.Router();
import { getUserProfile, updateUserProfile } from '../controllers/userController.js';
import { protect } from '../middlewares/authMiddleware.js';

router.route('/profile').get(protect, getUserProfile).put(protect, updateUserProfile);

export default router;
