'use client';

import { useState, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { MaterialType } from '@/types/material';

interface FileUploadProps {
  onUpload: (file: File, title: string, description: string, materialType: MaterialType, grade?: string) => void;
  materialType: MaterialType;
  grade?: string;
}

export default function FileUpload({
  onUpload,
  materialType,
  grade,
}: FileUploadProps) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [file, setFile] = useState<File | null>(null);
  const [error, setError] = useState('');

  const onDrop = useCallback((acceptedFiles: File[]) => {
    if (acceptedFiles.length > 0) {
      const file = acceptedFiles[0];
      if (file.size > 20 * 1024 * 1024) {
        setError('File size should be less than 20MB');
        return;
      }
      setFile(file);
      setError('');
    }
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'application/pdf': ['.pdf'],
      'application/msword': ['.doc'],
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document': ['.docx'],
    },
    maxFiles: 1,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!file) {
      setError('Please select a file');
      return;
    }
    if (!title) {
      setError('Please enter a title');
      return;
    }
    onUpload(file, title, description, materialType, grade);
    setFile(null);
    setTitle('');
    setDescription('');
    setError('');
  };

  return (
    <div className="card">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="title" className="block text-sm font-medium text-gray-700">
            Title
          </label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="input-field"
            required
          />
        </div>

        <div>
          <label htmlFor="description" className="block text-sm font-medium text-gray-700">
            Description
          </label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="input-field"
            rows={3}
          />
        </div>

        <div
          {...getRootProps()}
          className={`border-2 border-dashed rounded-lg p-6 text-center cursor-pointer ${
            isDragActive ? 'border-primary-500 bg-primary-50' : 'border-gray-300'
          }`}
        >
          <input {...getInputProps()} />
          {file ? (
            <div className="text-sm text-gray-600">
              Selected file: {file.name}
            </div>
          ) : isDragActive ? (
            <p className="text-sm text-gray-600">Drop the file here ...</p>
          ) : (
            <p className="text-sm text-gray-600">
              Drag and drop a file here, or click to select a file
            </p>
          )}
        </div>

        {error && (
          <div className="text-red-600 text-sm text-center">{error}</div>
        )}

        <button type="submit" className="btn-primary w-full">
          Upload
        </button>
      </form>
    </div>
  );
} 