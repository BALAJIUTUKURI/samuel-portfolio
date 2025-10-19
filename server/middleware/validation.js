const validateProject = (req, res, next) => {
  const { title, description, category } = req.body;
  
  if (!title || title.trim().length === 0) {
    return res.status(400).json({ message: 'Title is required' });
  }
  
  if (!description || description.trim().length === 0) {
    return res.status(400).json({ message: 'Description is required' });
  }
  
  const validCategories = ['Branding', 'Digital Campaigns', 'Social Media', 'Print Design', 'Photography', 'Video Editing'];
  if (!category || !validCategories.includes(category)) {
    return res.status(400).json({ message: 'Valid category is required' });
  }
  
  const { mediaType } = req.body;
  if (mediaType && !['image', 'video'].includes(mediaType)) {
    return res.status(400).json({ message: 'Valid media type is required' });
  }
  
  next();
};

const validateLogin = (req, res, next) => {
  const { username, password } = req.body;
  
  if (!username || !password) {
    return res.status(400).json({ message: 'Username and password are required' });
  }
  
  next();
};

module.exports = { validateProject, validateLogin };