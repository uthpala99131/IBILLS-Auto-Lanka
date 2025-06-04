// models/Job.js
const mongoose = require('mongoose');

const JobSchema = new mongoose.Schema({
  cus_name: {
    type: String,
    required: [true, 'Customer name is required'],
    trim: true,
    maxlength: [50, 'Customer name cannot be more than 50 characters']
  },
  vehicleName: {
    type: String,
    required: [true, 'Vehicle name is required'],
    trim: true,
    maxlength: [50, 'Vehicle name cannot be more than 50 characters']
  },
  serviceType: {
    type: String,
    required: [true, 'Service type is required'],
    default: 'Oil Change'
  },
  status: {
    type: String,
    enum: ['Pending', 'In Progress', 'Completed', 'Cancelled'],
    default: 'Pending'
  },
  price: {
    type: Number,
    required: [true, 'Price is required'],
    min: [0, 'Price cannot be negative']
  },
  sparePartName: {
    type: String,
    trim: true,
    maxlength: [50, 'Spare part name cannot be more than 50 characters']
  },
  sparePartPrice: {
    type: Number,
    min: [0, 'Spare part price cannot be negative']
  },
  technicianName: {
    type: String,
    trim: true,
    maxlength: [50, 'Technician name cannot be more than 50 characters']
  },
  technicianPhone: {
    type: String,
    match: [/^\+?[1-9]\d{1,14}$/, 'Please enter a valid phone number']
  },
  technicianSalary: {
    type: Number,
    min: [0, 'Technician salary cannot be negative']
  },
  technicianReview: {
    type: String,
    trim: true,
    maxlength: [200, 'Review cannot be more than 200 characters']
  },
  futureServices: {
    type: String,
    trim: true,
    maxlength: [200, 'Review cannot be more than 200 characters']
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

// Update the updatedAt field before saving
JobSchema.pre('save', function (next) {
  this.updatedAt = Date.now();
  next();
});

module.exports = mongoose.model('Job', JobSchema);