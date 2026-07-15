const User = require('../models/User');
const Appointment = require('../models/Appointment');
const Blog = require('../models/Blog');
const Contact = require('../models/Contact');
const Lawyer = require('../models/Lawyer');
const PracticeArea = require('../models/PracticeArea');
const Testimonial = require('../models/Testimonial');
const Newsletter = require('../models/Newsletter');

exports.getDashboardStats = async (req, res, next) => {
  try {
    const [totalUsers, totalAppointments, totalBlogs, totalContacts, totalLawyers, totalAreas, totalTestimonials, totalSubscribers, recentAppointments, recentContacts] = await Promise.all([
      User.countDocuments(),
      Appointment.countDocuments(),
      Blog.countDocuments(),
      Contact.countDocuments(),
      Lawyer.countDocuments(),
      PracticeArea.countDocuments(),
      Testimonial.countDocuments(),
      Newsletter.countDocuments(),
      Appointment.find().sort('-createdAt').limit(5).populate('user', 'name email'),
      Contact.find().sort('-createdAt').limit(5),
    ]);

    const appointmentsByStatus = await Appointment.aggregate([
      { $group: { _id: '$status', count: { $sum: 1 } } },
    ]);

    const monthlyAppointments = await Appointment.aggregate([
      { $group: { _id: { $month: '$createdAt' }, count: { $sum: 1 } } },
      { $sort: { _id: 1 } },
    ]);

    res.json({
      success: true,
      stats: {
        totalUsers, totalAppointments, totalBlogs, totalContacts,
        totalLawyers, totalAreas, totalTestimonials, totalSubscribers,
        appointmentsByStatus, monthlyAppointments,
        recentAppointments, recentContacts,
      },
    });
  } catch (err) { next(err); }
};
