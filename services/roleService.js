const Role = require('../models/Role');
const User = require('../models/User');

// Create
const createRole = async (data) => {
  try {
    const role = new Role(data);
    await role.save();
    return role;
  } catch (error) {
    throw new Error(`Error creating role: ${error.message}`);
  }
};

// Get All
const getAllRoles = async () => {
  try {
    const roles = await Role.find({ isDeleted: false }).sort({ createdAt: -1 });
    return roles;
  } catch (error) {
    throw new Error(`Error fetching roles: ${error.message}`);
  }
};

// Get By Id
const getRoleById = async (id) => {
  try {
    const role = await Role.findOne({ _id: id, isDeleted: false });
    if (!role) {
      throw new Error('Role not found');
    }
    return role;
  } catch (error) {
    throw new Error(`Error fetching role: ${error.message}`);
  }
};

// Update
const updateRole = async (id, data) => {
  try {
    const role = await Role.findOneAndUpdate(
      { _id: id, isDeleted: false },
      data,
      { new: true, runValidators: true }
    );
    if (!role) {
      throw new Error('Role not found');
    }
    return role;
  } catch (error) {
    throw new Error(`Error updating role: ${error.message}`);
  }
};

// Soft Delete
const softDeleteRole = async (id) => {
  try {
    const role = await Role.findOneAndUpdate(
      { _id: id, isDeleted: false },
      { isDeleted: true },
      { new: true }
    );
    if (!role) {
      throw new Error('Role not found');
    }
    return role;
  } catch (error) {
    throw new Error(`Error deleting role: ${error.message}`);
  }
};

// Get Users By Role Id
const getUsersByRoleId = async (roleId) => {
  try {
    // Check if role exists
    const role = await Role.findOne({ _id: roleId, isDeleted: false });
    if (!role) {
      throw new Error('Role not found');
    }

    // Get users with this role
    const users = await User.find({ role: roleId, isDeleted: false })
      .populate('role')
      .sort({ createdAt: -1 });

    return users;
  } catch (error) {
    throw new Error(`Error fetching users by role: ${error.message}`);
  }
};

module.exports = {
  createRole,
  getAllRoles,
  getRoleById,
  updateRole,
  softDeleteRole,
  getUsersByRoleId
};
