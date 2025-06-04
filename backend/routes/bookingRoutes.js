const express = require('express');
const bookingController = require('../controllers/bookingController');
const authController = require('../controllers/authController');

const router = express.Router();

// Protect all routes after this middleware
router.use(authController.protect);

router.route('/')
  .post(bookingController.createBooking)
  .get(bookingController.getBookings);

router.route('/:id')
  .get(bookingController.getBooking)
  .put(bookingController.updateBooking)
  .delete(bookingController.deleteBooking);

module.exports = router;