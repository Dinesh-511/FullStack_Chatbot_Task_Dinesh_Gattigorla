const path = require('path');
const fs = require('fs');
const mongoose = require('mongoose');
const dotenv = require('dotenv');

// Load environment variables from backend/.env
dotenv.config({ path: path.join(__dirname, '..', '.env') });

const Enquiry = require('../src/models/Enquiry');
const connectDB = require('../src/config/db');

/**
 * Seed Database with realistic initial enquiries.
 */
const seedDatabase = async () => {
  try {
    console.log('[Seed] Connecting to MongoDB...');
    await connectDB();

    console.log('[Seed] Clearing existing enquiries collection...');
    await Enquiry.deleteMany({});

    // Read seed-data.json
    const seedDataPath = path.join(__dirname, '..', '..', 'database', 'seed-data.json');
    const rawData = fs.readFileSync(seedDataPath, 'utf-8');
    const enquiries = JSON.parse(rawData);

    // Stagger creation dates across the past week to provide realistic dashboard analytics
    const now = new Date();
    const preparedEnquiries = enquiries.map((item, index) => {
      const staggeredDate = new Date(now.getTime() - (index * 14 * 60 * 60 * 1000)); // offset by 14 hours per item
      return {
        ...item,
        createdAt: staggeredDate,
        updatedAt: staggeredDate
      };
    });

    console.log(`[Seed] Inserting ${preparedEnquiries.length} sample enquiries...`);
    const inserted = await Enquiry.insertMany(preparedEnquiries);

    console.log(`[Seed] Successfully seeded ${inserted.length} enquiries!`);
    console.log('\n--- Breakdown by status ---');
    const counts = await Enquiry.aggregate([
      { $group: { _id: '$status', count: { $sum: 1 } } }
    ]);
    counts.forEach((c) => console.log(`  - ${c._id}: ${c.count}`));

    console.log('\n--- Breakdown by userType ---');
    const userTypes = await Enquiry.aggregate([
      { $group: { _id: '$userType', count: { $sum: 1 } } }
    ]);
    userTypes.forEach((u) => console.log(`  - ${u._id}: ${u.count}`));

    console.log('\n[Seed] Complete! You can now start the server with "npm run dev".');
    process.exit(0);
  } catch (error) {
    console.error(`[Seed Error] Failed to seed database: ${error.message}`);
    process.exit(1);
  }
};

seedDatabase();
