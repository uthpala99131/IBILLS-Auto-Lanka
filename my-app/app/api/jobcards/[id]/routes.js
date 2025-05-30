import { connectToDB } from '../../lib/db';
import JobCard from '../../../../backend/models/Jobcard';

// GET single job card by ID
export async function GET(request, { params }) {
  try {
    await connectToDB();
    const jobCard = await JobCard.findById(params.id);
    
    if (!jobCard) {
      return new Response(JSON.stringify({ message: 'Job card not found' }), {
        status: 404,
        headers: { 'Content-Type': 'application/json' },
      });
    }
    
    return new Response(JSON.stringify(jobCard), {
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

// PUT update job card
export async function PUT(request, { params }) {
  try {
    await connectToDB();
    const data = await request.json();
    
    const jobCard = await JobCard.findByIdAndUpdate(
      params.id,
      { ...data, updatedAt: Date.now() },
      { new: true }
    );
    
    if (!jobCard) {
      return new Response(JSON.stringify({ message: 'Job card not found' }), {
        status: 404,
        headers: { 'Content-Type': 'application/json' },
      });
    }
    
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