// server/routes/jobCardRoutes.js
const express = require("express");
const router = express.Router();
const JobCard = require("../models/JobCardModel");

// Create a new job card
router.post("/", async (req, res) => {
  try {
    const jobCard = new JobCard(req.body);
    await jobCard.save();
    res.status(200).json(jobCard);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get all job cards
router.get("/", async (req, res) => {
  try {
    const jobCards = await JobCard.find();
    res.status(200).json(jobCards);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
