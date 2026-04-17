const Booking = require('../models/Booking');
const Service = require('../models/Service');

exports.createBooking = async (req, res, next) => {
  try {
    const { name, phone, email, service, date, time, notes } = req.body;

    const svc = await Service.findById(service);
    if (!svc) return res.status(404).json({ success: false, message: 'Service not found' });

    const booking = await Booking.create({ name, phone, email, service, date, time, notes });
    await booking.populate('service');

    res.status(201).json({ success: true, data: booking });
  } catch (err) {
    next(err);
  }
};

exports.getBooking = async (req, res, next) => {
  try {
    const booking = await Booking.findById(req.params.id).populate('service').populate('payment');
    if (!booking) return res.status(404).json({ success: false, message: 'Booking not found' });
    res.json({ success: true, data: booking });
  } catch (err) {
    next(err);
  }
};

exports.getBookingByCode = async (req, res, next) => {
  try {
    const booking = await Booking.findOne({ confirmationCode: req.params.code })
      .populate('service')
      .populate('payment');
    if (!booking) return res.status(404).json({ success: false, message: 'Booking not found' });
    res.json({ success: true, data: booking });
  } catch (err) {
    next(err);
  }
};

exports.updateBookingStatus = async (req, res, next) => {
  try {
    const { status } = req.body;
    const booking = await Booking.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true, runValidators: true }
    ).populate('service');
    if (!booking) return res.status(404).json({ success: false, message: 'Booking not found' });
    res.json({ success: true, data: booking });
  } catch (err) {
    next(err);
  }
};
