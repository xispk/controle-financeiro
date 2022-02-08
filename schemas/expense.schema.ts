import { date, number, object, string, TypeOf, z } from 'zod';

const methodValues = ['dinheiro', 'cartão'] as const;

export const createExpenseSchema = object({
  category: string({ required_error: 'Category is required' }),
  amount: number().default(1),
  value: number({ required_error: 'Value is required' }),
  method: z.enum(methodValues).default('dinheiro'),
  user: string({ required_error: 'User is required' }),
  account: string({ required_error: 'Account is required' }),
  date: date({ required_error: 'Date is required' }),
  payday: date().default(new Date()),
});

export type CreteExpenseInput = TypeOf<typeof createExpenseSchema>;
