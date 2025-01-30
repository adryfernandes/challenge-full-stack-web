import { describe, expect, it } from '@jest/globals';

import { appDataSource } from '@/database/dataSource';

describe('Testing database', () => {
  it('Should have an active database connection', async () => {
    expect(appDataSource.isInitialized).toBe(true);
  });
});
