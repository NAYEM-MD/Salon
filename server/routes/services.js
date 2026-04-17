const router = require('express').Router();
const { body } = require('express-validator');
const validate = require('../middleware/validate');
const { getServices, getService, createService } = require('../controllers/serviceController');

router.get('/', getServices);
router.get('/:id', getService);
router.post(
  '/',
  [
    body('name').notEmpty(),
    body('description').notEmpty(),
    body('price').isFloat({ min: 0 }),
    body('duration').isInt({ min: 15 }),
    body('category').isIn(['haircut', 'coloring', 'treatment', 'styling', 'package']),
  ],
  validate,
  createService
);

module.exports = router;
