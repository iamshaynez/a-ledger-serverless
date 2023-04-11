//import { getDb } from './database';
//import { runMigrations } from './database/migration';
import { getAPIHandler } from './api';
import { parsePath } from './utils';

var main_default = {
  async fetch(request, env) {
    console.log('Request received:', request);

    const path = parsePath(request);

    if (path.startsWith('/api/')) {
      return await getAPIHandler(request, env)
    }

    return new Response('Method not allowed', { status: 405 });
  }
};

export {
  main_default as default
};