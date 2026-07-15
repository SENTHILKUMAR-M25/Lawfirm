const router = require('express').Router();
const { getBlogs, getBlogBySlug, getBlogById, createBlog, updateBlog, deleteBlog, getBlogCategories } = require('../controllers/blogController');
const { protect, authorize } = require('../middleware/auth');

router.get('/categories', getBlogCategories);
router.route('/')
  .get(getBlogs)
  .post(protect, authorize('admin'), createBlog);

router.get('/slug/:slug', getBlogBySlug);

router.route('/:id')
  .get(getBlogById)
  .put(protect, authorize('admin'), updateBlog)
  .delete(protect, authorize('admin'), deleteBlog);

module.exports = router;
