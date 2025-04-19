'use client';

import { useState } from 'react';
import { AttendanceStatus } from '@/types/attendance';
import { User } from '@/types/user';

interface AttendanceTableProps {
  students: User[];
  onAttendanceChange: (studentId: string, date: string, status: AttendanceStatus) => void;
  initialAttendance?: Record<string, Record<string, AttendanceStatus>>;
}

export default function AttendanceTable({
  students,
  onAttendanceChange,
  initialAttendance = {},
}: AttendanceTableProps) {
  const [selectedDate, setSelectedDate] = useState<string>(
    new Date().toISOString().split('T')[0]
  );

  const daysOfWeek = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

  const handleStatusChange = (studentId: string, status: AttendanceStatus) => {
    onAttendanceChange(studentId, selectedDate, status);
  };

  return (
    <div className="overflow-x-auto">
      <div className="mb-4">
        <label htmlFor="date" className="block text-sm font-medium text-gray-700">
          Select Date
        </label>
        <input
          type="date"
          id="date"
          value={selectedDate}
          onChange={(e) => setSelectedDate(e.target.value)}
          className="input-field mt-1"
        />
      </div>

      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              Student Name
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              Grade
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              Status
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {students.map((student) => (
            <tr key={student.id}>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm font-medium text-gray-900">
                  {student.name}
                </div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm text-gray-500">{student.grade}</div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <select
                  value={initialAttendance[student.id]?.[selectedDate] || 'present'}
                  onChange={(e) =>
                    handleStatusChange(student.id, e.target.value as AttendanceStatus)
                  }
                  className="input-field"
                >
                  <option value="present">Present</option>
                  <option value="absent">Absent</option>
                  <option value="leave">Leave</option>
                </select>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
} 