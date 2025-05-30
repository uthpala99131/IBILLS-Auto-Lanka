import { connectToDB } from '../../../lib/db';
import JobCard from '../../../../../backend/models/Jobcard';
import Review from '../../../../../backend/models/Review';

// POST add review to job card
export async function POST(request) {
  try {
    await connectToDB();
    const { jobCardId, customerId, rating, comment } = await request.json();
    
    const jobCard = await JobCard.findById(jobCardId);
    if (!jobCard) {
      return new Response(JSON.stringify({ message: 'Job card not found' }), {
        status: 404,
        headers: { 'Content-Type': 'application/json' },
      });
    }
    
    if (!jobCard.billGenerated) {
      return new Response(JSON.stringify({ message: 'Bill must be generated before reviewing' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }
    
    const review = new Review({
      jobCardId,
      customerId,
      rating,
      comment
    });
    
    await review.save();
    
    return new Response(JSON.stringify(review), {
      status: 201,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    return new Response(JSON.stringify({ message: error.message }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}