const express = require('express');
const router = express.Router();
const Job = require('../models/Job');

router.post('/', async (req, res) => {
  const job = new Job(req.body);
  await job.save();
  res.send(job);
});

router.get('/', async (req, res) => {
  const jobs = await Job.find();
  res.send(jobs);
});

router.get('/:id', async (req, res) => {
  const job = await Job.findById(req.params.id);
  res.send(job);
});

module.exports = router;