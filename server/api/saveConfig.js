import { defineEventHandler, readBody } from 'h3';
import db from '../database';

export default defineEventHandler(async (event) => {
  const body = await readBody(event);

  try {
    const stmt = db.prepare('INSERT OR REPLACE INTO configs (configName, config) VALUES (?, ?)');
    const info = stmt.run(body.configName, JSON.stringify(body.config));

    return { message: 'Configuration sauvegardée avec succès!', id: info.lastInsertRowid };
  } catch (error) {
    console.error('Erreur lors de la sauvegarde de la configuration:', error);
    return { message: 'Erreur lors de la sauvegarde de la configuration.' };
  }
});
