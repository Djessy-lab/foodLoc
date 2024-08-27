import Database from 'better-sqlite3';

const db = new Database('emails.db', { verbose: console.log });

db.exec(`
  CREATE TABLE IF NOT EXISTS emails (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    email TEXT NOT NULL UNIQUE,
    created_at TEXT NOT NULL
  )
`);

export default db;
