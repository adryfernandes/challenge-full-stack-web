import type {
  DeepPartial,
  EntityTarget,
  FindManyOptions,
  FindOneOptions,
  Repository,
  UpdateResult,
} from 'typeorm';
import type { QueryDeepPartialEntity } from 'typeorm/query-builder/QueryPartialEntity';

import { appDataSource } from '../dataSource';

export class BaseRepository<Entity> {
  public readonly repository: Repository<Entity> = null;

  constructor(private entityClass: EntityTarget<Entity>) {
    this.repository = appDataSource.getRepository(this.entityClass);
  }

  async findByUUID(uuid: string, options?: FindOneOptions<Entity>): Promise<Entity> {
    if (!uuid) {
      return null;
    }

    options = { where: {}, ...options };

    options.where['uuid'] = uuid;

    return await this.repository.findOne(options);
  }

  async find(options?: FindManyOptions<Entity>): Promise<Entity[]> {
    return await this.repository.find(options);
  }

  async findOne(options: FindOneOptions<Entity>): Promise<Entity> {
    return await this.repository.findOne(options);
  }

  async exists(options?: FindManyOptions<Entity>): Promise<boolean> {
    return await this.repository.exists(options);
  }

  async save(entity: DeepPartial<Entity>): Promise<Entity> {
    return await this.repository.save(entity);
  }

  async update(
    fieldsChange: string | string[],
    entity: QueryDeepPartialEntity<Entity>
  ): Promise<UpdateResult> {
    return await this.repository.update(fieldsChange, entity);
  }

  async delete(uuidEntity: string): Promise<void> {
    await this.repository.delete(uuidEntity);
  }
}
