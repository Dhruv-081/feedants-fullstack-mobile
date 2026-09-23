import mongoose, { Schema, Document } from 'mongoose';

export interface IWinner extends Document {
  competitionId: mongoose.Types.ObjectId;
  userId: mongoose.Types.ObjectId;
  rank: number;
}

const WinnerSchema: Schema = new Schema({
  competitionId: { type: Schema.Types.ObjectId, ref: 'Competition', required: true },
  userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  rank: { type: Number, required: true },
}, { timestamps: true });

export default mongoose.model<IWinner>('Winner', WinnerSchema);
