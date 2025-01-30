import { describe, it } from '@jest/globals';

import { studentMock } from '../mocks/studentMock';

import { StudentEntity } from '@/database/entities';
import { StudentRepository } from '@/database/repositories';

describe('Testing db student entity', () => {
  it('Entity instantiation', () => {
    const student = new StudentEntity(studentMock);
    expect(student).toEqual(expect.objectContaining(student));
  });

  it('Save entity', async () => {
    const student = new StudentEntity(studentMock);
    const studentRepository = new StudentRepository();
    const studentSaved = await studentRepository.save(student);

    expect(studentSaved).toEqual(
      expect.objectContaining({
        uuid: expect.any(String),
        ...student,
        timestamp: expect.objectContaining({
          createdAt: expect.any(Date),
          updatedAt: expect.any(Date),
          deletedAt: null,
        }),
      })
    );

    await studentRepository.delete(studentSaved.uuid);
  });
});
