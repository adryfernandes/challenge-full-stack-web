import { afterAll, beforeAll } from '@jest/globals';

import { studentMock } from './mocks/studentMock';

import { appDataSource } from '@/database/dataSource';
import { StudentRepository } from '@/database/repositories';

beforeAll(async () => {
  try {
    await appDataSource.initialize();

    const studentRepository = new StudentRepository();
    const studentRegistration = await studentRepository.findOne({
      where: { registration: studentMock.registration },
    });

    if (studentRegistration) {
      await studentRepository.delete(studentRegistration.uuid);
    }
  } catch (error) {
    console.error('Failed to initialize database:', error);
    throw error;
  }
});

afterAll(async () => {
  try {
    if (appDataSource.isInitialized) {
      await appDataSource.destroy();
    }
  } catch (error) {
    console.error('Failed to desconect database:', error);
    throw error;
  }
});
