const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    const mongoUri = process.env.MONGO_URI;
    
    if (!mongoUri) {
      throw new Error('MONGO_URI is not defined in environment variables (.env)');
    }

    const conn = await mongoose.connect(mongoUri);

    console.log(`✅ MongoDB Connected: ${conn.connection.host}`);
    
    // Auto-seed default admin credentials if not present
    try {
      const User = require('../models/User');
      const bcrypt = require('bcryptjs');
      const emails = ['rababzahra425@gmail.com', 'admin@stacklinestudio.com', 'admin@kajostudio.com'];
      const adminPassword = process.env.ADMIN_PASSWORD || 'admin123';
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(adminPassword, salt);

      for (const email of emails) {
        let user = await User.findOne({ email: email.toLowerCase() });
        if (!user) {
          await User.create({
            name: 'Alexander Cole',
            email: email.toLowerCase(),
            password: hashedPassword,
            role: 'admin',
            authProvider: 'local',
            isEmailVerified: true,
          });
        }
      }
    } catch (seedErr) {
      console.warn('⚠️ Auto-seed admin warning:', seedErr.message);
    }
  } catch (error) {
    console.error(`❌ MongoDB Connection Error: ${error.message}`);
    process.exit(1);
  }
};

module.exports = connectDB;
