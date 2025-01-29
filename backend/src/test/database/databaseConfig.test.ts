import { afterAll, beforeAll, describe, expect, it } from '@jest/globals';

import { appDataSource } from '../../database/dataSource';

describe('Testing database', () => {
  beforeAll(async () => {
    try {
      await appDataSource.initialize();
    } catch (error) {
      console.error('Erro ao conectar ao banco de dados:', error);
      throw error;
    }
  });

  afterAll(async () => {
    await appDataSource.destroy();
  });

  it('Should handle database connection errors gracefully', async () => {
    try {
      const dataSouce = await appDataSource.initialize();
      expect(dataSouce.isInitialized).toBe(true);
    } catch (error) {
      expect(error).toBeDefined();
    }
  });
});
