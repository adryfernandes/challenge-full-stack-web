import { describe } from '@jest/globals';

import { studentMock } from '../mocks/studentMock';

import { CreateStudentBusiness } from '@/business/student/CreateStudentBusiness';
import { StudentEntity } from '@/database/entities';
import { StudentRepository } from '@/database/repositories';

describe('Testing CreateStudentBusiness', () => {
  const fieldsToTest = [
    { field: 'name', message: 'O nome do aluno é obrigatório.' },
    { field: 'document', message: 'O documento do aluno é obrigatório.' },
    { field: 'registration', message: 'O registro do aluno (RA) é obrigatório.' },
    { field: 'email', message: 'O e-mail do aluno é obrigatório.' },
  ];

  fieldsToTest.forEach(({ field, message }) => {
    it(`should throw an error if ${field} is null`, async () => {
      const request = { ...studentMock };

      request[field] = null;

      await expect(new CreateStudentBusiness().execute(request)).rejects.toThrow(message);
    });
  });

  it(`should throw an error if document is not valid`, async () => {
    const request = { ...studentMock, document: '12345678912' };

    await expect(new CreateStudentBusiness().execute(request)).rejects.toThrow(
      'O documento informado está inválido.'
    );
  });

  it(`should throw an error if document is duplicated`, async () => {
    const repository = new StudentRepository();
    repository.exists = jest.fn().mockResolvedValueOnce(true);

    await expect(new CreateStudentBusiness(repository).execute(studentMock)).rejects.toThrow(
      'O documento informado já está cadastrado.'
    );
  });

  it(`should throw an error if email is duplicated`, async () => {
    const repository = new StudentRepository();
    repository.exists = jest.fn().mockResolvedValueOnce(false).mockResolvedValueOnce(true);

    await expect(new CreateStudentBusiness(repository).execute(studentMock)).rejects.toThrow(
      'O e-mail informado já está cadastrado.'
    );
  });

  it(`should throw an error if registration is duplicated`, async () => {
    const repository = new StudentRepository();
    repository.exists = jest
      .fn()
      .mockResolvedValueOnce(false)
      .mockResolvedValueOnce(false)
      .mockResolvedValueOnce(true);

    await expect(new CreateStudentBusiness(repository).execute(studentMock)).rejects.toThrow(
      'O registro do aluno informado já está cadastrado.'
    );
  });

  it('save student', async () => {
    const studentSaved = await new CreateStudentBusiness().execute(studentMock);

    const student = new StudentEntity(studentMock);
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
  });
});
