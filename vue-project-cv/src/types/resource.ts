export enum CategoryType {
  JOB = 'Job',
  EDUCATION = 'Education',
  COURSE = 'Course',
}

export interface Resource {
  id: number;
  name: string;
  category: CategoryType;
  description?: string;
  link?: string;
  fromdate?: Date;
  todate?: Date;
}