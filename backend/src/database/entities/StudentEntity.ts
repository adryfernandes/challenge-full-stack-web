import { IsEmail, IsNotEmpty, MinLength } from 'class-validator';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

import { Timestamp } from './extendings/Timestamp';

import { onlyNumbers } from '@/utils';
import { IsCPF } from '@/utils/validators/isDocumentValid';

import type { StudentParams, StudentResponse } from '@/interfaces';

@Entity('Students')
export class StudentEntity {
  @PrimaryGeneratedColumn('uuid')
  uuid: string;

  @Column()
  @MinLength(5, { message: 'O nome deve ter no mínimo 5 caracteres.' })
  @IsNotEmpty({ message: 'O nome do aluno é obrigatório.' })
  name: string;

  @Column({ length: 11 })
  @IsCPF({ message: 'O documento informado está inválido.' })
  @IsNotEmpty({ message: 'O documento do aluno é obrigatório.' })
  document: string;

  @Column()
  @IsEmail(undefined, { message: 'O e-mail fornecido não é válido.' })
  @IsNotEmpty({ message: 'O e-mail do aluno é obrigatório.' })
  email: string;

  @Column()
  @IsNotEmpty({ message: 'O registro do aluno (RA) é obrigatório.' })
  registration: string;

  @Column(() => Timestamp, { prefix: false })
  timestamp: Timestamp;

  constructor({ name, document, email, registration }: StudentParams = {}) {
    this.name = name?.toUpperCase?.().trim?.();
    this.document = onlyNumbers(document);
    this.email = email?.toUpperCase?.().trim?.();
    this.registration = registration?.toUpperCase?.().trim?.();
  }

  toOutput(): StudentResponse {
    return {
      uuid: this.uuid,
      name: this.name,
      document: this.document,
      email: this.email,
      registration: this.registration,
      createdAt: this.timestamp?.createdAt,
      updatedAt: this.timestamp?.updatedAt,
      deletedAt: this.timestamp?.deletedAt,
    };
  }
}
