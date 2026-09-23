import { Request, Response } from 'express';
import UserProfile from '../models/UserProfile';

// Generate a random 6-digit OTP
const generateOTP = () => Math.floor(100000 + Math.random() * 900000).toString();

// POST /api/auth/register
export const register = async (req: Request, res: Response) => {
  try {
    const { userId, name, email, phone } = req.body;
    const otp = generateOTP();

    // In production, send this OTP via Email/SMS service here
    console.log(`Sending OTP ${otp} to ${email}`);

    const profile = await UserProfile.findOneAndUpdate(
      { userId },
      { name, email, phone, otp },
      { upsert: true, new: true }
    );

    res.json({ message: 'OTP sent successfully', otp }); // Returning OTP for demo purposes
  } catch (error) {
    res.status(500).json({ error: 'Registration failed' });
  }
};

// POST /api/auth/verify
export const verifyOTP = async (req: Request, res: Response) => {
  try {
    const { userId, otp } = req.body;
    const profile = await UserProfile.findOne({ userId });

    if (profile && profile.otp === otp) {
      profile.isVerified = true;
      profile.otp = undefined; // Clear OTP after use
      await profile.save();
      res.json({ message: 'Verified successfully', isVerified: true });
    } else {
      res.status(400).json({ error: 'Invalid OTP' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Verification failed' });
  }
};

// GET /api/profile/:userId
export const getProfile = async (req: Request, res: Response) => {
  try {
    const profile = await UserProfile.findOne({ userId: req.params.userId });
    if (!profile) return res.status(404).json({ error: 'Profile not found' });
    res.json(profile);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
};
