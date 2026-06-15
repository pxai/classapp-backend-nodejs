const express = require('express');
const router = express.Router();
const domainsController = require('../controllers/domains');

router.get('/', domainsController.list);
router.get('/:id', domainsController.show);
router.post('/', domainsController.create);
router.put('/:id', domainsController.update);
router.delete('/:id', domainsController.destroy);

module.exports = router;