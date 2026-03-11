const express = require('express');
const router = express.Router();
const roleController = require('../controllers/roleController');

// Create
router.post('/', roleController.createRole);

// Get All
router.get('/', roleController.getAllRoles);

// Get Users By Role Id
router.get('/:id/users', roleController.getUsersByRoleId);

// Get By Id
router.get('/:id', roleController.getRoleById);

// Update
router.put('/:id', roleController.updateRole);

// Soft Delete
router.delete('/:id', roleController.softDeleteRole);

module.exports = router;
