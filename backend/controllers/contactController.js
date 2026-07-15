const Contact = require('../models/Contact');
const sendEmail = require('../utils/sendEmail');

exports.getContacts = async (req, res, next) => {
  try {
    const contacts = await Contact.find().sort('-createdAt');
    res.json({ success: true, count: contacts.length, contacts });
  } catch (err) { next(err); }
};

exports.createContact = async (req, res, next) => {
  try {
    const contact = await Contact.create(req.body);
    await sendEmail({
      email: process.env.SMTP_EMAIL,
      subject: `New Contact: ${req.body.subject}`,
      message: `<h2>New Contact Message</h2><p>From: ${req.body.name} (${req.body.email})</p><p>Phone: ${req.body.phone}</p><p>Subject: ${req.body.subject}</p><p>Message: ${req.body.message}</p>`,
    }).catch(() => {});
    res.status(201).json({ success: true, contact });
  } catch (err) { next(err); }
};

exports.updateContact = async (req, res, next) => {
  try {
    const contact = await Contact.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!contact) return res.status(404).json({ success: false, message: 'Not found' });
    res.json({ success: true, contact });
  } catch (err) { next(err); }
};

exports.deleteContact = async (req, res, next) => {
  try {
    await Contact.findByIdAndDelete(req.params.id);
    res.json({ success: true, message: 'Deleted' });
  } catch (err) { next(err); }
};
