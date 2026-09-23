import { Request, Response } from 'express';
import Competition from '../models/Competition';
import Registration from '../models/Registration';
import Submission from '../models/Submission';
import Discussion from '../models/Discussion';
import mongoose from 'mongoose';

// GET /api/competitions/:id
export const getCompetition = async (req: Request, res: Response) => {
  try {
    const competition = await Competition.findById(req.params.id);
    if (!competition) return res.status(404).json({ error: 'Competition not found' });

    const userId = req.query.userId as string;
    let isRegistered = false;
    if (userId) {
      const registration = await Registration.findOne({ competitionId: req.params.id, userId });
      isRegistered = !!registration;
    }

    res.json({ ...competition.toObject(), isRegistered });
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
};

// GET /api/competitions/:id/my-status
export const getMyStatus = async (req: Request, res: Response) => {
  try {
    const userId = req.query.userId as string;
    if (!userId) {
      return res.json({ registered: false });
    }
    const registration = await Registration.findOne({ competitionId: req.params.id, userId });
    res.json({ registered: !!registration });
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
};

// POST /api/competitions/:id/register
export const registerCompetition = async (req: Request, res: Response) => {
  const session = await mongoose.startSession();
  session.startTransaction();
  try {
    const { userId } = req.body;

    const existingReg = await Registration.findOne({ competitionId: req.params.id, userId }).session(session);
    if (existingReg) {
      await session.abortTransaction();
      session.endSession();
      return res.status(400).json({ error: 'Already registered for this competition' });
    }

    const competition = await Competition.findOneAndUpdate(
      {
        _id: req.params.id,
        $expr: { $lt: ["$bookedSpots", "$totalSpots"] }
      },
      { $inc: { bookedSpots: 1 } },
      { new: true, session }
    );

    if (!competition) {
      await session.abortTransaction();
      session.endSession();
      return res.status(400).json({ error: 'Registration closed or competition full' });
    }

    await Registration.create([{ userId, competitionId: req.params.id }], { session });

    await session.commitTransaction();
    session.endSession();
    res.status(201).json({ message: 'Registered successfully', bookedSpots: competition.bookedSpots });
  } catch (error) {
    await session.abortTransaction();
    session.endSession();
    res.status(500).json({ error: 'Registration failed' });
  }
};

// POST /api/competitions/:id/submit
export const submitEntry = async (req: Request, res: Response) => {
  try {
    const { userId, videoUrl } = req.body;
    const submission = await Submission.create({
      competitionId: req.params.id,
      userId,
      videoUrl
    });
    res.status(201).json({ message: 'Submission recorded', submission });
  } catch (error) {
    res.status(500).json({ error: 'Failed to record submission' });
  }
};

// GET /api/competitions/:id/discussions
export const getDiscussions = async (req: Request, res: Response) => {
  try {
    const discussions = await Discussion.find({ competitionId: req.params.id }).sort({ createdAt: -1 });
    res.json(discussions);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
};

// POST /api/competitions/:id/discussions
export const postQuestion = async (req: Request, res: Response) => {
  try {
    const { userId, userName, question } = req.body;
    const discussion = await Discussion.create({ competitionId: req.params.id, userId, userName, question });
    res.status(201).json(discussion);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
};

// GET /api/competitions/:id/winners
export const getWinners = async (req: Request, res: Response) => {
  res.json([]);
};

// GET /api/competitions/:id/reviews
export const getReviews = async (req: Request, res: Response) => {
  res.json([]);
};
