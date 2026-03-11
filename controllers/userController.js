const userService = require('../services/userService');

// Create User
exports.createUser = async (req, res) => {
  try {
    const { username, password, email, fullName, avatarUrl, status, role, loginCount } = req.body;

    // Validation
    if (!username || !password || !email) {
      return res.status(400).json({
        success: false,
        message: 'Username, password and email are required'
      });
    }

    const user = await userService.createUser({
      username,
      password,
      email,
      fullName,
      avatarUrl,
      status,
      role,
      loginCount
    });

    res.status(201).json({
      success: true,
      message: 'User created successfully',
      data: user
    });
  } catch (error) {
    if (error.code === 11000) {
      const field = Object.keys(error.keyPattern)[0];
      return res.status(400).json({
        success: false,
        message: `${field} already exists`
      });
    }
    res.status(500).json({ success: false, message: error.message });
  }
};

// Get All Users (with username search)
exports.getAllUsers = async (req, res) => {
  try {
    const { username } = req.query;
    const users = await userService.getAllUsers(username);

    res.status(200).json({
      success: true,
      count: users.length,
      data: users
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Get User By Id
exports.getUserById = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await userService.getUserById(id);

    res.status(200).json({
      success: true,
      data: user
    });
  } catch (error) {
    res.status(404).json({ success: false, message: error.message });
  }
};

// Update User
exports.updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const { username, password, email, fullName, avatarUrl, status, role, loginCount } = req.body;

    const updateData = {};
    if (username !== undefined) updateData.username = username;
    if (password !== undefined) updateData.password = password;
    if (email !== undefined) updateData.email = email;
    if (fullName !== undefined) updateData.fullName = fullName;
    if (avatarUrl !== undefined) updateData.avatarUrl = avatarUrl;
    if (status !== undefined) updateData.status = status;
    if (role !== undefined) updateData.role = role;
    if (loginCount !== undefined) updateData.loginCount = loginCount;

    const user = await userService.updateUser(id, updateData);

    res.status(200).json({
      success: true,
      message: 'User updated successfully',
      data: user
    });
  } catch (error) {
    if (error.code === 11000) {
      const field = Object.keys(error.keyPattern)[0];
      return res.status(400).json({
        success: false,
        message: `${field} already exists`
      });
    }
    res.status(404).json({ success: false, message: error.message });
  }
};

// Soft Delete User
exports.softDeleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await userService.softDeleteUser(id);

    res.status(200).json({
      success: true,
      message: 'User deleted successfully',
      data: user
    });
  } catch (error) {
    res.status(404).json({ success: false, message: error.message });
  }
};

// Enable User (by email and username)
exports.enableUser = async (req, res) => {
  try {
    const { email, username } = req.body;

    // Validation
    if (!email || !username) {
      return res.status(400).json({
        success: false,
        message: 'Email and username are required'
      });
    }

    const user = await userService.enableUser(email, username);

    res.status(200).json({
      success: true,
      message: 'User enabled successfully',
      data: user
    });
  } catch (error) {
    res.status(404).json({ success: false, message: error.message });
  }
};

// Disable User (by email and username)
exports.disableUser = async (req, res) => {
  try {
    const { email, username } = req.body;

    // Validation
    if (!email || !username) {
      return res.status(400).json({
        success: false,
        message: 'Email and username are required'
      });
    }

    const user = await userService.disableUser(email, username);

    res.status(200).json({
      success: true,
      message: 'User disabled successfully',
      data: user
    });
  } catch (error) {
    res.status(404).json({ success: false, message: error.message });
  }
};
