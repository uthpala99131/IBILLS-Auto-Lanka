// routes/jobRoutes.js
const express = require('express');
const jobController = require('../controllers/jobController');


const router = express.Router();

// Protect all routes after this middleware


// Public routes (for authenticated users only)
router.route('/').get(jobController.getJobs); // Get all jobs
router.route('/').post(jobController.createJob); // Create a new job
router.route('/:id').put(jobController.updateJob); // Update a job
router.route('/:id').delete(jobController.deleteJob); // Delete a job

module.exports = router;