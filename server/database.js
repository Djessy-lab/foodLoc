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

db.exec(`
  CREATE TABLE IF NOT EXISTS producers (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    region TEXT,
    department TEXT,
    city TEXT,
    name TEXT,
    url TEXT,
    address TEXT,
    site TEXT,
    email TEXT,
    phone TEXT
  )
`);

db.exec(`
  CREATE TABLE IF NOT EXISTS magic_links (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    token TEXT NOT NULL UNIQUE,
    email TEXT NOT NULL,
    expires_at INTEGER NOT NULL
  )
`);

db.exec(`
  CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    email TEXT NOT NULL UNIQUE
  )
`);

db.exec(`
  CREATE TABLE IF NOT EXISTS configs (
    configName TEXT PRIMARY KEY,
    config TEXT NOT NULL
  )
`);

export default db;
