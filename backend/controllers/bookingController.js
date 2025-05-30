const Booking = require('../models/Booking');
const asyncHandler = require('express-async-handler');

// @desc    Create a new booking
// @route   POST /api/bookings
// @access  Private
exports.createBooking = asyncHandler(async (req, res) => {
  const { cus_name, vehicleName, serviceType, status, price } = req.body;
  
  const booking = await Booking.create({
    cus_name,
    vehicleName,
    serviceType,
    status,
    price,
    user: req.user.id
  });

  res.status(201).json({
    success: true,
    data: booking
  });
});

// @desc    Get all bookings
// @route   GET /api/bookings
// @access  Private (Admin can see all, users see only their own)
exports.getBookings = asyncHandler(async (req, res) => {
  let query;
  if (req.user.type === 'admin') {
    query = Booking.find().populate('user', 'name email');
  } else {
    query = Booking.find({ user: req.user.id });
  }

  const bookings = await query.sort({ createdAt: -1 });
  
  res.status(200).json({
    success: true,
    count: bookings.length,
    data: bookings
  });
});

// @desc    Get single booking
// @route   GET /api/bookings/:id
// @access  Private
exports.getBooking = asyncHandler(async (req, res) => {
  let booking;
  if (req.user.type === 'admin') {
    booking = await Booking.findById(req.params.id).populate('user', 'name email');
  } else {
    booking = await Booking.findOne({ 
      _id: req.params.id,
      user: req.user.id 
    });
  }

  if (!booking) {
    return res.status(404).json({
      success: false,
      message: 'Booking not found'
    });
  }

  res.status(200).json({
    success: true,
    data: booking
  });
});

// @desc    Update booking
// @route   PUT /api/bookings/:id
// @access  Private
exports.updateBooking = asyncHandler(async (req, res) => {
  let booking;
  if (req.user.type === 'admin') {
    booking = await Booking.findById(req.params.id);
  } else {
    booking = await Booking.findOne({
      _id: req.params.id,
      user: req.user.id
    });
  }

  if (!booking) {
    return res.status(404).json({
      success: false,
      message: 'Booking not found'
    });
  }

  // Update fields
  booking.cus_name = req.body.cus_name || booking.cus_name;
  booking.vehicleName = req.body.vehicleName || booking.vehicleName;
  booking.serviceType = req.body.serviceType || booking.serviceType;
  booking.status = req.body.status || booking.status;
  booking.price = req.body.price || booking.price;

  const updatedBooking = await booking.save();

  res.status(200).json({
    success: true,
    data: updatedBooking
  });
});

// @desc    Delete booking
// @route   DELETE /api/bookings/:id
// @access  Private
exports.deleteBooking = asyncHandler(async (req, res) => {
  let booking;
  if (req.user.type === 'admin') {
    booking = await Booking.findById(req.params.id);
  } else {
    booking = await Booking.findOne({
      _id: req.params.id,
      user: req.user.id
    });
  }

  if (!booking) {
    return res.status(404).json({
      success: false,
      message: 'Booking not found'
    });
  }

  await booking.remove();

  res.status(200).json({
    success: true,
    data: {}
  });
});