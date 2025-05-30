const Service = require('../models/Service');
const asyncHandler = require('express-async-handler');

// @desc    Create a new service
// @route   POST /api/services
// @access  Private/Admin
exports.createService = asyncHandler(async (req, res) => {
  const { name, price } = req.body;

  const service = await Service.create({
    name,
    price
  });

  res.status(201).json({
    success: true,
    data: service
  });
});

// @desc    Get all services
// @route   GET /api/services
// @access  Public
exports.getServices = asyncHandler(async (req, res) => {
  const services = await Service.find().sort({ name: 1 });

  res.status(200).json({
    success: true,
    count: services.length,
    data: services
  });
});

// @desc    Update service
// @route   PUT /api/services/:id
// @access  Private/Admin
exports.updateService = asyncHandler(async (req, res) => {
  const service = await Service.findByIdAndUpdate(
    req.params.id,
    req.body,
    {
      new: true,
      runValidators: true
    }
  );

  if (!service) {
    return res.status(404).json({
      success: false,
      message: 'Service not found'
    });
  }

  res.status(200).json({
    success: true,
    data: service
  });
});

// @desc    Delete service
// @route   DELETE /api/services/:id
// @access  Private/Admin
exports.deleteService = asyncHandler(async (req, res) => {
  const service = await Service.findByIdAndDelete(req.params.id);

  if (!service) {
    return res.status(404).json({
      success: false,
      message: 'Service not found'
    });
  }

  res.status(200).json({
    success: true,
    data: {}
  });
});

// @desc    Seed default services
// @route   POST /api/services/seed
// @access  Private/Admin
exports.seedServices = asyncHandler(async (req, res) => {
  // Delete existing services
  await Service.deleteMany();

  // Default services with prices in Rupees
  const defaultServices = [
    { name: 'Engine Diagnostics', price: 1500 },
    { name: 'Oil & Filter Change', price: 1200 },
    { name: 'Brake Repair', price: 2500 },
    { name: 'Battery Replacement', price: 3500 },
    { name: 'AC Repair', price: 3000 },
    { name: 'Tire Services', price: 800 },
    { name: 'Recovery', price: 5000 },
    { name: 'Basic Maintenance', price: 2000 },
    { name: 'Full Service', price: 4500 },
    { name: 'Engine Tune-Up', price: 2800 },
    { name: 'Brake Service', price: 1800 },
    { name: 'Premium Detailing', price: 4000 }
  ];

  const services = await Service.insertMany(defaultServices);

  res.status(201).json({
    success: true,
    count: services.length,
    data: services
  });
});