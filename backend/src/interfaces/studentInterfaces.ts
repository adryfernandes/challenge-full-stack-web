export interface StudentRequest {
  name: string;
  document: string;
  email: string;
  registration: string;
}

export type StudentParams = Partial<StudentRequest>;
