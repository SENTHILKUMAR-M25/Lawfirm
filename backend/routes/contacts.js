const router = require('express').Router();
const { getContacts, createContact, deleteContact } = require('../controllers/contactController');
const { protect, authorize } = require('../middleware/auth');

router.route('/')
  .get(protect, authorize('admin'), getContacts)
  .post(createContact);

router.route('/:id')
  .put(protect, authorize('admin'), require('../controllers/contactController').updateContact)
  .delete(protect, authorize('admin'), deleteContact);

module.exports = router;
