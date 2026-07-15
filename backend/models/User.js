const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const userSchema = new mongoose.Schema({
  name: { type: String, required: [true, 'Please add a name'], trim: true },
  email: { type: String, required: [true, 'Please add an email'], unique: true, match: [/^\S+@\S+\.\S+$/, 'Please add a valid email'] },
  password: { type: String, required: [true, 'Please add a password'], minlength: 6, select: false },
  phone: { type: String },
  role: { type: String, enum: ['client', 'admin'], default: 'client' },
  avatar: { type: String, default: '' },
  address: { type: String },
  isActive: { type: Boolean, default: true },
  resetPasswordToken: String,
  resetPasswordExpire: Date,
}, { timestamps: true });

userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();
  const salt = await bcrypt.genSalt(12);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

userSchema.methods.getSignedJwtToken = function () {
  return jwt.sign({ id: this._id, role: this.role }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRE });
};

module.exports = mongoose.model('User', userSchema);
