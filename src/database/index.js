// import { open } from 'sqlite';
// import { Database } from 'sqlite3';

// export async function getDb() {
//   return open({
//     filename: ':memory:',
//     driver: Database,
//   });
// }

import {accountService} from './account'

export async function getDBService(name) {
    switch (name) {
        case 'account':
          return handleAccount;
        default:
          return null;
      }
}