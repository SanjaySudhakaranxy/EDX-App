export type UserRole = 'teacher' | 'student';

export type Grade = 
  | 'playschool'
  | 'nursery'
  | 'lkg'
  | 'ukg'
  | '1'
  | '2'
  | '3'
  | '4'
  | '5'
  | '6'
  | '7'
  | '8'
  | '9'
  | '10'
  | '11'
  | '12';

export interface User {
  id: string;
  email: string;
  name: string;
  role: UserRole;
  grade?: Grade;
  created_at: string;
  updated_at: string;
} 