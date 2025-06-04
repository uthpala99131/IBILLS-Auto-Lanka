// controllers/technicianController.js
const asyncHandler = require('express-async-handler');
const Technician = require('../models/Technician');

// @desc    Create a new technician
// @route   POST /api/technicians
// @access  Private (Admin only)
exports.createTechnician = asyncHandler(async (req, res) => {
  const { name, phoneNum, salary } = req.body;

  const technician = await Technician.create({
    name,
    phoneNum,
    salary
  });

  res.status(201).json({
    success: true,
    data: technician
  });
});

// @desc    Get all technicians
// @route   GET /api/technicians
// @access  Public
exports.getTechnicians = asyncHandler(async (req, res) => {
  const technicians = await Technician.find().sort({ createdAt: -1 });

  res.status(200).json({
    success: true,
    count: technicians.length,
    data: technicians
  });
});

// @desc    Get single technician
// @route   GET /api/technicians/:id
// @access  Public
exports.getTechnician = asyncHandler(async (req, res) => {
  const technician = await Technician.findById(req.params.id);

  if (!technician) {
    return res.status(404).json({
      success: false,
      message: 'Technician not found'
    });
  }

  res.status(200).json({
    success: true,
    data: technician
  });
});

// @desc    Update technician
// @route   PUT /api/technicians/:id
// @access  Private (Admin only)
exports.updateTechnician = asyncHandler(async (req, res) => {
  const technician = await Technician.findById(req.params.id);

  if (!technician) {
    return res.status(404).json({
      success: false,
      message: 'Technician not found'
    });
  }

  // Update fields
  technician.name = req.body.name || technician.name;
  technician.phoneNum = req.body.phoneNum || technician.phoneNum;
  technician.salary = req.body.salary || technician.salary;

  const updatedTechnician = await technician.save();

  res.status(200).json({
    success: true,
    data: updatedTechnician
  });
});

// @desc    Delete technician
// @route   DELETE /api/technicians/:id
// @access  Private (Admin only)
exports.deleteTechnician = asyncHandler(async (req, res) => {
  const technician = await Technician.findById(req.params.id);

  if (!technician) {
    return res.status(404).json({
      success: false,
      message: 'Technician not found'
    });
  }

  await technician.remove();

  res.status(200).json({
    success: true,
    data: {}
  });
});