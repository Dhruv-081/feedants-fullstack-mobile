import mongoose, { Schema, Document } from 'mongoose';

export interface IRegistration extends Document {
  userId: string;
  competitionId: mongoose.Types.ObjectId;
  paymentStatus: 'pending' | 'completed' | 'failed';
  registrationDate: Date;
}

const RegistrationSchema: Schema = new Schema({
  userId: { type: String, required: true },
  competitionId: { type: Schema.Types.ObjectId, ref: 'Competition', required: true },
  paymentStatus: { type: String, enum: ['pending', 'completed', 'failed'], default: 'completed' },
  registrationDate: { type: Date, default: Date.now },
}, { timestamps: true });

RegistrationSchema.index({ userId: 1, competitionId: 1 }, { unique: true });

export default mongoose.model<IRegistration>('Registration', RegistrationSchema);
