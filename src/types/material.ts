export type MaterialType = 'study_material' | 'assignment';

export interface Material {
  id: string;
  title: string;
  description: string;
  file_url: string;
  file_type: string;
  file_size: number;
  uploaded_by: string;
  material_type: MaterialType;
  grade?: string;
  student_id?: string;
  created_at: string;
  updated_at: string;
}

export interface MaterialUpload {
  file: File;
  title: string;
  description: string;
  material_type: MaterialType;
  grade?: string;
  student_id?: string;
} 