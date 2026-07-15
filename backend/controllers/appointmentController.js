const Appointment = require('../models/Appointment');
const sendEmail = require('../utils/sendEmail');

exports.getAppointments = async (req, res, next) => {
  try {
    const query = req.user.role === 'admin' ? {} : { user: req.user.id };
    const appointments = await Appointment.find(query).sort('-createdAt');
    res.json({ success: true, count: appointments.length, appointments });
  } catch (err) { next(err); }
};

exports.getAppointment = async (req, res, next) => {
  try {
    const appointment = await Appointment.findById(req.params.id);
    if (!appointment) return res.status(404).json({ success: false, message: 'Not found' });
    res.json({ success: true, appointment });
  } catch (err) { next(err); }
};

exports.createAppointment = async (req, res, next) => {
  try {
    const appointment = await Appointment.create({ ...req.body, user: req.user?.id });
    await sendEmail({
      email: process.env.SMTP_EMAIL,
      subject: 'New Appointment Booking',
      message: `<h2>New Appointment</h2><p>Name: ${req.body.name}</p><p>Email: ${req.body.email}</p><p>Phone: ${req.body.phone}</p><p>Area: ${req.body.practiceArea}</p><p>Date: ${req.body.date}</p><p>Time: ${req.body.time}</p><p>Message: ${req.body.message || 'N/A'}</p>`,
    }).catch(() => {});
    res.status(201).json({ success: true, appointment });
  } catch (err) { next(err); }
};

exports.updateAppointment = async (req, res, next) => {
  try {
    const appointment = await Appointment.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!appointment) return res.status(404).json({ success: false, message: 'Not found' });
    res.json({ success: true, appointment });
  } catch (err) { next(err); }
};

exports.deleteAppointment = async (req, res, next) => {
  try {
    const appointment = await Appointment.findByIdAndDelete(req.params.id);
    if (!appointment) return res.status(404).json({ success: false, message: 'Not found' });
    res.json({ success: true, message: 'Deleted' });
  } catch (err) { next(err); }
};
