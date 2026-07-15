const User = require('../models/User');
const AppError = require('../utils/AppError');
const sendEmail = require('../utils/sendEmail');
const crypto = require('crypto');

const createToken = (user, statusCode, res) => {
  const token = user.getSignedJwtToken();
  const options = {
    expires: new Date(Date.now() + parseInt(process.env.JWT_COOKIE_EXPIRE) * 24 * 60 * 60 * 1000),
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
  };
  res.status(statusCode).cookie('token', token, options).json({ success: true, token, user: { id: user._id, name: user.name, email: user.email, role: user.role } });
};

exports.register = async (req, res, next) => {
  try {
    const { name, email, password, phone } = req.body;
    const exists = await User.findOne({ email });
    if (exists) return next(new AppError('Email already registered', 400));
    const user = await User.create({ name, email, password, phone });
    createToken(user, 201, res);
  } catch (err) { next(err); }
};

exports.login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) return next(new AppError('Please provide email and password', 400));
    const user = await User.findOne({ email }).select('+password');
    if (!user || !(await user.matchPassword(password))) return next(new AppError('Invalid credentials', 401));
    createToken(user, 200, res);
  } catch (err) { next(err); }
};

exports.getMe = async (req, res, next) => {
  try {
    const user = await User.findById(req.user.id);
    res.json({ success: true, user });
  } catch (err) { next(err); }
};

exports.updateProfile = async (req, res, next) => {
  try {
    const { name, phone, address } = req.body;
    const user = await User.findByIdAndUpdate(req.user.id, { name, phone, address }, { new: true, runValidators: true });
    res.json({ success: true, user });
  } catch (err) { next(err); }
};

exports.forgotPassword = async (req, res, next) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (!user) return next(new AppError('User not found', 404));
    const resetToken = crypto.randomBytes(20).toString('hex');
    user.resetPasswordToken = crypto.createHash('sha256').update(resetToken).digest('hex');
    user.resetPasswordExpire = Date.now() + 10 * 60 * 1000;
    await user.save({ validateBeforeSave: false });
    const resetUrl = `${process.env.CLIENT_URL}/reset-password/${resetToken}`;
    await sendEmail({
      email: user.email,
      subject: 'Password Reset Request',
      message: `<p>Click <a href="${resetUrl}">here</a> to reset your password. Expires in 10 minutes.</p>`,
    });
    res.json({ success: true, message: 'Email sent' });
  } catch (err) { next(err); }
};

exports.resetPassword = async (req, res, next) => {
  try {
    const resetPasswordToken = crypto.createHash('sha256').update(req.params.token).digest('hex');
    const user = await User.findOne({ resetPasswordToken, resetPasswordExpire: { $gt: Date.now() } });
    if (!user) return next(new AppError('Invalid or expired token', 400));
    user.password = req.body.password;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;
    await user.save();
    res.json({ success: true, message: 'Password updated' });
  } catch (err) { next(err); }
};

exports.logout = async (req, res) => {
  res.cookie('token', 'none', { expires: new Date(Date.now() + 5 * 1000), httpOnly: true }).json({ success: true, message: 'Logged out' });
};
