const mongoose = require('mongoose');

const hairstyleSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    description: { type: String },
    imageUrl: { type: String, required: true },
    category: {
      type: String,
      enum: ['short', 'medium', 'long', 'curly', 'color', 'updo'],
      required: true,
    },
    tags: [{ type: String }],
    isFeatured: { type: Boolean, default: false },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Hairstyle', hairstyleSchema);
