import mongoose, { Schema, Document } from 'mongoose';

export interface IUserProfile extends Document {
  userId: string;
  name: string;
  email: string;
  phone: string;
  bio: string;
  isVerified: boolean;
  otp?: string;
}

const UserProfileSchema: Schema = new Schema({
  userId: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: true },
  bio: { type: String, default: 'Classical dance enthusiast & performer' },
  isVerified: { type: Boolean, default: false },
  otp: { type: String },
}, { timestamps: true });

export default mongoose.model<IUserProfile>('UserProfile', UserProfileSchema);
