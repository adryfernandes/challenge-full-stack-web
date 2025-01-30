import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

import { Timestamp } from './extendings/Timestamp';

import { onlyNumbers } from '@/utils';

import type { StudentParams } from '@/interfaces';

@Entity('Students')
export class StudentEntity {
  @PrimaryGeneratedColumn('uuid')
  uuid: string;

  @Column()
  name: string;

  @Column()
  email: string;

  @Column({ length: 11 })
  document: string;

  @Column()
  registration: string;

  @Column(() => Timestamp, { prefix: false })
  timestamp: Timestamp;

  constructor({ name, document, email, registration }: StudentParams = {}) {
    this.name = name?.toUpperCase?.().trim?.();
    this.document = onlyNumbers(document);
    this.email = email?.toUpperCase?.().trim?.();
    this.registration = registration?.toUpperCase?.().trim?.();
  }
}
