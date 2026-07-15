const router = require('express').Router();
const { getLawyers, getLawyer, createLawyer, updateLawyer, deleteLawyer } = require('../controllers/lawyerController');
const { protect, authorize } = require('../middleware/auth');

router.route('/')
  .get(getLawyers)
  .post(protect, authorize('admin'), createLawyer);

router.route('/:id')
  .get(getLawyer)
  .put(protect, authorize('admin'), updateLawyer)
  .delete(protect, authorize('admin'), deleteLawyer);

module.exports = router;
