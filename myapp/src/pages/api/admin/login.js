// pages/api/admin/login.ts
import type { NextApiRequest, NextApiResponse } from 'next'
import jwt from 'jsonwebtoken'

const SECRET = process.env.JWT_SECRET as string

const ADMIN_USER = {
  username: 'admin',
  password: 'admin123', // 👉 Change this in production!
}

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') return res.status(405).end()

  const { username, password } = req.body

  if (username === ADMIN_USER.username && password === ADMIN_USER.password) {
    const token = jwt.sign({ username }, SECRET, { expiresIn: '1h' })
    return res.status(200).json({ token })
  } else {
    return res.status(401).json({ message: 'Invalid credentials' })
  }
}
