const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

// Create
router.post('/', userController.createUser);

// Enable User (by email and username)
router.post('/enable', userController.enableUser);

// Disable User (by email and username)
router.post('/disable', userController.disableUser);

// Get All (with username query param)
router.get('/', userController.getAllUsers);

// Get By Id
router.get('/:id', userController.getUserById);

// Update
router.put('/:id', userController.updateUser);

// Soft Delete
router.delete('/:id', userController.softDeleteUser);

module.exports = router;
