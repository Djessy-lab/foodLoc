import { defineEventHandler, getQuery } from 'h3';
import db from '../database';

export default defineEventHandler((event) => {
  const { configName } = getQuery(event);

  try {
    const stmt = db.prepare('SELECT config FROM configs WHERE configName = ?');
    const result = stmt.get(configName);

    if (result) {
      return JSON.parse(result.config);
    } else {
      return { error: 'Configuration non trouvée' };
    }
  } catch (error) {
    console.error('Erreur lors de la récupération de la configuration:', error);
    return { error: 'Erreur lors de la récupération de la configuration' };
  }
});
