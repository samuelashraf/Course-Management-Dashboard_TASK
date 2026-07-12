
  export enum CourseStatus {
  Active = 'Active',
  Draft = 'Draft',
  Archived = 'Archived'
}

export enum CourseCategory {
  Frontend = 'Frontend',
  Backend = 'Backend',
  Design = 'Design',
  DevOps = 'DevOps',
  Database = 'Database'
}

export interface Course {
  id: number;
  courseName: string;
  instructorName: string;
  category: CourseCategory;
  duration: number;
  price: number;
  status: CourseStatus;
  description?: string;
  createdDate: string;
}