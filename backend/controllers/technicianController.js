const Technician = require('../models/Review');

// Get all technicians
exports.getAllTechnicians = async (req, res) => {
  try {
    const technicians = await Technician.find({ isActive: true });
    res.status(200).json(technicians);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};