// server/models/JobCardModel.js
const mongoose = require("mongoose");

const jobCardSchema = new mongoose.Schema({
  customerName: { type: String, required: true },
  vehicleModel: { type: String, required: true },
  serviceType: { type: String, required: true },
  date: { type: Date, required: true },
  timeSlot: { type: String, required: true },
  status: { type: String, default: "Pending" },
});

const JobCard = mongoose.model("JobCard", jobCardSchema);

module.exports = JobCard;
