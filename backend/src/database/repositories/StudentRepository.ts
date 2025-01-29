import { StudentEntity } from '../entities/StudentEntity';

import { BaseRepository } from './BaseRepository';

export class StudentRepository extends BaseRepository<StudentEntity> {
  constructor() {
    super(StudentEntity);
  }
}
