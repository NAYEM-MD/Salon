const router = require('express').Router();
const { body } = require('express-validator');
const validate = require('../middleware/validate');
const {
  createBooking,
  getBooking,
  getBookingByCode,
  updateBookingStatus,
} = require('../controllers/bookingController');

router.post(
  '/',
  [
    body('name').notEmpty().trim(),
    body('phone').notEmpty().trim(),
    body('email').isEmail().normalizeEmail(),
    body('service').notEmpty(),
    body('date').isISO8601(),
    body('time').notEmpty(),
  ],
  validate,
  createBooking
);

router.get('/code/:code', getBookingByCode);
router.get('/:id', getBooking);
router.put('/:id/status', body('status').isIn(['pending', 'confirmed', 'cancelled', 'completed']), validate, updateBookingStatus);

module.exports = router;
