import express from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../models/User.js';
import { authenticateUser } from '../middleware/auth.js';
import transporter from '../utils/mailer.js';

const router = express.Router();

// User Registration
router.post('/register', async (req, res) => {
  const { username, email, password } = req.body;

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) return res.status(400).json({ message: 'User already exists' });

    const existingUsername = await User.findOne({ username });
    if (existingUsername) {
      return res.status(401).json({ message: 'Username already exists' });
    }

    const hashedPassword = await bcrypt.hash(password, 12);
    const newUser = new User({ username, email, password: hashedPassword });

    await newUser.save();
    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Something went wrong' });
  }
});

// User Login
router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ message: 'User not found' });

    const isPasswordCorrect = await bcrypt.compare(password, user.password);
    if (!isPasswordCorrect) return res.status(400).json({ message: 'Invalid credentials' });

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

    res.status(200).json({ result: user, token });
  } catch (error) {
    res.status(500).json({ message: 'Something went wrong' });
  }
});

// Forget Password
router.post('/forget-password', async (req, res) => {
  const { email } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ message: 'User not found' });

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '24h' });

    const resetLink = `http://localhost:5173/reset-password/${token}`;

    const mailOptions = {
      from: process.env.SMTP_USER,
      to: user.email,
      subject: 'Password Reset Link',
      html: `<p>Click <a href="${resetLink}">here</a> to reset your password.</p>`,
    };


    await transporter.sendMail(mailOptions);

    res.status(200).json({ message: 'Password reset link sent to your email' });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Something went wrong'});
  }
});

// Reset Password
router.post('/reset-password/:token', async (req, res) => {
  const { token } = req.params;
  const { password } = req.body;

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.id);
    if (!user) return res.status(404).json({ message: 'User not found' });

    const hashedPassword = await bcrypt.hash(password, 10);

    user.password = hashedPassword;
    await user.save();

    res.status(200).json({ message: 'Password has been reset successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Something went wrong' });
  }
});

// Get User Data
router.get('/user', authenticateUser, async (req, res) => {
  try {
    const user = await User.findById(req.user._id).select('username points');
    if (!user) return res.status(404).json({ message: 'User not found' });

    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: 'Something went wrong' });
  }
});

export default router;
