const Gallery = require('../models/Gallery');

exports.getGallery = async (req, res, next) => {
  try {
    const filter = req.query.all === 'true' ? {} : { isActive: true };
    const gallery = await Gallery.find(filter).sort('-createdAt');
    res.json({ success: true, count: gallery.length, gallery });
  } catch (err) { next(err); }
};

exports.createGallery = async (req, res, next) => {
  try {
    const item = await Gallery.create(req.body);
    res.status(201).json({ success: true, gallery: item });
  } catch (err) { next(err); }
};

exports.deleteGallery = async (req, res, next) => {
  try {
    await Gallery.findByIdAndDelete(req.params.id);
    res.json({ success: true, message: 'Deleted' });
  } catch (err) { next(err); }
};
