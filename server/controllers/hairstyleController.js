const Hairstyle = require('../models/Hairstyle');

exports.getHairstyles = async (req, res, next) => {
  try {
    const { category, featured } = req.query;
    const filter = {};
    if (category) filter.category = category;
    if (featured === 'true') filter.isFeatured = true;
    const hairstyles = await Hairstyle.find(filter).sort('-createdAt');
    res.json({ success: true, data: hairstyles });
  } catch (err) {
    next(err);
  }
};

exports.getHairstyle = async (req, res, next) => {
  try {
    const hairstyle = await Hairstyle.findById(req.params.id);
    if (!hairstyle) return res.status(404).json({ success: false, message: 'Hairstyle not found' });
    res.json({ success: true, data: hairstyle });
  } catch (err) {
    next(err);
  }
};

exports.createHairstyle = async (req, res, next) => {
  try {
    const hairstyle = await Hairstyle.create(req.body);
    res.status(201).json({ success: true, data: hairstyle });
  } catch (err) {
    next(err);
  }
};
