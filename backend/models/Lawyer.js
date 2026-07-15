const mongoose = require('mongoose');

const lawyerSchema = new mongoose.Schema({
  name: { type: String, required: true },
  image: { type: String, default: '' },
  experience: { type: Number, required: true },
  qualification: { type: String, required: true },
  specialization: [{ type: String }],
  languages: [{ type: String }],
  about: { type: String },
  email: { type: String },
  phone: { type: String },
  isActive: { type: Boolean, default: true },
  order: { type: Number, default: 0 },
}, { timestamps: true });

module.exports = mongoose.model('Lawyer', lawyerSchema);
