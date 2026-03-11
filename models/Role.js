const mongoose = require('mongoose');

const roleSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
    trim: true
  },
  description: {
    type: String,
    default: '',
    trim: true
  },
  isDeleted: {
    type: Boolean,
    default: false
  }
}, {
  timestamps: true
});

// Index for better query performance
roleSchema.index({ name: 1 });
roleSchema.index({ isDeleted: 1 });

module.exports = mongoose.model('Role', roleSchema);
