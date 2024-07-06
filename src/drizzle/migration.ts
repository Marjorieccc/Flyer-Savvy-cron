// This file handles running database migrations using Drizzle ORM and logs the results.

import { migrate } from 'drizzle-orm/mysql2/migrator';
import { db, connection } from '../db/db';
import Logging from '../../logging/logging';

async function drizzleMigration() {
  try {
    await migrate(db, { migrationsFolder: './src/drizzle/migrations' });
    Logging.info('Migrations applied successfully');
  } catch (error) {
    Logging.error(error);
  } finally {
    await connection.end();
  }
}

drizzleMigration();

