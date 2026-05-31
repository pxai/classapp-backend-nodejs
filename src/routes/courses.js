const express = require('express');
const router = express.Router();
const coursesController = require('../controllers/courses');

router.get('/', coursesController.list);
router.get('/:id', coursesController.show);

module.exports = router;