const express = require('express');
const router = express.Router();
const technicianController = require('../controllers/technicianController');

// Technician routes
router.get('/', technicianController.getAllTechnicians);

module.exports = router;