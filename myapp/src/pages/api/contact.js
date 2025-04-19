// pages/api/contact.ts
import type { NextApiRequest, NextApiResponse } from 'next'
import mongoose from 'mongoose'

const MONGODB_URI = process.env.MONGODB_URI as string

const contactSchema = new mongoose.Schema({
  name: String,
  email: String,
  message: String,
})

const Contact = mongoose.models.Contact || mongoose.model('Contact', contactSchema)

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (!mongoose.connections[0].readyState) {
    await mongoose.connect(MONGODB_URI)
  }

  if (req.method === 'POST') {
    const { name, email, message } = req.body
    const newMessage = new Contact({ name, email, message })
    await newMessage.save()
    return res.status(200).json({ success: true })
  }

  res.status(405).end()
}

export default handler
