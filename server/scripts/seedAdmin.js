const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '../.env') });

const User = require('../models/User');

const MONGO_URI =
  process.env.MONGO_URI ||
  'mongodb://127.0.0.1:27017/kajo_studio';

const seedSuperAdmin = async () => {
  try {
    console.log('⏳ Connecting to MongoDB...');
    await mongoose.connect(MONGO_URI);
    console.log('✅ Connected to MongoDB.');

    const emails = ['rababzahra425@gmail.com', 'admin@stacklinestudio.com', 'admin@kajostudio.com'];
    const adminPassword = process.env.ADMIN_PASSWORD || 'admin123';
    const adminName = process.env.ADMIN_NAME || 'Alexander Cole';

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(adminPassword, salt);

    for (const email of emails) {
      let adminUser = await User.findOne({ email: email.toLowerCase() });
      if (adminUser) {
        adminUser.name = adminName;
        adminUser.password = hashedPassword;
        adminUser.role = 'admin';
        adminUser.authProvider = 'local';
        adminUser.isEmailVerified = true;
        await adminUser.save();
        console.log(`🔒 Admin account (${email}) updated successfully.`);
      } else {
        await User.create({
          name: adminName,
          email: email.toLowerCase(),
          password: hashedPassword,
          role: 'admin',
          authProvider: 'local',
          isEmailVerified: true,
        });
        console.log(`🎉 Admin account (${email}) created successfully.`);
      }
    }

    console.log(`
--------------------------------------------------
🔑 Stackline Studio Admin Credentials:
   Primary Email: rababzahra425@gmail.com
   Other Emails:  admin@stacklinestudio.com / admin@kajostudio.com
   Password:      ${adminPassword}
--------------------------------------------------
    `);
    process.exit(0);
  } catch (error) {
    console.error('❌ Error seeding Super Admin:', error);
    process.exit(1);
  }
};

seedSuperAdmin();
