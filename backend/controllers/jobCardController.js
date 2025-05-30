import JobCard from '../models/JobCard.js';
import Review from '../models/Review.js';

// Generate a unique job number
const generateJobNumber = async () => {
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
  
  return `JC${year}${month}${day}${sequence.toString().padStart(4, '0')}`;
};

// Create a new job card
export const createJobCard = async (req, res) => {
  try {
    const jobNumber = await generateJobNumber();
    const jobCardData = {
      jobNumber,
      ...req.body,
      totalAmount: req.body.services.reduce((sum, service) => sum + service.charge, 0) +
                  req.body.spareParts.reduce((sum, part) => sum + part.totalPrice, 0)
    };

    const jobCard = new JobCard(jobCardData);
    await jobCard.save();
    
    res.status(201).json(jobCard);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Get all job cards
export const getAllJobCards = async (req, res) => {
  try {
    const jobCards = await JobCard.find().sort({ createdAt: -1 });
    res.status(200).json(jobCards);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get a single job card by ID
export const getJobCardById = async (req, res) => {
  try {
    const jobCard = await JobCard.findById(req.params.id);
    if (!jobCard) {
      return res.status(404).json({ message: 'Job card not found' });
    }
    res.status(200).json(jobCard);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update a job card
export const updateJobCard = async (req, res) => {
  try {
    const jobCard = await JobCard.findByIdAndUpdate(
      req.params.id,
      { ...req.body, updatedAt: Date.now() },
      { new: true }
    );
    
    if (!jobCard) {
      return res.status(404).json({ message: 'Job card not found' });
    }
    
    res.status(200).json(jobCard);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Update service status
export const updateServiceStatus = async (req, res) => {
  try {
    const { jobCardId, serviceIndex, status } = req.body;
    
    const jobCard = await JobCard.findById(jobCardId);
    if (!jobCard) {
      return res.status(404).json({ message: 'Job card not found' });
    }
    
    if (serviceIndex >= jobCard.services.length) {
      return res.status(400).json({ message: 'Invalid service index' });
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
    
    res.status(200).json(jobCard);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Generate bill for job card
export const generateBill = async (req, res) => {
  try {
    const jobCard = await JobCard.findByIdAndUpdate(
      req.params.id,
      { 
        billGenerated: true,
        billDate: new Date(),
        status: 'Billed',
        updatedAt: Date.now()
      },
      { new: true }
    );
    
    if (!jobCard) {
      return res.status(404).json({ message: 'Job card not found' });
    }
    
    res.status(200).json(jobCard);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Add review to job card
export const addReview = async (req, res) => {
  try {
    const { jobCardId, customerId, rating, comment } = req.body;
    
    const jobCard = await JobCard.findById(jobCardId);
    if (!jobCard) {
      return res.status(404).json({ message: 'Job card not found' });
    }
    
    if (!jobCard.billGenerated) {
      return res.status(400).json({ message: 'Bill must be generated before reviewing' });
    }
    
    const review = new Review({
      jobCardId,
      customerId,
      rating,
      comment
    });
    
    await review.save();
    
    res.status(201).json(review);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Get analytics data
export const getAnalytics = async (req, res) => {
  try {
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
    
    res.status(200).json({
      makeDistribution,
      serviceDistribution,
      monthlyJobs,
      technicianWorkload
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};