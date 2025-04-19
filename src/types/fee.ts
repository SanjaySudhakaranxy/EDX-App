export type FeeStatus = 'paid' | 'not_paid';

export interface Fee {
  id: string;
  student_id: string;
  month: string; // Format: YYYY-MM
  status: FeeStatus;
  amount: number;
  created_at: string;
  updated_at: string;
}

export interface FeeRecord {
  [month: string]: FeeStatus;
} 