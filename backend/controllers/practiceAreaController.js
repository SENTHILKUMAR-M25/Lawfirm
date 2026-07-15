const PracticeArea = require('../models/PracticeArea');

exports.getPracticeAreas = async (req, res, next) => {
  try {
    const filter = req.query.all === 'true' ? {} : { isActive: true };
    const areas = await PracticeArea.find(filter).sort('order');
    res.json({ success: true, count: areas.length, areas });
  } catch (err) { next(err); }
};

exports.getPracticeAreaBySlug = async (req, res, next) => {
  try {
    const area = await PracticeArea.findOne({ slug: req.params.slug });
    if (!area) return res.status(404).json({ success: false, message: 'Not found' });
    res.json({ success: true, area });
  } catch (err) { next(err); }
};

exports.getPracticeAreaById = async (req, res, next) => {
  try {
    const area = await PracticeArea.findById(req.params.id);
    if (!area) return res.status(404).json({ success: false, message: 'Not found' });
    res.json({ success: true, area });
  } catch (err) { next(err); }
};

exports.createPracticeArea = async (req, res, next) => {
  try {
    const area = await PracticeArea.create(req.body);
    res.status(201).json({ success: true, area });
  } catch (err) { next(err); }
};

exports.updatePracticeArea = async (req, res, next) => {
  try {
    const area = await PracticeArea.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!area) return res.status(404).json({ success: false, message: 'Not found' });
    res.json({ success: true, area });
  } catch (err) { next(err); }
};

exports.deletePracticeArea = async (req, res, next) => {
  try {
    await PracticeArea.findByIdAndDelete(req.params.id);
    res.json({ success: true, message: 'Deleted' });
  } catch (err) { next(err); }
};
