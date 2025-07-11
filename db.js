const mongoose = require('mongoose');
require('dotenv').config(); // Load environment variables from .env

const mongoURI = process.env.MONGO_URL; // Securely read from .env

const mongoDB = async () => {
  try {
    // Connect to MongoDB
    await mongoose.connect(mongoURI);

    console.log('✅ Connected to MongoDB successfully');

    // Fetch food_items
    const foodItemsCollection = await mongoose.connection.db.collection('food_items');
    const foodItemsData = await foodItemsCollection.find({}).toArray();
    global.food_items = foodItemsData;
    console.log('🍔 Food items fetched and stored in global.food_items');

    // Fetch foodCategory
    const foodCategoryCollection = await mongoose.connection.db.collection('foodCategory');
    const foodCategoryData = await foodCategoryCollection.find({}).toArray();
    global.foodCategory = foodCategoryData;
    console.log('📦 Food categories fetched and stored in global.foodCategory');

  } catch (err) {
    console.error('❌ Error connecting or fetching data:', err);
    throw err;
  }
};

module.exports = mongoDB;
