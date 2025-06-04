// models/Technician.js
const mongoose = require('mongoose');

const TechnicianSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Name is required'],
    trim: true,
    maxlength: [50, 'Name cannot be more than 50 characters']
  },
  phoneNum: {
    type: String,
    required: [true, 'Phone number is required'],
    trim: true,
    unique: true,
  
  },
  salary: {
    type: Number,
    required: [true, 'Salary is required'],
    min: [0, 'Salary cannot be negative']
  },
  reviews: [
    {
      user: {
        type: mongoose.Schema.ObjectId,
        ref: 'User',
        required: false
      },
      comment: {
        type: String,
        trim: true
      },
      rating: {
        type: Number,
        
      },
      createdAt: {
        type: Date,
        default: Date.now
      }
    }
  ],
  averageRating: {
  type: Number,
  default: 0,
  min: [0, 'Average rating must be at least 0'],
  max: [5, 'Average rating cannot exceed 5']
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
TechnicianSchema.pre('save', function (next) {
  this.updatedAt = Date.now();
  next();
});

module.exports = mongoose.model('Technician', TechnicianSchema);