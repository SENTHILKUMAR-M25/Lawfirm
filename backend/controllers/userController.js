const User = require('../models/User');

exports.getUsers = async (req, res, next) => {
  try {
    const filter = req.query.all === 'true' ? {} : { role: 'client' };
    const users = await User.find(filter).sort('-createdAt');
    res.json({ success: true, count: users.length, users });
  } catch (err) { next(err); }
};

exports.getUser = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ success: false, message: 'Not found' });
    res.json({ success: true, user });
  } catch (err) { next(err); }
};

exports.updateUser = async (req, res, next) => {
  try {
    const { name, email, phone, role, isActive, address } = req.body;
    const user = await User.findByIdAndUpdate(req.params.id, { name, email, phone, role, isActive, address }, { new: true, runValidators: true });
    if (!user) return res.status(404).json({ success: false, message: 'Not found' });
    res.json({ success: true, user });
  } catch (err) { next(err); }
};

exports.deleteUser = async (req, res, next) => {
  try {
    await User.findByIdAndDelete(req.params.id);
    res.json({ success: true, message: 'Deleted' });
  } catch (err) { next(err); }
};
