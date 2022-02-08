import mongoose from 'mongoose';

export interface Expense {
  category: string;
  amount: number;
  value: number;
  method: 'dinheiro' | 'cartão';
  user: mongoose.Types.ObjectId;
  account: mongoose.Types.ObjectId;
  date: Date;
  payday: Date;
}

const ExpenseSchema = new mongoose.Schema<Expense>({
  category: { type: String, required: true },
  amount: { type: Number, default: 1 },
  value: { type: Number, required: true },
  method: { type: String, default: 'dinheiro' },
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  account: { type: mongoose.Schema.Types.ObjectId, ref: 'Account' },
  date: { type: Date, required: true },
  payday: { type: Date, default: new Date() },
});

export const ExpenseModel =
  mongoose.models.Expense || mongoose.model<Expense>('Expense', ExpenseSchema);
