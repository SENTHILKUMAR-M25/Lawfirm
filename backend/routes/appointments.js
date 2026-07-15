const router = require('express').Router();
const { getAppointments, getAppointment, createAppointment, updateAppointment, deleteAppointment } = require('../controllers/appointmentController');
const { protect, authorize } = require('../middleware/auth');

router.route('/')
  .get(protect, getAppointments)
  .post(createAppointment);

router.route('/:id')
  .get(protect, getAppointment)
  .put(protect, authorize('admin'), updateAppointment)
  .delete(protect, authorize('admin'), deleteAppointment);

module.exports = router;
