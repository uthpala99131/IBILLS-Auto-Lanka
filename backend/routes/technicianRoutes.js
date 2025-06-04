// routes/technicianRoutes.js
const express = require('express');
const technicianController = require('../controllers/technicianController');

const router = express.Router();

// Protect all routes after this middleware


// Admin-only routes
router.route('/').post(technicianController.createTechnician);
router.route('/:id')
  .put( technicianController.updateTechnician)
  .delete( technicianController.deleteTechnician);

// Public routes
router.route('/').get(technicianController.getTechnicians);
router.route('/:id').get(technicianController.getTechnician);

module.exports = router;