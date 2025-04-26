import connectToDB  from '../../utils/database';
import Location from '../../../models/location';

export default async function handler(req, res) {
  if (req.method === 'GET') {
    try {
      await connectToDB();
      const locations = await Location.find({});
      res.status(200).json(locations);
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch locations' });
    }
  } else if (req.method === 'POST') {
    try {
      await connectToDB();
      const newLocation = new Location(req.body);
      await newLocation.save();
      res.status(201).json(newLocation);
    } catch (error) {
      res.status(500).json({ error: 'Failed to create location' });
    }
  } else {
    res.setHeader('Allow', ['GET', 'POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}