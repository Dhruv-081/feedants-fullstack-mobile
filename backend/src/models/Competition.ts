import mongoose, { Schema, Document } from 'mongoose';

export interface ICompetition extends Document {
  title: string;
  tags: string[];
  winnersCertificateNote: string;
  prizePool: number;
  entryFee: number;
  totalSpots: number;
  bookedSpots: number;
  judge: {
    name: string;
    role: string;
    experience: string;
    profileImage: string;
    introVideoUrl: string;
  };
  lifecycle: {
    registrationDeadline: Date;
    submissionStart: Date;
    submissionEnd: Date;
    resultDate: Date;
  };
  tabs: {
    aboutText: string;
    judgingParametersText: string;
    rulesAndEligibilityText: string;
  };
  rewards: {
    position: string;
    rewardAmount: number;
  }[];
  previousWinners: {
    name: string;
    position: string;
    videoThumbnail: string;
    videoUrl: string;
  }[];
  status: 'upcoming' | 'ongoing' | 'completed';
}

const CompetitionSchema: Schema = new Schema({
  title: { type: String, required: true },
  tags: [{ type: String }],
  winnersCertificateNote: { type: String, default: 'Winners get certificate' },
  prizePool: { type: Number, required: true },
  entryFee: { type: Number, required: true },
  totalSpots: { type: Number, required: true },
  bookedSpots: { type: Number, default: 0 },
  judge: {
    name: { type: String, required: true },
    role: { type: String, required: true },
    experience: { type: String, required: true },
    profileImage: { type: String, required: true },
    introVideoUrl: { type: String, required: true },
  },
  lifecycle: {
    registrationDeadline: { type: Date, required: true },
    submissionStart: { type: Date, required: true },
    submissionEnd: { type: Date, required: true },
    resultDate: { type: Date, required: true },
  },
  tabs: {
    aboutText: { type: String, required: true },
    judgingParametersText: { type: String, required: true },
    rulesAndEligibilityText: { type: String, required: true },
  },
  rewards: [
    {
      position: { type: String, required: true },
      rewardAmount: { type: Number, required: true },
    },
  ],
  previousWinners: [
    {
      name: { type: String, required: true },
      position: { type: String, required: true },
      videoThumbnail: { type: String, required: true },
      videoUrl: { type: String, required: true },
    },
  ],
  status: { type: String, enum: ['upcoming', 'ongoing', 'completed'], default: 'ongoing' },
}, { timestamps: true });

CompetitionSchema.index({ status: 1, 'lifecycle.registrationDeadline': 1 });

export default mongoose.model<ICompetition>('Competition', CompetitionSchema);
