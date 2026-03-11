const roleService = require('../services/roleService');

// Create Role
exports.createRole = async (req, res) => {
  try {
    const { name, description } = req.body;

    if (!name) {
      return res.status(400).json({ success: false, message: 'Name is required' });
    }

    const role = await roleService.createRole({ name, description });

    res.status(201).json({
      success: true,
      message: 'Role created successfully',
      data: role
    });
  } catch (error) {
    if (error.code === 11000) {
      return res.status(400).json({ success: false, message: 'Role name already exists' });
    }
    res.status(500).json({ success: false, message: error.message });
  }
};

// Get All Roles
exports.getAllRoles = async (req, res) => {
  try {
    const roles = await roleService.getAllRoles();

    res.status(200).json({
      success: true,
      count: roles.length,
      data: roles
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Get Role By Id
exports.getRoleById = async (req, res) => {
  try {
    const { id } = req.params;
    const role = await roleService.getRoleById(id);

    res.status(200).json({
      success: true,
      data: role
    });
  } catch (error) {
    res.status(404).json({ success: false, message: error.message });
  }
};

// Update Role
exports.updateRole = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, description } = req.body;

    const updateData = {};
    if (name !== undefined) updateData.name = name;
    if (description !== undefined) updateData.description = description;

    const role = await roleService.updateRole(id, updateData);

    res.status(200).json({
      success: true,
      message: 'Role updated successfully',
      data: role
    });
  } catch (error) {
    if (error.code === 11000) {
      return res.status(400).json({ success: false, message: 'Role name already exists' });
    }
    res.status(404).json({ success: false, message: error.message });
  }
};

// Soft Delete Role
exports.softDeleteRole = async (req, res) => {
  try {
    const { id } = req.params;
    const role = await roleService.softDeleteRole(id);

    res.status(200).json({
      success: true,
      message: 'Role deleted successfully',
      data: role
    });
  } catch (error) {
    res.status(404).json({ success: false, message: error.message });
  }
};

// Get Users By Role Id
exports.getUsersByRoleId = async (req, res) => {
  try {
    const { id } = req.params;
    const users = await roleService.getUsersByRoleId(id);

    res.status(200).json({
      success: true,
      count: users.length,
      data: users
    });
  } catch (error) {
    res.status(404).json({ success: false, message: error.message });
  }
};
