import db from '../database.js';

export default defineEventHandler(async (event) => {
  try {
    const emails = db.prepare('SELECT * FROM emails').all();
    return emails;
  } catch (error) {
    return sendError(event, createError({ statusCode: 500, statusMessage: 'Erreur lors de l\'export des emails.' }));
  }
});
