const Newsletter = require('../models/Newsletter');

exports.subscribe = async (req, res, next) => {
  try {
    const { email } = req.body;
    const exists = await Newsletter.findOne({ email });
    if (exists) return res.json({ success: true, message: 'Already subscribed' });
    await Newsletter.create({ email });
    res.status(201).json({ success: true, message: 'Subscribed successfully' });
  } catch (err) { next(err); }
};

exports.getSubscribers = async (req, res, next) => {
  try {
    const subscribers = await Newsletter.find().sort('-createdAt');
    res.json({ success: true, count: subscribers.length, subscribers });
  } catch (err) { next(err); }
};

exports.deleteSubscriber = async (req, res, next) => {
  try {
    await Newsletter.findByIdAndDelete(req.params.id);
    res.json({ success: true, message: 'Deleted' });
  } catch (err) { next(err); }
};
