// pages/api/admin/data.js
import jwt from 'jsonwebtoken'
import mongoose from 'mongoose'

const SECRET = process.env.JWT_SECRET

const serviceSchema = new mongoose.Schema({ title: String, description: String })
const messageSchema = new mongoose.Schema({ name: String, email: String, message: String })

const Service = mongoose.models.Service || mongoose.model('Service', serviceSchema)
const Contact = mongoose.models.Contact || mongoose.model('Contact', messageSchema)

export default async function handler(req, res) {
  if (req.method !== 'GET') return res.status(405).end()

  const authHeader = req.headers.authorization || ''
  const token = authHeader.replace('Bearer ', '')

  try {
    jwt.verify(token, SECRET)

    if (!mongoose.connections[0].readyState) {
      await mongoose.connect(process.env.MONGODB_URI)
    }

    const services = await Service.find({})
    const messages = await Contact.find({})

    return res.status(200).json({ services, messages })
  } catch (err) {
    return res.status(401).json({ message: 'Unauthorized' })
  }
}
