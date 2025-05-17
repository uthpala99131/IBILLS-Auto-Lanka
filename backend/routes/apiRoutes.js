import express from 'express';
import { auth } from '../middleware/auth.js';
import Message from '../models/Message.js';
import Booking from '../models/Booking.js';
import User from '../models/user.js';

const router = express.Router();

// Messages routes
router.get('/messages', auth, async (req, res) => {
  try {
    const messages = await Message.find().sort({ createdAt: -1 });
    res.json(messages);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Bookings routes
router.get('/bookings', auth, async (req, res) => {
  try {
    const bookings = await Booking.find().sort({ date: -1 });
    res.json(bookings);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});
// In your Express backend routes
router.get('/health', (req, res) => {
  res.status(200).json({
    status: 'healthy',
    timestamp: new Date().toISOString(),
    dbStatus: mongoose.connection.readyState === 1 ? 'connected' : 'disconnected'
  });
});

// In your Express backend routes
router.get('/api/auth/session', (req, res) => {
  if (req.session.userId) {
    User.findById(req.session.userId)
      .then(user => {
        if (!user) {
          return res.status(404).json({ message: 'User not found' });
        }
        res.json({
          isAuthenticated: true,
          user: {
            id: user._id,
            username: user.username,
            role: user.role
          }
        });
      })
      .catch(error => {
        res.status(500).json({ message: 'Server error' });
      });
  } else {
    res.json({ isAuthenticated: false });
  }
});

// Users routes
router.get('/users', auth, async (req, res) => {
  try {
    const users = await User.find().select('-password').sort({ createdAt: -1 });
    res.json(users);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Dashboard stats
router.get('/stats', auth, async (req, res) => {
  try {
    const [messagesCount, bookingsCount, usersCount] = await Promise.all([
      Message.countDocuments(),
      Booking.countDocuments(),
      User.countDocuments()
    ]);
    
    res.json({ messagesCount, bookingsCount, usersCount });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

export default router;