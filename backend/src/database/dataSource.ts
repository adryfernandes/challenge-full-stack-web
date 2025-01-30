import 'reflect-metadata';

import type { DataSourceOptions } from 'typeorm';
import { DataSource } from 'typeorm';

const options: DataSourceOptions = {
  type: 'sqlite',
  database: ':memory:',
  entities: [`${__dirname}/**/entities/*.{ts,js}`],
  synchronize: true,
  logging: false,
};

export const appDataSource: DataSource = new DataSource(options);
