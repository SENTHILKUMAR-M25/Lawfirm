const mongoose = require('mongoose');

const gallerySchema = new mongoose.Schema({
  title: { type: String },
  image: { type: String, required: true },
  category: { type: String, default: 'office' },
  isActive: { type: Boolean, default: true },
}, { timestamps: true });

module.exports = mongoose.model('Gallery', gallerySchema);
