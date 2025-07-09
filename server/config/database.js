const mongoose = require('mongoose');
require('dotenv').config();

exports.connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGODB_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log("✅ MongoDB connected successfully");
    console.log("✅ DB Name:", conn.connection.name); // <--- REAL DB NAME

  } catch (error) {
    console.error('❌ MongoDB connection failed:', error.message);
    process.exit(1);
  }
};
