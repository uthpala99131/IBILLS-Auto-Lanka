import { connectToDB } from '../../lib/db';
import JobCard from '../../../../backend/models/Jobcard';

// GET all job cards
export async function GET() {
  try {
    await connectToDB();
    const jobCards = await JobCard.find().sort({ createdAt: -1 });
    return new Response(JSON.stringify(jobCards), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    return new Response(JSON.stringify({ message: error.message }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}

// POST create new job card
export async function POST(request) {
  try {
    await connectToDB();
    const data = await request.json();
    
    // Generate job number
    const now = new Date();
    const year = now.getFullYear().toString().slice(-2);
    const month = (now.getMonth() + 1).toString().padStart(2, '0');
    const day = now.getDate().toString().padStart(2, '0');
    
    const latestJob = await JobCard.findOne().sort({ createdAt: -1 });
    let sequence = 1;
    
    if (latestJob && latestJob.jobNumber) {
      const lastSequence = parseInt(latestJob.jobNumber.slice(-4));
      if (!isNaN(lastSequence)) {
        sequence = lastSequence + 1;
      }
    }
    
    const jobNumber = `JC${year}${month}${day}${sequence.toString().padStart(4, '0')}`;
    
    const jobCardData = {
      jobNumber,
      ...data,
      totalAmount: data.services.reduce((sum, service) => sum + service.charge, 0) +
                  data.spareParts.reduce((sum, part) => sum + part.totalPrice, 0)
    };
    
    const jobCard = new JobCard(jobCardData);
    await jobCard.save();
    
    return new Response(JSON.stringify(jobCard), {
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