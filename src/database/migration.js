export async function runMigrations(db) {
    await db.migrate({ force: 'last', migrationsPath: './src/database/migrations' });
  }