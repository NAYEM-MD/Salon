const router = require('express').Router();
const { body } = require('express-validator');
const validate = require('../middleware/validate');
const { createCheckout, confirmPayment, getPayment } = require('../controllers/paymentController');

router.post(
  '/checkout',
  [body('bookingId').notEmpty()],
  validate,
  createCheckout
);

router.post(
  '/confirm',
  [body('paymentId').notEmpty()],
  validate,
  confirmPayment
);

router.get('/:id', getPayment);

module.exports = router;
