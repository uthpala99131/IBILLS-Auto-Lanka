// controllers/sparePartController.js
const asyncHandler = require('express-async-handler');
const SparePart = require('../models/SparePart');

// @desc    Create a new spare part
// @route   POST /api/spareparts
// @access  Private (Admin only)
exports.createSparePart = asyncHandler(async (req, res) => {
  const { name, price } = req.body;

  const sparePart = await SparePart.create({
    name,
    price
  });

  res.status(201).json({
    success: true,
    data: sparePart
  });
});

// @desc    Get all spare parts
// @route   GET /api/spareparts
// @access  Public
exports.getSpareParts = asyncHandler(async (req, res) => {
  const spareParts = await SparePart.find().sort({ createdAt: -1 });

  res.status(200).json({
    success: true,
    count: spareParts.length,
    data: spareParts
  });
});

// @desc    Get single spare part
// @route   GET /api/spareparts/:id
// @access  Public
exports.getSparePart = asyncHandler(async (req, res) => {
  const sparePart = await SparePart.findById(req.params.id);

  if (!sparePart) {
    return res.status(404).json({
      success: false,
      message: 'Spare part not found'
    });
  }

  res.status(200).json({
    success: true,
    data: sparePart
  });
});

// @desc    Update spare part
// @route   PUT /api/spareparts/:id
// @access  Private (Admin only)
exports.updateSparePart = asyncHandler(async (req, res) => {
  const sparePart = await SparePart.findById(req.params.id);

  if (!sparePart) {
    return res.status(404).json({
      success: false,
      message: 'Spare part not found'
    });
  }

  // Update fields
  sparePart.name = req.body.name || sparePart.name;
  sparePart.price = req.body.price || sparePart.price;

  const updatedSparePart = await sparePart.save();

  res.status(200).json({
    success: true,
    data: updatedSparePart
  });
});

// @desc    Delete spare part
// @route   DELETE /api/spareparts/:id
// @access  Private (Admin only)
exports.deleteSparePart = asyncHandler(async (req, res) => {
  const sparePart = await SparePart.findById(req.params.id);

  if (!sparePart) {
    return res.status(404).json({
      success: false,
      message: 'Spare part not found'
    });
  }

  await sparePart.remove();

  res.status(200).json({
    success: true,
    data: {}
  });
});