// In your main Express server file (usually app.js or server.js)
const express = require('express');
const cors = require('cors');
const app = express();

// CORS Configuration
const corsOptions = {
  origin: [
    'http://localhost:3000', // Default Next.js dev URL
    'http://your-production-domain.com', // Your production frontend URL
    process.env.FRONTEND_URL // From environment variables
  ],
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true,
  optionsSuccessStatus: 200 // For legacy browser support
};

// Apply CORS middleware
app.use(cors(corsOptions));

// Handle preflight requests
app.options('*', cors(corsOptions));

// Your routes
app.use('/api/auth', require('./routes/auth'));
// ... other routes

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});