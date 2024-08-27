import Database from 'better-sqlite3';
import { join } from 'path';

const dbPath = process.env.NODE_ENV === 'production'
  ? '/tmp/emails.db'
  : join(process.cwd(), 'emails.db');

const db = new Database(dbPath, { verbose: console.log });

db.exec(`
  CREATE TABLE IF NOT EXISTS emails (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    email TEXT NOT NULL UNIQUE,
    created_at TEXT NOT NULL
  )
`);

export default db;
