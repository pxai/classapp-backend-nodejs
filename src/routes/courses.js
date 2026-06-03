const express = require('express');
const router = express.Router();
const coursesController = require('../controllers/courses');

router.get('/', coursesController.list);
router.get('/:id', coursesController.show);
router.post('/', coursesController.create);
router.put('/:id', coursesController.update);
router.delete('/:id', coursesController.destroy);

module.exports = router;