import { supabase } from '@/lib/supabase';
import { Attendance, AttendanceStatus } from '@/types/attendance';

export class AttendanceService {
  static async getAttendanceByDate(date: string): Promise<Attendance[]> {
    const { data, error } = await supabase
      .from('attendance')
      .select('*')
      .eq('date', date);

    if (error) throw error;
    return data || [];
  }

  static async getStudentAttendance(
    studentId: string,
    startDate: string,
    endDate: string
  ): Promise<Attendance[]> {
    const { data, error } = await supabase
      .from('attendance')
      .select('*')
      .eq('student_id', studentId)
      .gte('date', startDate)
      .lte('date', endDate);

    if (error) throw error;
    return data || [];
  }

  static async updateAttendance(
    studentId: string,
    date: string,
    status: AttendanceStatus
  ): Promise<Attendance> {
    // Check if attendance record exists
    const { data: existingRecord } = await supabase
      .from('attendance')
      .select('*')
      .eq('student_id', studentId)
      .eq('date', date)
      .single();

    if (existingRecord) {
      // Update existing record
      const { data, error } = await supabase
        .from('attendance')
        .update({ status, updated_at: new Date().toISOString() })
        .eq('id', existingRecord.id)
        .select()
        .single();

      if (error) throw error;
      return data;
    } else {
      // Create new record
      const { data, error } = await supabase
        .from('attendance')
        .insert([
          {
            student_id: studentId,
            date,
            status,
          },
        ])
        .select()
        .single();

      if (error) throw error;
      return data;
    }
  }

  static async getAttendanceSummary(
    startDate: string,
    endDate: string
  ): Promise<Record<string, { present: number; absent: number; leave: number }>> {
    const { data, error } = await supabase
      .from('attendance')
      .select('student_id, status')
      .gte('date', startDate)
      .lte('date', endDate);

    if (error) throw error;

    const summary: Record<string, { present: number; absent: number; leave: number }> = {};

    data?.forEach((record) => {
      if (!summary[record.student_id]) {
        summary[record.student_id] = { present: 0, absent: 0, leave: 0 };
      }
      summary[record.student_id][record.status as keyof typeof summary[string]]++;
    });

    return summary;
  }
} 