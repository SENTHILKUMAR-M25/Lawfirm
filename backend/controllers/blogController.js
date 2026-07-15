const Blog = require('../models/Blog');

exports.getBlogs = async (req, res, next) => {
  try {
    const { category, search, page = 1, limit = 9 } = req.query;
    const query = req.query.all === 'true' ? {} : { isPublished: true };
    if (category) query.category = category;
    if (search) query.title = { $regex: search, $options: 'i' };

    const total = await Blog.countDocuments(query);
    const blogs = await Blog.find(query).sort('-createdAt').skip((page - 1) * limit).limit(parseInt(limit));
    res.json({ success: true, count: blogs.length, total, pages: Math.ceil(total / limit), blogs });
  } catch (err) { next(err); }
};

exports.getBlogBySlug = async (req, res, next) => {
  try {
    const blog = await Blog.findOneAndUpdate({ slug: req.params.slug }, { $inc: { views: 1 } }, { new: true });
    if (!blog) return res.status(404).json({ success: false, message: 'Not found' });
    res.json({ success: true, blog });
  } catch (err) { next(err); }
};

exports.getBlogById = async (req, res, next) => {
  try {
    const blog = await Blog.findById(req.params.id);
    if (!blog) return res.status(404).json({ success: false, message: 'Not found' });
    res.json({ success: true, blog });
  } catch (err) { next(err); }
};

exports.createBlog = async (req, res, next) => {
  try {
    const blog = await Blog.create(req.body);
    res.status(201).json({ success: true, blog });
  } catch (err) { next(err); }
};

exports.updateBlog = async (req, res, next) => {
  try {
    const blog = await Blog.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!blog) return res.status(404).json({ success: false, message: 'Not found' });
    res.json({ success: true, blog });
  } catch (err) { next(err); }
};

exports.deleteBlog = async (req, res, next) => {
  try {
    await Blog.findByIdAndDelete(req.params.id);
    res.json({ success: true, message: 'Deleted' });
  } catch (err) { next(err); }
};

exports.getBlogCategories = async (req, res, next) => {
  try {
    const categories = await Blog.distinct('category');
    res.json({ success: true, categories });
  } catch (err) { next(err); }
};
