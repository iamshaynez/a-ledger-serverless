//import { getDb } from './database';
//import { runMigrations } from './database/migration';
import { getHandler } from './handlers';
import { parsePath } from './utils';

var main_default = {
  async fetch(request, env) {
    console.log('Request received:', request);
    //const db = await getDb();
    //await runMigrations(db);

    console.log('DB Migrated');

    const path = parsePath(request);
    const handler = getHandler(path);

    if (!handler) {
      return new Response('Not found', { status: 404 });
    }

    return handler(request, db);
  }
};

export {
  main_default as default
};