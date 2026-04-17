const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    phone: { type: String, required: true, trim: true },
    email: { type: String, required: true, lowercase: true, trim: true },
    service: { type: mongoose.Schema.Types.ObjectId, ref: 'Service', required: true },
    date: { type: Date, required: true },
    time: { type: String, required: true },
    notes: { type: String, default: '' },
    status: {
      type: String,
      enum: ['pending', 'confirmed', 'cancelled', 'completed'],
      default: 'pending',
    },
    payment: { type: mongoose.Schema.Types.ObjectId, ref: 'Payment', default: null },
    confirmationCode: { type: String, unique: true },
  },
  { timestamps: true }
);

bookingSchema.pre('save', function (next) {
  if (!this.confirmationCode) {
    this.confirmationCode = 'BK' + Date.now().toString(36).toUpperCase();
  }
  next();
});

module.exports = mongoose.model('Booking', bookingSchema);
