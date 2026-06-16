const express = require('express');
const router = express.Router();
const permissionsController = require('../controllers/permissions');

router.get('/', permissionsController.show);
router.get('/:user_id', permissionsController.showUserPermissions);
router.get('/:domain_id', permissionsController.showDomainPermissions);
router.post('/', permissionsController.create);
router.put('/:user_id', permissionsController.update);
router.delete('/:user_id', permissionsController.destroy);

module.exports = router;