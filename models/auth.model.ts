import mongoose from 'mongoose';

export interface Session {
  user: mongoose.Types.ObjectId;
  valid: boolean;
}

export const sessionPrivateFields = ['__v', 'createdAt', 'updatedAt'];

const SessionSchema = new mongoose.Schema<Session>(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    valid: { type: Boolean, default: true },
  },
  { timestamps: true }
);

export const SessionModel =
  mongoose.models.Session || mongoose.model<Session>('Session', SessionSchema);
