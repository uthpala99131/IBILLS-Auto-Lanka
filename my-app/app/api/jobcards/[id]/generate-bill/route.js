import { connectToDB } from '../../../lib/db';
import JobCard from '../../../../../backend/models/Jobcard';


// PUT generate bill for job card
export async function PUT(request, { params }) {
  try {
    await connectToDB();
    
    const jobCard = await JobCard.findByIdAndUpdate(
      params.id,
      { 
        billGenerated: true,
        billDate: new Date(),
        status: 'Billed',
        updatedAt: Date.now()
      },
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