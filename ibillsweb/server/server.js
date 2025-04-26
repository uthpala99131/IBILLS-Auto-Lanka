const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

// Import routes
const jobRoutes = require('./routes/jobRoutes');
const contactRoutes = require('./routes/contact');
const locationRoutes = require('./routes/locations');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

app.use(cors({
  origin: ['http://localhost:3000'], // Your Next.js dev server
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true
}));

// Your routes
app.get('/api/locations', (req, res) => {
  res.json([{
    id: 1,
    name: "Test Location",
    address: "123 Main St"
  }]);
});

app.listen(5000, () => console.log('Server running on port 5000'));
// Database connection
mongoose.connect('mongodb://localhost:27017/ibills', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('Connected to MongoDB'))
.catch(err => console.error('MongoDB connection error:', err));

// Routes
app.use('/api/jobs', jobRoutes);
app.use('/api/contact', contactRoutes);
app.use('/api/locations', locationRoutes);

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