const mongoose = require('mongoose');

/**
 * Connect to MongoDB database.
 * Establishes Mongoose connection with error handling and retry guidance.
 * 
 * @returns {Promise<typeof mongoose>} Mongoose connection promise
 */
const connectDB = async () => {
  try {
    const mongoUri = process.env.MONGODB_URI || 'mongodb://localhost:27017/dronetv_db';
    
    // Set strictQuery for Mongoose v8+
    mongoose.set('strictQuery', true);

    const conn = await mongoose.connect(mongoUri);

    console.log(`[Database] MongoDB connected successfully: ${conn.connection.host}/${conn.connection.name}`);
    return conn;
  } catch (error) {
    console.error(`[Database Error] Failed to connect to MongoDB: ${error.message}`);
    console.error(`[Database Note] Please ensure MongoDB is running locally or verify your MONGODB_URI in backend/.env`);
    process.exit(1);
  }
};

module.exports = connectDB;
