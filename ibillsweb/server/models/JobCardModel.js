const mongoose = require('mongoose');

const JobSchema = new mongoose.Schema({
  customerName: String,
  vehicleNumber: String,
  bookingDate: Date,
  status: String,
  services: [String],
  invoiceUrl: String,
  review: String
});

module.exports = mongoose.model('Job', JobSchema);