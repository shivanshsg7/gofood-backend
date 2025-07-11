const express = require('express');
const mongoDB = require('./db');
const cors = require('cors');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;

// Connect to MongoDB and then start the server
mongoDB().then(() => {
  // Middleware
  app.use(cors({
    origin: 'http://localhost:3000', // Replace with frontend URL if deployed
    credentials: true,
  }));

  app.use(express.json()); // Parse JSON bodies

  // Routes
  app.use('/api', require('./Routes/createUser.js'));
  app.use('/api', require('./Routes/DisplayData.js'));
  app.use('/api', require('./Routes/OrderData.js'));

  // Default test route
  app.get('/', (req, res) => {
    res.send('Hello from GoFood backend!');
  });

  // Start server
  app.listen(port, () => {
    console.log(`✅ Backend running at http://localhost:${port}`);
  });
}).catch(err => {
  console.error("❌ Failed to connect to MongoDB:", err);
  process.exit(1);
});
