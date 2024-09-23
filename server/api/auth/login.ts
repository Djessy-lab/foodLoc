import { defineEventHandler, readBody } from 'h3';
import { sendMagicLink } from '../auth.service';
import db from '../../database';
import jwt from 'jsonwebtoken';

export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  const { email } = body;

  if (!email) {
    return { status: 400, message: 'L\'email est requis.' };
  }

  if (!process.env.JWT_SECRET) {
    throw new Error('JWT_SECRET est requis.');
  }

  try {
    await sendMagicLink(email);

    const stmt = db.prepare('INSERT INTO users (email) VALUES (?) ON CONFLICT(email) DO NOTHING');
    stmt.run(email);

    const token = jwt.sign({ email }, process.env.JWT_SECRET, { expiresIn: '1h' });

    return { status: 200, message: 'Lien magique envoyé.', token };
  } catch (error) {
    console.error('Erreur lors de l\'envoi du lien magique:', error);
    return { status: 500, message: 'Erreur lors de l\'envoi du lien magique.' };
  }
});
