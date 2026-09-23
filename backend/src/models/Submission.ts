import mongoose, { Schema, Document } from 'mongoose';

export interface ISubmission extends Document {
  userId: mongoose.Types.ObjectId;
  competitionId: mongoose.Types.ObjectId;
  videoUrl: string;
  submissionDate: Date;
}

const SubmissionSchema: Schema = new Schema({
  userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  competitionId: { type: Schema.Types.ObjectId, ref: 'Competition', required: true },
  videoUrl: { type: String, required: true },
  submissionDate: { type: Date, default: Date.now },
}, { timestamps: true });

export default mongoose.model<ISubmission>('Submission', SubmissionSchema);
