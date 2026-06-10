const express = require('express');
const router = express.Router();
const lessonsController = require('../controllers/lessons');

router.get('/', lessonsController.list);
router.get('/:id', lessonsController.show);
router.post('/', lessonsController.create);
router.put('/:id', lessonsController.update);
router.delete('/:id', lessonsController.destroy);

module.exports = router;