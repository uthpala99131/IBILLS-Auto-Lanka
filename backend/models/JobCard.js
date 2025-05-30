import mongoose from 'mongoose';

const jobCardSchema = new mongoose.Schema({
  jobNumber: { type: String, required: true, unique: true },
  customer: { 
    name: { type: String, required: true },
    contact: { type: String, required: true },
    email: { type: String },
  },
  vehicle: {
    make: { type: String, required: true },
    model: { type: String, required: true },
    year: { type: Number },
    registrationNo: { type: String, required: true },
    mileage: { type: Number, required: true },
    vin: { type: String },
  },
  technician: {
    name: { type: String, required: true },
    id: { type: String, required: true },
  },
  services: [{
    name: { type: String, required: true },
    description: { type: String },
    charge: { type: Number, required: true },
    status: { type: String, enum: ['Pending', 'In Progress', 'Completed'], default: 'Pending' },
  }],
  spareParts: [{
    name: { type: String, required: true },
    partNumber: { type: String },
    quantity: { type: Number, required: true },
    unitPrice: { type: Number, required: true },
    totalPrice: { type: Number, required: true },
  }],
  totalAmount: { type: Number, required: true },
  status: { type: String, enum: ['Pending', 'In Progress', 'Completed', 'Billed'], default: 'Pending' },
  startDate: { type: Date, default: Date.now },
  endDate: { type: Date },
  futureServices: [{
    serviceType: { type: String, required: true },
    recommendedMileage: { type: Number, required: true },
    description: { type: String },
  }],
  notes: { type: String },
  billGenerated: { type: Boolean, default: false },
  billDate: { type: Date },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

jobCardSchema.pre('save', function(next) {
  this.updatedAt = Date.now();
  next();
});

const JobCard = mongoose.model('JobCard', jobCardSchema);

export default JobCard;