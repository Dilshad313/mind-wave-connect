import Brainwave from '../models/brainwaveModel.js';
import asyncHandler from 'express-async-handler';

// @desc    Get all brainwave categories
// @route   GET /api/brainwaves/categories
// @access  Public
const getCategories = asyncHandler(async (req, res) => {
  const categories = await Brainwave.distinct('category');
  res.json(categories);
});

// @desc    Get brainwaves by category
// @route   GET /api/brainwaves/category/:category
// @access  Public
const getBrainwavesByCategory = asyncHandler(async (req, res) => {
  const pageSize = 10;
  const page = Number(req.query.pageNumber) || 1;
  const category = req.params.category;

  const keyword = req.query.keyword
    ? {
        $or: [
          { title: { $regex: req.query.keyword, $options: 'i' } },
          { description: { $regex: req.query.keyword, $options: 'i' } },
        ],
      }
    : {};

  const filter = {
    ...keyword,
    category,
    isPublic: true, // Only public brainwaves
  };

  const count = await Brainwave.countDocuments(filter);
  const brainwaves = await Brainwave.find(filter)
    .populate('user', 'name profilePicture')
    .limit(pageSize)
    .skip(pageSize * (page - 1))
    .sort({ createdAt: -1 });

  res.json({
    brainwaves,
    page,
    pages: Math.ceil(count / pageSize),
    count,
    category,
  });
});

// @desc    Get trending brainwaves (most liked)
// @route   GET /api/brainwaves/trending
// @access  Public
const getTrendingBrainwaves = asyncHandler(async (req, res) => {
  const brainwaves = await Brainwave.find({ isPublic: true })
    .populate('user', 'name profilePicture')
    .sort({ likes: -1 }) // Sort by number of likes (descending)
    .limit(10);

  res.json(brainwaves);
});

// @desc    Get brainwaves by user
// @route   GET /api/brainwaves/user/:userId
// @access  Public (for public brainwaves) / Private (for all brainwaves)
const getBrainwavesByUser = asyncHandler(async (req, res) => {
  const pageSize = 10;
  const page = Number(req.query.pageNumber) || 1;
  const userId = req.params.userId;

  let filter = { user: userId };
  
  // If not the same user, only show public brainwaves
  if (!req.user || req.user._id.toString() !== userId.toString()) {
    filter.isPublic = true;
  }

  const count = await Brainwave.countDocuments(filter);
  const brainwaves = await Brainwave.find(filter)
    .populate('user', 'name profilePicture')
    .limit(pageSize)
    .skip(pageSize * (page - 1))
    .sort({ createdAt: -1 });

  res.json({
    brainwaves,
    page,
    pages: Math.ceil(count / pageSize),
    count,
  });
});

export { 
  getCategories, 
  getBrainwavesByCategory, 
  getTrendingBrainwaves, 
  getBrainwavesByUser 
};