
import JobCard from '../../models/JobCard';

export default async function handler(req, res) {
  await dbConnect();
  if (req.method === 'POST') {
    try {
      const jobCard = new JobCard(req.body);
      await jobCard.save();
      res.status(200).json({ message: 'Success', jobCard });
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  }
}