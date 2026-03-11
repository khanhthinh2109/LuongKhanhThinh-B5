const User = require('../models/User');

// Create
const createUser = async (data) => {
  try {
    const user = new User(data);
    await user.save();
    // Populate role after save
    await user.populate('role');
    return user;
  } catch (error) {
    throw new Error(`Error creating user: ${error.message}`);
  }
};

// Get All (with username search)
const getAllUsers = async (username = '') => {
  try {
    const query = { isDeleted: false };

    // Add username filter if provided (includes search)
    if (username && username.trim()) {
      query.username = { $regex: username.trim(), $options: 'i' };
    }

    const users = await User.find(query)
      .populate('role')
      .sort({ createdAt: -1 });

    return users;
  } catch (error) {
    throw new Error(`Error fetching users: ${error.message}`);
  }
};

// Get By Id
const getUserById = async (id) => {
  try {
    const user = await User.findOne({ _id: id, isDeleted: false })
      .populate('role');

    if (!user) {
      throw new Error('User not found');
    }
    return user;
  } catch (error) {
    throw new Error(`Error fetching user: ${error.message}`);
  }
};

// Update
const updateUser = async (id, data) => {
  try {
    const user = await User.findOneAndUpdate(
      { _id: id, isDeleted: false },
      data,
      { new: true, runValidators: true }
    ).populate('role');

    if (!user) {
      throw new Error('User not found');
    }
    return user;
  } catch (error) {
    throw new Error(`Error updating user: ${error.message}`);
  }
};

// Soft Delete
const softDeleteUser = async (id) => {
  try {
    const user = await User.findOneAndUpdate(
      { _id: id, isDeleted: false },
      { isDeleted: true },
      { new: true }
    ).populate('role');

    if (!user) {
      throw new Error('User not found');
    }
    return user;
  } catch (error) {
    throw new Error(`Error deleting user: ${error.message}`);
  }
};

// Enable User (by email and username)
const enableUser = async (email, username) => {
  try {
    const user = await User.findOneAndUpdate(
      { email, username, isDeleted: false },
      { status: true },
      { new: true }
    ).populate('role');

    if (!user) {
      throw new Error('User not found or invalid credentials');
    }
    return user;
  } catch (error) {
    throw new Error(`Error enabling user: ${error.message}`);
  }
};

// Disable User (by email and username)
const disableUser = async (email, username) => {
  try {
    const user = await User.findOneAndUpdate(
      { email, username, isDeleted: false },
      { status: false },
      { new: true }
    ).populate('role');

    if (!user) {
      throw new Error('User not found or invalid credentials');
    }
    return user;
  } catch (error) {
    throw new Error(`Error disabling user: ${error.message}`);
  }
};

module.exports = {
  createUser,
  getAllUsers,
  getUserById,
  updateUser,
  softDeleteUser,
  enableUser,
  disableUser
};
