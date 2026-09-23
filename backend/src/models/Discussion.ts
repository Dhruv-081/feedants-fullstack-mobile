import mongoose, { Schema, Document } from 'mongoose';

export interface IDiscussion extends Document {
  competitionId: mongoose.Types.ObjectId;
  userId: string;
  userName: string;
  question: string;
  answer?: string;
  createdAt: Date;
}

const DiscussionSchema: Schema = new Schema({
  competitionId: { type: Schema.Types.ObjectId, ref: 'Competition', required: true },
  userId: { type: String, required: true },
  userName: { type: String, required: true },
  question: { type: String, required: true },
  answer: { type: String },
}, { timestamps: true });

export default mongoose.model<IDiscussion>('Discussion', DiscussionSchema);
