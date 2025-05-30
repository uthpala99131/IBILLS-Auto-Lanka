import mongoose from 'mongoose';

const reviewSchema = new mongoose.Schema({
  jobCardId: { type: mongoose.Schema.Types.ObjectId, ref: 'JobCard', required: true },
  customerId: { type: String, required: true },
  rating: { type: Number, required: true, min: 1, max: 5 },
  comment: { type: String },
  date: { type: Date, default: Date.now },
});

const Review = mongoose.model('Review', reviewSchema);

export default Review;