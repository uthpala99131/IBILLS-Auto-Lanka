import { connectToDB } from '../../utils/database';
import Contact from '../../models/contact';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { name, email, phone, message } = req.body;

    try {
      await connectToDB();
      
      // Save to database
      const newContact = new Contact({
        name,
        email,
        phone,
        message
      });
      await newContact.save();

      // Here you would typically send an email as well
      // (Implementation depends on your email service)

      res.status(200).json({ message: 'Thank you for your message! We will get back to you soon.' });
    } catch (error) {
      console.error('Error saving contact:', error);
      res.status(500).json({ message: 'Failed to send message. Please try again later.' });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}