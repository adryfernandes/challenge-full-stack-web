import { describe } from '@jest/globals';

import { CreateStudentBusiness } from '@/business/student/CreateStudentBusiness';

describe('Testing CreateStudentBusiness', () => {
  it('Return the registered student', async () => {
    await new CreateStudentBusiness().execute();
  });
});
