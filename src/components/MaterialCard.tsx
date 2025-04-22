'use client';

import { Material } from '@/types/material';
import { format } from 'date-fns';

interface MaterialCardProps {
  material: Material;
  onDownload: (material: Material) => void;
  onDelete?: (material: Material) => void;
}

export default function MaterialCard({
  material,
  onDownload,
  onDelete,
}: MaterialCardProps) {
  const getFileIcon = (fileType: string) => {
    if (fileType.includes('pdf')) return '📄';
    if (fileType.includes('word')) return '📝';
    return '📁';
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  return (
    <div className="card">
      <div className="flex items-start justify-between">
        <div className="flex items-start space-x-4">
          <div className="text-3xl">{getFileIcon(material.file_type)}</div>
          <div>
            <h3 className="text-lg font-medium text-gray-900">{material.title}</h3>
            <p className="text-sm text-gray-500">{material.description}</p>
            <div className="mt-2 flex items-center space-x-4 text-sm text-gray-500">
              <span>{formatFileSize(material.file_size)}</span>
              <span>•</span>
              <span>
                {format(new Date(material.created_at), 'MMM d, yyyy')}
              </span>
              {material.grade && (
                <>
                  <span>•</span>
                  <span>Grade {material.grade}</span>
                </>
              )}
            </div>
          </div>
        </div>
        <div className="flex space-x-2">
          <button
            onClick={() => onDownload(material)}
            className="btn-secondary text-sm"
          >
            Download
          </button>
          {onDelete && (
            <button
              onClick={() => onDelete(material)}
              className="btn-secondary text-sm bg-red-100 text-red-700 hover:bg-red-200"
            >
              Delete
            </button>
          )}
        </div>
      </div>
    </div>
  );
} 