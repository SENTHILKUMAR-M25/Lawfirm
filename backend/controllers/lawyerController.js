const Lawyer = require('../models/Lawyer');

exports.getLawyers = async (req, res, next) => {
  try {
    const filter = req.query.all === 'true' ? {} : { isActive: true };
    const lawyers = await Lawyer.find(filter).sort('order');
    res.json({ success: true, count: lawyers.length, lawyers });
  } catch (err) { next(err); }
};

exports.getLawyer = async (req, res, next) => {
  try {
    const lawyer = await Lawyer.findById(req.params.id);
    if (!lawyer) return res.status(404).json({ success: false, message: 'Not found' });
    res.json({ success: true, lawyer });
  } catch (err) { next(err); }
};

exports.createLawyer = async (req, res, next) => {
  try {
    const lawyer = await Lawyer.create(req.body);
    res.status(201).json({ success: true, lawyer });
  } catch (err) { next(err); }
};

exports.updateLawyer = async (req, res, next) => {
  try {
    const lawyer = await Lawyer.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!lawyer) return res.status(404).json({ success: false, message: 'Not found' });
    res.json({ success: true, lawyer });
  } catch (err) { next(err); }
};

exports.deleteLawyer = async (req, res, next) => {
  try {
    await Lawyer.findByIdAndDelete(req.params.id);
    res.json({ success: true, message: 'Deleted' });
  } catch (err) { next(err); }
};
