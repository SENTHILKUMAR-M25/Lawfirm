const router = require('express').Router();
const { subscribe, getSubscribers, deleteSubscriber } = require('../controllers/newsletterController');
const { protect, authorize } = require('../middleware/auth');

router.route('/')
  .post(subscribe)
  .get(protect, authorize('admin'), getSubscribers);

router.route('/:id')
  .delete(protect, authorize('admin'), deleteSubscriber);

module.exports = router;
