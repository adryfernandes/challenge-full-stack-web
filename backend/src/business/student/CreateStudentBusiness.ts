import { StudentEntity } from '@/database/entities';
import { StudentRepository } from '@/database/repositories';
import { EntityValidate } from '@/database/validate/EntityValidate';
import { ValidateError } from '@/errors';

import type { StudentRequest } from '@/interfaces';

export class CreateStudentBusiness {
  constructor(private studentRepository = new StudentRepository()) {}

  async execute(request: StudentRequest): Promise<StudentEntity> {
    const student = new StudentEntity({
      name: request.name,
      document: request.document,
      email: request.email,
      registration: request.registration,
    });

    await this.validateRequest(student);
    await this.validateUniqueInformations(student);

    return this.studentRepository.save(student);
  }

  private async validateRequest(student: StudentEntity): Promise<void> {
    const entityValidate = new EntityValidate(student);
    await entityValidate.validate();

    if (entityValidate.hasError) {
      throw new ValidateError(entityValidate.getMessage(), 'ERRXXX');
    }
  }

  private async validateUniqueInformations({
    document,
    email,
    registration,
  }: StudentEntity): Promise<void> {
    const fieldsToCheck = [
      {
        field: 'document',
        value: document,
        errorMessage: 'O documento informado já está cadastrado.',
      },
      {
        field: 'email',
        value: email,
        errorMessage: 'O e-mail informado já está cadastrado.',
      },
      {
        field: 'registration',
        value: registration,
        errorMessage: 'O registro do aluno informado já está cadastrado.',
      },
    ];

    const validateFields = fieldsToCheck.map(({ field, value, errorMessage }) =>
      this.checkIfFieldExists(field, value, errorMessage)
    );

    await Promise.all(validateFields);
  }

  private async checkIfFieldExists(
    field: string,
    value: string,
    errorMessage: string
  ): Promise<void> {
    const exists = await this.studentRepository.exists({ where: { [field]: value } });

    if (exists) {
      throw new ValidateError(errorMessage, 'ERRXXX');
    }
  }
}
