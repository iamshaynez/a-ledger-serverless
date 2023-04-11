import { getDb } from './database';
import { runMigrations } from './database/migration';
import { getHandler } from './handlers';
import { parsePath } from './utils';

addEventListener('fetch', (event) => {
  event.respondWith(handleRequest(event.request));
});

async function handleRequest(request) {
  const db = await getDb();
  await runMigrations(db);

  const path = parsePath(request);
  const handler = getHandler(path);

  if (!handler) {
    return new Response('Not found', { status: 404 });
  }

  return handler(request, db);
}