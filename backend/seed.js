require('dotenv').config();
const mongoose = require('mongoose');
const User = require('./models/User');

const seedAdmin = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to MongoDB');

    const admin = {
      name: 'Admin',
      email: 'admin@lawfirm.com',
      password: 'admin123',
      phone: '+1 (555) 000-0000',
      role: 'admin',
    };

    const existing = await User.findOne({ email: admin.email });
    if (existing) {
      existing.role = 'admin';
      await existing.save();
      console.log(`Admin role updated for ${admin.email}`);
    } else {
      await User.create(admin);
      console.log(`Admin created: ${admin.email} / ${admin.password}`);
    }

    await mongoose.disconnect();
    console.log('Done');
    process.exit(0);
  } catch (err) {
    console.error('Seed failed:', err.message);
    process.exit(1);
  }
};

seedAdmin();
