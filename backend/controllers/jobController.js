// controllers/jobController.js
const asyncHandler = require('express-async-handler');
const Job = require('../models/Job');

// @desc    Create a new job
// @route   POST /api/jobs
// @access  Private
// @desc    Create a new job
// @route   POST /api/jobs
// @access  Private (All authenticated users)
exports.createJob = asyncHandler(async (req, res) => {
  const {
    cus_name,
    vehicleName,
    serviceType,
    status,
    price,
    sparePartName,
    sparePartPrice,
    technicianName,
    technicianPhone,
    technicianSalary,
    technicianReview,
    futureServices
  } = req.body;

  const job = await Job.create({
    cus_name,
    vehicleName,
    serviceType,
    status,
    price,
    sparePartName,
    sparePartPrice,
    technicianName,
    technicianPhone,
    technicianSalary,
    technicianReview,
    futureServices
  });

  res.status(201).json({
    success: true,
    data: job
  });
});

// @desc    Get all jobs
// @route   GET /api/jobs
// @access  Private (Admin can see all, users see only their own)
exports.getJobs = asyncHandler(async (req, res) => {
  // Fetch all jobs without filtering by user type
  const jobs = await Job.find().sort({ createdAt: -1 });

  res.status(200).json({
    success: true,
    count: jobs.length,
    data: jobs
  });
});

// @desc    Get single job
// @route   GET /api/jobs/:id
// @access  Private
exports.getJob = asyncHandler(async (req, res) => {
  let job;
  if (req.user.type === 'admin') {
    job = await Job.findById(req.params.id).populate('user', 'name email');
  } else {
    job = await Job.findOne({
      _id: req.params.id,
      user: req.user.id
    });
  }

  if (!job) {
    return res.status(404).json({
      success: false,
      message: 'Job not found'
    });
  }

  res.status(200).json({
    success: true,
    data: job
  });
});

// @desc    Update job
// @route   PUT /api/jobs/:id
// @access  Private
// @desc    Update job
// @route   PUT /api/jobs/:id
// @access  Public or unprotected
exports.updateJob = asyncHandler(async (req, res) => {
  const job = await Job.findById(req.params.id);

  if (!job) {
    return res.status(404).json({
      success: false,
      message: 'Job not found'
    });
  }

  // Update fields
  job.cus_name = req.body.cus_name || job.cus_name;
  job.vehicleName = req.body.vehicleName || job.vehicleName;
  job.serviceType = req.body.serviceType || job.serviceType;
  job.status = req.body.status || job.status;
  job.price = req.body.price || job.price;
  job.sparePartName = req.body.sparePartName || job.sparePartName;
  job.sparePartPrice = req.body.sparePartPrice || job.sparePartPrice;
  job.technicianName = req.body.technicianName || job.technicianName;
  job.technicianPhone = req.body.technicianPhone || job.technicianPhone;
  job.technicianSalary = req.body.technicianSalary || job.technicianSalary;
  job.technicianReview = req.body.technicianReview || job.technicianReview;
  job.futureServices = req.body.futureServices || job.futureServices;
  const updatedJob = await job.save();

  res.status(200).json({
    success: true,
    data: updatedJob
  });
});


// @desc    Delete job
// @route   DELETE /api/jobs/:id
// @access  Private
exports.deleteJob = asyncHandler(async (req, res) => {
  let job;
  if (req.user.type === 'admin') {
    job = await Job.findById(req.params.id);
  } else {
    job = await Job.findOne({
      _id: req.params.id,
      user: req.user.id
    });
  }

  if (!job) {
    return res.status(404).json({
      success: false,
      message: 'Job not found'
    });
  }

  await job.remove();

  res.status(200).json({
    success: true,
    data: {}
  });
});