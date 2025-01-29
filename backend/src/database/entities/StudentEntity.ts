import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

import { Timestamp } from './extendings/Timestamp';

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
}
