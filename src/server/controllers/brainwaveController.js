import Brainwave from '../models/brainwaveModel.js';
import asyncHandler from 'express-async-handler';

// @desc    Create a new brainwave
// @route   POST /api/brainwaves
// @access  Private
const createBrainwave = asyncHandler(async (req, res) => {
  const { title, description, category, content, tags, isPublic } = req.body;

  const brainwave = new Brainwave({
    user: req.user._id,
    title,
    description,
    category,
    content,
    tags: tags || [],
    isPublic: isPublic || false,
  });

  const createdBrainwave = await brainwave.save();
  res.status(201).json(createdBrainwave);
});

// @desc    Get all brainwaves
// @route   GET /api/brainwaves
// @access  Public
const getBrainwaves = asyncHandler(async (req, res) => {
  const page = Number(req.query.pageNumber) || 1;
  const pageSize = Number(req.query.pageSize) || 10;
  const sort = req.query.sort || 'newest'; // Default sort option
  
  // Use the new search utilities
  const filter = {};
  
  // Keyword search
  if (req.query.keyword) {
    filter.$or = [
      { title: { $regex: req.query.keyword, $options: 'i' } },
      { description: { $regex: req.query.keyword, $options: 'i' } },
      { content: { $regex: req.query.keyword, $options: 'i' } }
    ];
  }
  
  // Category filter
  if (req.query.category) {
    filter.category = { $regex: req.query.category, $options: 'i' };
  }
  
  // Tags filter (if provided)
  if (req.query.tags) {
    const tagsArray = Array.isArray(req.query.tags) ? req.query.tags : [req.query.tags];
    filter.tags = { $in: tagsArray };
  }
  
  // Only show public brainwaves or user's own brainwaves
  if (req.user) {
    filter.$or = [
      { isPublic: true },
      { user: req.user._id }
    ];
  } else {
    filter.isPublic = true;
  }

  // Remove the $or from the filter for count
  const countFilter = { ...filter };
  delete countFilter.$or;
  
  const count = await Brainwave.countDocuments({ 
    $and: [
      countFilter,
      { 
        $or: [
          { isPublic: true },
          { user: req.user ? req.user._id : null }
        ] 
      }
    ]
  });
  
  let query = Brainwave.find({ 
    ...filter 
  })
  .populate('user', 'name profilePicture');

  // Apply sorting and pagination
  query = query.sort(sort === 'newest' ? { createdAt: -1 } : 
             sort === 'oldest' ? { createdAt: 1 } :
             sort === 'mostLiked' ? { likes: -1, createdAt: -1 } : 
             { createdAt: -1 });
             
  query = query.limit(pageSize).skip(pageSize * (page - 1));

  const brainwaves = await query;

  res.json({
    brainwaves,
    page,
    pages: Math.ceil(count / pageSize),
    count,
    pageSize,
  });
});

// @desc    Get brainwave by ID
// @route   GET /api/brainwaves/:id
// @access  Public/Private (depends on isPublic)
const getBrainwaveById = asyncHandler(async (req, res) => {
  const brainwave = await Brainwave.findById(req.params.id)
    .populate('user', 'name profilePicture')
    .populate('comments.user', 'name profilePicture');

  if (brainwave) {
    // Check if brainwave is public or belongs to the user
    if (brainwave.isPublic || (req.user && brainwave.user._id.toString() === req.user._id.toString())) {
      res.json(brainwave);
    } else {
      res.status(403);
      throw new Error('Not authorized to access this brainwave');
    }
  } else {
    res.status(404);
    throw new Error('Brainwave not found');
  }
});

// @desc    Update a brainwave
// @route   PUT /api/brainwaves/:id
// @access  Private
const updateBrainwave = asyncHandler(async (req, res) => {
  const { title, description, category, content, tags, isPublic } = req.body;

  const brainwave = await Brainwave.findById(req.params.id);

  if (brainwave) {
    // Check if user owns the brainwave
    if (brainwave.user.toString() !== req.user._id.toString()) {
      res.status(403);
      throw new Error('Not authorized to update this brainwave');
    }

    brainwave.title = title || brainwave.title;
    brainwave.description = description || brainwave.description;
    brainwave.category = category || brainwave.category;
    brainwave.content = content || brainwave.content;
    brainwave.tags = tags || brainwave.tags;
    brainwave.isPublic = isPublic !== undefined ? isPublic : brainwave.isPublic;

    const updatedBrainwave = await brainwave.save();
    res.json(updatedBrainwave);
  } else {
    res.status(404);
    throw new Error('Brainwave not found');
  }
});

// @desc    Delete a brainwave
// @route   DELETE /api/brainwaves/:id
// @access  Private
const deleteBrainwave = asyncHandler(async (req, res) => {
  const brainwave = await Brainwave.findById(req.params.id);

  if (brainwave) {
    // Check if user owns the brainwave
    if (brainwave.user.toString() !== req.user._id.toString()) {
      res.status(403);
      throw new Error('Not authorized to delete this brainwave');
    }

    await Brainwave.deleteOne({ _id: req.params.id });
    res.json({ message: 'Brainwave removed' });
  } else {
    res.status(404);
    throw new Error('Brainwave not found');
  }
});

// @desc    Add comment to brainwave
// @route   POST /api/brainwaves/:id/comments
// @access  Private
const addComment = asyncHandler(async (req, res) => {
  const { text } = req.body;

  const brainwave = await Brainwave.findById(req.params.id);

  if (brainwave) {
    // Only allow comments on public brainwaves or user's own brainwaves
    if (!brainwave.isPublic && brainwave.user.toString() !== req.user._id.toString()) {
      res.status(403);
      throw new Error('Cannot comment on private brainwaves');
    }

    const comment = {
      user: req.user._id,
      text,
      name: req.user.name,
    };

    brainwave.comments.push(comment);
    await brainwave.save();
    res.status(201).json({ message: 'Comment added' });
  } else {
    res.status(404);
    throw new Error('Brainwave not found');
  }
});

// @desc    Like/unlike a brainwave
// @route   PUT /api/brainwaves/:id/like
// @access  Private
const likeBrainwave = asyncHandler(async (req, res) => {
  const brainwave = await Brainwave.findById(req.params.id);

  if (brainwave) {
    // Only allow likes on public brainwaves
    if (!brainwave.isPublic && brainwave.user.toString() !== req.user._id.toString()) {
      res.status(403);
      throw new Error('Cannot like private brainwaves');
    }

    // Check if already liked
    const alreadyLiked = brainwave.likes.find(
      (like) => like.toString() === req.user._id.toString()
    );

    if (alreadyLiked) {
      // Unlike
      brainwave.likes = brainwave.likes.filter(
        (like) => like.toString() !== req.user._id.toString()
      );
    } else {
      // Like
      brainwave.likes.push(req.user._id);
    }

    await brainwave.save();
    res.json({ likes: brainwave.likes });
  } else {
    res.status(404);
    throw new Error('Brainwave not found');
  }
});

export {
  createBrainwave,
  getBrainwaves,
  getBrainwaveById,
  updateBrainwave,
  deleteBrainwave,
  addComment,
  likeBrainwave,
};