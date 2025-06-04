const mongoose = require('mongoose');

const BookingSchema = new mongoose.Schema({
  cus_name: {
    type: String,
    required: [true, 'Customer name is required'],
    trim: true,
    maxlength: [50, 'Name cannot be more than 50 characters']
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

  price: {
    type: Number,
    required: [true, 'Price is required'],
    min: [0, 'Price cannot be negative']
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  },
  user: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
    required: true
  }
});

// Update the updatedAt field before saving
BookingSchema.pre('save', function(next) {
  this.updatedAt = Date.now();
  next();
});

module.exports = mongoose.model('Booking', BookingSchema);