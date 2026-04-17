const Payment = require('../models/Payment');
const Booking = require('../models/Booking');
const { sendBookingConfirmationEmail } = require('../utils/email');

exports.createCheckout = async (req, res, next) => {
  try {
    const { bookingId, method = 'demo' } = req.body;

    const booking = await Booking.findById(bookingId).populate('service');
    if (!booking) return res.status(404).json({ success: false, message: 'Booking not found' });
    if (booking.payment) return res.status(400).json({ success: false, message: 'Payment already exists' });

    const payment = await Payment.create({
      booking: bookingId,
      amount: booking.service.price,
      method,
      status: 'pending',
    });

    booking.payment = payment._id;
    await booking.save();

    res.status(201).json({ success: true, data: payment });
  } catch (err) {
    next(err);
  }
};

exports.confirmPayment = async (req, res, next) => {
  try {
    const { paymentId, cardLast4 } = req.body;

    const payment = await Payment.findById(paymentId);
    if (!payment) return res.status(404).json({ success: false, message: 'Payment not found' });

    // Demo: simulate successful payment
    const transactionId = 'TXN' + Date.now().toString(36).toUpperCase();
    payment.status = 'paid';
    payment.transactionId = transactionId;
    if (cardLast4) payment.cardLast4 = cardLast4;
    await payment.save();

    await Booking.findByIdAndUpdate(payment.booking, { status: 'confirmed' });

    const bookingDoc = await Booking.findById(payment.booking).populate('service');
    let emailSent = false;
    if (bookingDoc) {
      try {
        emailSent = await sendBookingConfirmationEmail(bookingDoc, payment);
      } catch (err) {
        console.error('Confirmation email error:', err.message);
      }
    }

    res.json({ success: true, data: payment, emailSent });
  } catch (err) {
    next(err);
  }
};

exports.getPayment = async (req, res, next) => {
  try {
    const payment = await Payment.findById(req.params.id).populate('booking');
    if (!payment) return res.status(404).json({ success: false, message: 'Payment not found' });
    res.json({ success: true, data: payment });
  } catch (err) {
    next(err);
  }
};
