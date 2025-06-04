const express = require('express');
const authController = require('../controllers/authController');
const router = express.Router();

// Protect all routes after this middleware
router.use(authController.protect);
router.use(authController.restrictTo('admin'));

router.get('/dashboard', (req, res) => {
  res.status(200).json({
    status: 'success',
    data: {
      message: 'Welcome to the admin dashboard'
    }
  });
});

module.exports = router;