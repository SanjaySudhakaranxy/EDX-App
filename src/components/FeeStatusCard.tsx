'use client';

import { FeeStatus } from '@/types/fee';
import { User } from '@/types/user';

interface FeeStatusCardProps {
  student: User;
  feeStatus: FeeStatus;
  amount: number;
  onStatusChange: (status: FeeStatus) => void;
}

export default function FeeStatusCard({
  student,
  feeStatus,
  amount,
  onStatusChange,
}: FeeStatusCardProps) {
  return (
    <div className="card">
      <div className="flex justify-between items-start">
        <div>
          <h3 className="text-lg font-medium text-gray-900">{student.name}</h3>
          <p className="text-sm text-gray-500">Grade: {student.grade}</p>
        </div>
        <div className="text-right">
          <p className="text-2xl font-bold text-gray-900">₹{amount}</p>
          <p className="text-sm text-gray-500">Monthly Fee</p>
        </div>
      </div>

      <div className="mt-4">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Payment Status
        </label>
        <select
          value={feeStatus}
          onChange={(e) => onStatusChange(e.target.value as FeeStatus)}
          className="input-field"
        >
          <option value="paid">Paid</option>
          <option value="not_paid">Not Paid</option>
        </select>
      </div>

      <div className="mt-4">
        <div
          className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
            feeStatus === 'paid'
              ? 'bg-green-100 text-green-800'
              : 'bg-red-100 text-red-800'
          }`}
        >
          {feeStatus === 'paid' ? 'Payment Complete' : 'Payment Pending'}
        </div>
      </div>
    </div>
  );
} 