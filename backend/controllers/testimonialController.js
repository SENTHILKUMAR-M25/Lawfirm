const Testimonial = require('../models/Testimonial');

exports.getTestimonials = async (req, res, next) => {
  try {
    const filter = req.query.all === 'true' ? {} : { isActive: true };
    const testimonials = await Testimonial.find(filter).sort('order');
    res.json({ success: true, count: testimonials.length, testimonials });
  } catch (err) { next(err); }
};

exports.createTestimonial = async (req, res, next) => {
  try {
    const testimonial = await Testimonial.create(req.body);
    res.status(201).json({ success: true, testimonial });
  } catch (err) { next(err); }
};

exports.updateTestimonial = async (req, res, next) => {
  try {
    const testimonial = await Testimonial.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    res.json({ success: true, testimonial });
  } catch (err) { next(err); }
};

exports.deleteTestimonial = async (req, res, next) => {
  try {
    await Testimonial.findByIdAndDelete(req.params.id);
    res.json({ success: true, message: 'Deleted' });
  } catch (err) { next(err); }
};
