const router = require('express').Router();
const { getPracticeAreas, getPracticeAreaBySlug, getPracticeAreaById, createPracticeArea, updatePracticeArea, deletePracticeArea } = require('../controllers/practiceAreaController');
const { protect, authorize } = require('../middleware/auth');

router.route('/')
  .get(getPracticeAreas)
  .post(protect, authorize('admin'), createPracticeArea);

router.get('/slug/:slug', getPracticeAreaBySlug);

router.route('/:id')
  .get(getPracticeAreaById)
  .put(protect, authorize('admin'), updatePracticeArea)
  .delete(protect, authorize('admin'), deletePracticeArea);

module.exports = router;
