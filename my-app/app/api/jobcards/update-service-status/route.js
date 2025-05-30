import { connectToDB } from '../../../lib/db';
import JobCard from '../../../../../backend/models/Jobcard';

// POST update service status
export async function POST(request) {
  try {
    await connectToDB();
    const { jobCardId, serviceIndex, status } = await request.json();
    
    const jobCard = await JobCard.findById(jobCardId);
    if (!jobCard) {
      return new Response(JSON.stringify({ message: 'Job card not found' }), {
        status: 404,
        headers: { 'Content-Type': 'application/json' },
      });
    }
    
    if (serviceIndex >= jobCard.services.length) {
      return new Response(JSON.stringify({ message: 'Invalid service index' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }
    
    jobCard.services[serviceIndex].status = status;
    
    // Update overall job card status if all services are completed
    const allCompleted = jobCard.services.every(s => s.status === 'Completed');
    if (allCompleted) {
      jobCard.status = 'Completed';
      jobCard.endDate = new Date();
    } else if (jobCard.services.some(s => s.status === 'In Progress')) {
      jobCard.status = 'In Progress';
    }
    
    await jobCard.save();
    
    return new Response(JSON.stringify(jobCard), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    return new Response(JSON.stringify({ message: error.message }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}