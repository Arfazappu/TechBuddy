import express from 'express';
import User from '../models/User.js';
import transporter from '../utils/mailer.js';

const router = express.Router();

router.post('/goodies', async (req, res) => {
    const { userId, goodieName, goodiePoints, address } = req.body;
  
    try {
      // Find the user by ID
      const user = await User.findById(userId);
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
  
      // Check if the user has enough points
      if (user.points < goodiePoints) {
        return res.status(400).json({ message: 'Insufficient points' });
      }
  
      // Deduct the goodie points from the user's points
      user.points -= goodiePoints;
  
      // Save the updated user
      await user.save();
  
      // Send an email to the user
      const mailOptions = {
        from: process.env.SMTP_USER,
        to: user.email,
        subject: 'Goodie Exchange Confirmation',
        text: `You have successfully exchanged ${goodiePoints} points for a ${goodieName}. Your goodie will be shipped to the following address: ${address}. Thank you!`
      };
  
      transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          return res.status(500).json({ message: 'Error sending email', error });
        }
        res.status(200).json({ message: 'Goodie exchanged successfully'});
      });
  
    } catch (error) {
      console.error('Error exchanging goodie:', error);
      res.status(500).json({ message: 'Internal server error', error });
    }
  });
  
  export default router;