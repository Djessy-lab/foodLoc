import Database from 'better-sqlite3';
import { writeFileSync } from 'fs';
import path from 'path';

const db = new Database('./emails.db');

const producers = db.prepare('SELECT * FROM producers').all();

const outputPath = path.join(process.cwd(), 'static', 'producers.json');

writeFileSync(outputPath, JSON.stringify(producers, null, 2));

console.log(`Les données ont été exportées vers ${outputPath}`);
