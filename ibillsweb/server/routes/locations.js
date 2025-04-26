const express = require('express');
const router = express.Router();
const Location = require('../models/Location');

// Get all locations
router.get('/', async (req, res) => {
  try {
    const locations = await Location.find();
    res.json(locations);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Add a new location (admin only)
router.post('/', async (req, res) => {
  const location = new Location({
    name: req.body.name,
    address: req.body.address,
    phone: req.body.phone,
    email: req.body.email,
    hours: req.body.hours,
    mapEmbedUrl: req.body.mapEmbedUrl
  });

  try {
    const newLocation = await location.save();
    res.status(201).json(newLocation);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

module.exports = router;