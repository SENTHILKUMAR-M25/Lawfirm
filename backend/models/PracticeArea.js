const mongoose = require('mongoose');

const practiceAreaSchema = new mongoose.Schema({
  title: { type: String, required: true },
  slug: { type: String, required: true, unique: true },
  description: { type: String, required: true },
  icon: { type: String, default: 'FaGavel' },
  image: { type: String, default: '' },
  content: { type: String },
  isActive: { type: Boolean, default: true },
  order: { type: Number, default: 0 },
}, { timestamps: true });

module.exports = mongoose.model('PracticeArea', practiceAreaSchema);
