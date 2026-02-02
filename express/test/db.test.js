const { Pool } = require('pg');

describe('Database Connection', () => {
  let pool;

  beforeAll(() => {
    // This pool configuration should ideally come from a test-specific config
    // For now, we'll use a placeholder that will likely fail if a database isn't running
    pool = new Pool({
      user: 'testuser',
      host: 'localhost',
      database: 'testdb',
      password: 'testpassword',
      port: 5432,
    });
  });

  afterAll(async () => {
    await pool.end();
  });

  test('should fail to connect to a non-existent database', async () => {
    // Expecting the connection to fail, thus it's a failing test in the Red phase
    await expect(pool.connect()).rejects.toThrow();
  });
});