import { connectToDB } from '../../../lib/db';
import JobCard from '../../../../../backend/models/Jobcard';

// GET analytics data
export async function GET() {
  try {
    await connectToDB();
    
    // Vehicle make distribution
    const makeDistribution = await JobCard.aggregate([
      { $group: { _id: "$vehicle.make", count: { $sum: 1 } } },
      { $sort: { count: -1 } }
    ]);
    
    // Service type distribution
    const serviceDistribution = await JobCard.aggregate([
      { $unwind: "$services" },
      { $group: { _id: "$services.name", count: { $sum: 1 } } },
      { $sort: { count: -1 } }
    ]);
    
    // Monthly job count
    const monthlyJobs = await JobCard.aggregate([
      { 
        $group: { 
          _id: { 
            year: { $year: "$createdAt" },
            month: { $month: "$createdAt" }
          },
          count: { $sum: 1 }
        } 
      },
      { $sort: { "_id.year": 1, "_id.month": 1 } }
    ]);
    
    // Technician workload
    const technicianWorkload = await JobCard.aggregate([
      { $group: { _id: "$technician.name", count: { $sum: 1 } } },
      { $sort: { count: -1 } }
    ]);
    
    return new Response(JSON.stringify({
      makeDistribution,
      serviceDistribution,
      monthlyJobs,
      technicianWorkload
    }), {
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