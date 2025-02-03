import { HttpStatusCode } from 'axios';
import { Body, Example, OperationId, Post, Response, Route, SuccessResponse, Tags } from 'tsoa';

import { StudentEntity } from '@/database/entities';
import { StudentRepository } from '@/database/repositories';
import { EntityValidate } from '@/database/validate/EntityValidate';
import type { ExceptionError, NotFoundError } from '@/errors';
import { ValidateError } from '@/errors';
import { studentExample } from '@/swagger/studentExample';

import type { StudentRequest, StudentResponse } from '@/interfaces';

@Route('student')
export class CreateStudentBusiness {
  constructor(private studentRepository = new StudentRepository()) {}

  @Post('create')
  @Tags('Estudante')
  @OperationId('createStudent')
  @Example<StudentResponse>(studentExample)
  @SuccessResponse(HttpStatusCode.Created, 'Created')
  @Response<ValidateError>(HttpStatusCode.BadRequest, 'Bad Request')
  @Response<NotFoundError>(HttpStatusCode.NotFound, 'Not Found')
  @Response<ExceptionError>(HttpStatusCode.InternalServerError, 'Internal Server Error')
  async execute(@Body() request: StudentRequest): Promise<StudentResponse> {
    const student = new StudentEntity({
      name: request.name,
      document: request.document,
      email: request.email,
      registration: request.registration,
    });

    await this.validateRequest(student);
    await this.validateUniqueInformations(student);

    const savedStudent = await this.studentRepository.save(student);
    return savedStudent.toOutput();
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

export default new CreateStudentBusiness();
