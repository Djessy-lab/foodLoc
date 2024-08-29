import { defineEventHandler } from 'h3';
import db from '../database';

export default defineEventHandler(async (event) => {
  try {
    const stmt = db.prepare('SELECT * FROM producers');
    const producers = stmt.all();

    if (!producers || producers.length === 0) {
      return { statusCode: 404, body: { error: 'Aucun producteur trouvé' } };
    }

    return { statusCode: 200, body: producers };
  } catch (error) {
    console.error('Erreur lors de la récupération des producteurs:', error);
    return { statusCode: 500, body: { error: 'Erreur lors de la récupération des producteurs' } };
  }
});
