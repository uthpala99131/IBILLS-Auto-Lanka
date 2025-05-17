import bcrypt from 'bcryptjs';
import User from '../models/user';

// Create admin user (run this once)
export const createAdminUser = async () => {
  try {
    const hashedPassword = await bcrypt.hash('Admin@1234', 10);
    
    const admin = await User.create({
      username: 'admin@ibills.lk',
      password: hashedPassword,
      role: 'admin'
    });

    console.log('Admin user created:', admin);
  } catch (error) {
    console.error('Error creating admin user:', error);
  }
};

// Regular user registration
export const registerUser = async (req, res) => {
  try {
    const { username, password } = req.body;
    
    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);
    
    const user = await User.create({
      username,
      password: hashedPassword,
      role: 'user' // Default role
    });

    res.status(201).json({
      _id: user._id,
      username: user.username,
      role: user.role
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};