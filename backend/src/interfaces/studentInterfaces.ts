/**
 * @example {
 *  "name": "ANA LUIZA SILVA",
 *  "document": "72983030407",
 *  "email": "ANA_123@EMAIL.COM",
 *  "registration": "123455"
 * }
 */
export interface StudentRequest {
  name: string;
  document: string;
  email: string;
  registration: string;
}

export type StudentParams = Partial<StudentRequest>;

export interface StudentResponse {
  uuid: string;
  name: string;
  document: string;
  email: string;
  registration: string;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date;
}
