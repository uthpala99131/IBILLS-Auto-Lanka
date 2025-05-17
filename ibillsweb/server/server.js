const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();

// Middleware
app.use(cors({
  origin: 'http://localhost:3000', // Can be a string if only one origin
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true
}));
app.use(express.json());

// Database connection
const url = "mongodb+srv://uthpala99:amkuiba99@ibills.7nahg3f.mongodb.net/";

const connect = async () => {
  try {
    await mongoose.connect(url, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    console.log("Connected to MongoDB");
  } catch (error) {
    console.log("MongoDB Error: ", error);
  }
};
connect();

// Test route - verify this works first
app.get('/api/test', (req, res) => {
  res.json({ message: "Server is working!" });
});

// Simple locations route
app.get('/api/locations', (req, res) => {
  res.json([{
    id: 1,
    name: "Test Location",
    address: "123 Main St"
  }]);
});

// Add routes one by one to identify which one causes the error
// Start with commenting all of these out, then uncomment one at a time

// app.use('/api/jobs', require('./routes/jobRoutes'));
// app.use('/api/contact', require('./routes/contact'));
// app.use('/api/locations', require('./routes/locations'));

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});