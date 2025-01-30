import { afterAll, beforeAll } from '@jest/globals';

import { studentMock } from './mocks/studentMock';

import { appDataSource } from '@/database/dataSource';
import { StudentRepository } from '@/database/repositories';

beforeAll(async () => {
  await initializeDatabase();
});

afterAll(async () => {
  await cleanupDatabase();
});

const initializeDatabase = async () => {
  try {
    await appDataSource.initialize();
    await deleteStudent(studentMock.registration);
  } catch (error) {
    console.error('Failed to initialize database:', error);
    throw error;
  }
};

const cleanupDatabase = async () => {
  try {
    await deleteStudent(studentMock.registration);

    if (appDataSource.isInitialized) {
      await appDataSource.destroy();
    }
  } catch (error) {
    console.error('Failed to disconnect from database:', error);
    throw error;
  }
};

const deleteStudent = async (registration: string) => {
  const studentRepository = new StudentRepository();

  try {
    const studentRegistration = await studentRepository.findOne({
      where: { registration },
    });

    if (studentRegistration) {
      await studentRepository.delete(studentRegistration.uuid);
    }
  } catch (error) {
    console.error(`Failed to delete student with registration ${registration}:`, error);
    throw error;
  }
};
