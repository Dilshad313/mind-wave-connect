// Function to build search query with multiple criteria
const buildSearchQuery = (req) => {
  const query = {};
  
  // Keyword search in title and description
  if (req.query.keyword) {
    query.$or = [
      { title: { $regex: req.query.keyword, $options: 'i' } },
      { description: { $regex: req.query.keyword, $options: 'i' } },
      { content: { $regex: req.query.keyword, $options: 'i' } }
    ];
  }
  
  // Category filter
  if (req.query.category) {
    query.category = { $regex: req.query.category, $options: 'i' };
  }
  
  // Minimum likes filter
  if (req.query.minLikes) {
    query.likes = { $size: { $gte: parseInt(req.query.minLikes) } };
  }
  
  // Date range filter
  if (req.query.startDate || req.query.endDate) {
    query.createdAt = {};
    if (req.query.startDate) {
      query.createdAt.$gte = new Date(req.query.startDate);
    }
    if (req.query.endDate) {
      query.createdAt.$lte = new Date(req.query.endDate);
    }
  }
  
  // Only show public brainwaves unless user is authenticated and requesting their own
  if (req.user) {
    query.$or = [
      { isPublic: true },
      { user: req.user._id }
    ];
  } else {
    query.isPublic = true;
  }
  
  return query;
};

// Function to apply pagination
const applyPagination = (query, page, size) => {
  const limit = parseInt(size) || 10;
  const skip = (parseInt(page) - 1) * limit;
  
  return query.limit(limit).skip(skip);
};

// Function to sort results
const applySorting = (query, sort) => {
  switch(sort) {
    case 'newest':
      return query.sort({ createdAt: -1 });
    case 'oldest':
      return query.sort({ createdAt: 1 });
    case 'mostLiked':
      return query.sort({ likes: -1 });
    case 'title':
      return query.sort({ title: 1 });
    default:
      return query.sort({ createdAt: -1 }); // Default to newest first
  }
};

export { 
  buildSearchQuery, 
  applyPagination, 
  applySorting 
};