const router = require('express').Router();
const { getGallery, createGallery, deleteGallery } = require('../controllers/galleryController');
const { protect, authorize } = require('../middleware/auth');

router.route('/')
  .get(getGallery)
  .post(protect, authorize('admin'), createGallery);

router.route('/:id')
  .delete(protect, authorize('admin'), deleteGallery);

module.exports = router;
