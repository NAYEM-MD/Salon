const router = require('express').Router();
const { getHairstyles, getHairstyle, createHairstyle } = require('../controllers/hairstyleController');

router.get('/', getHairstyles);
router.get('/:id', getHairstyle);
router.post('/', createHairstyle);

module.exports = router;
