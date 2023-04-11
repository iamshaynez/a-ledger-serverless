import { open } from 'sqlite';
import { Database } from 'sqlite3';

export async function getDb() {
  return open({
    filename: ':memory:',
    driver: Database,
  });
}