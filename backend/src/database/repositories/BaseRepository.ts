import type {
  FindOptionsOrder,
  FindOptionsRelations,
  FindOptionsSelect,
  FindOptionsWhere,
} from 'typeorm';

import { appDataSource } from '../dataSource';

export class BaseRepository<Entity> {
  public readonly repository = null;

  constructor(private entityClass) {
    this.repository = appDataSource.getRepository(this.entityClass);
  }

  async save(entity: Partial<Entity>): Promise<Entity> {
    return await this.repository.save(entity);
  }

  async findByUUID(
    uuid: string,
    relations?: FindOptionsRelations<Entity>,
    select?: FindOptionsSelect<Entity>
  ): Promise<Entity> {
    return await this.repository.findOne({
      where: { uuid },
      relations,
      select,
    });
  }

  async find(
    where?: FindOptionsWhere<Entity>,
    relations?: FindOptionsRelations<Entity>
  ): Promise<Entity[]> {
    return await this.repository.find({
      where,
      relations,
    });
  }

  async findOne(
    where?: FindOptionsWhere<Entity> | FindOptionsWhere<Entity>[],
    relations?: FindOptionsRelations<Entity>,
    order?: FindOptionsOrder<Entity>,
    select?: FindOptionsSelect<Entity>
  ): Promise<Entity> {
    return await this.repository.findOne({
      select,
      where,
      relations,
      order,
    });
  }

  async list(
    where?: FindOptionsWhere<Entity>,
    relations?: FindOptionsRelations<Entity>
  ): Promise<Entity[]> {
    return await this.repository.find({ where, relations });
  }

  async delete(uuidEntity: string): Promise<void> {
    await this.repository.delete(uuidEntity);
  }
}
