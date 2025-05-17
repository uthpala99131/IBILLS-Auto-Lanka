import mongoose from 'mongoose';

const bookingSchema = new mongoose.Schema({
  customerName: {
    type: String,
    required: true
  },
  contactNumber: {
    type: String,
    required: true
  },
  vehicleType: {
    type: String,
    required: true
  },
  serviceType: {
    type: String,
    enum: ['recovery', 'service'],
    required: true
  },
  date: {
    type: Date,
    required: true
  },
  time: {
    type: String,
    required: true
  },
  status: {
    type: String,
    enum: ['pending', 'confirmed', 'completed', 'cancelled'],
    default: 'pending'
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

const Booking = mongoose.model('Booking', bookingSchema);

export default Booking;