const express = require('express');
const router = express.Router();
const nodemailer = require('nodemailer');

// Handle contact form submission
router.post('/', async (req, res) => {
  const { name, email, phone, message } = req.body;

  try {
    // Here you would typically:
    // 1. Save to database
    // 2. Send email notification
    // This is a simplified version
    
    // Example email sending (configure with your SMTP details)
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
      }
    });

    const mailOptions = {
      from: email,
      to: 'isuruhemachandra25@gmail.com',
      subject: `New Contact Form Submission from ${name}`,
      text: `
        Name: ${name}
        Email: ${email}
        Phone: ${phone}
        Message: ${message}
      `
    };

    await transporter.sendMail(mailOptions);
    
    res.json({ message: 'Thank you for your message! We will get back to you soon.' });
  } catch (error) {
    console.error('Error processing contact form:', error);
    res.status(500).json({ message: 'Failed to send message. Please try again later.' });
  }
});

module.exports = router;