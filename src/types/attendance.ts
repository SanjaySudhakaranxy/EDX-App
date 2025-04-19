export type AttendanceStatus = 'present' | 'absent' | 'leave';

export interface Attendance {
  id: string;
  student_id: string;
  date: string;
  status: AttendanceStatus;
  created_at: string;
  updated_at: string;
}

export interface AttendanceRecord {
  [date: string]: AttendanceStatus;
} 