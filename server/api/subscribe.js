import nodemailer from 'nodemailer';
import db from '../database.js';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc.js';
import timezone from 'dayjs/plugin/timezone.js';

dayjs.extend(utc);
dayjs.extend(timezone);

export default defineEventHandler(async (event) => {
  if (event.req.method === 'POST') {
    const body = await readBody(event);
    const { email } = body;

    if (!email) {
      return sendError(event, createError({ statusCode: 400, statusMessage: "L'adresse email est requise." }));
    }

    const emailExists = db.prepare('SELECT COUNT(*) AS count FROM emails WHERE email = ?').get(email).count > 0;

    if (emailExists) {
      return { message: "Vous êtes déjà inscrit avec cet email." };
    }

    const localTimestamp = dayjs().tz('Europe/Paris').format('YYYY-MM-DD HH:mm:ss');

    try {
      const stmt = db.prepare('INSERT INTO emails (email, created_at) VALUES (?, ?)');
      stmt.run(email, localTimestamp);
    } catch (error) {
      return sendError(event, createError({ statusCode: 500, statusMessage: "Erreur lors de l'enregistrement de l'email." }));
    }

    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: 'Merci de vous être inscrit !',
      text: 'Merci pour votre inscription à notre liste de diffusion.',
    };

    try {
      const info = await transporter.sendMail(mailOptions);
      console.log('Email envoyé: ' + info.response);

      return { message: 'Email envoyé avec succès!' };
    } catch (error) {
      console.error("Erreur lors de l'envoi de l'email:", error);
      return sendError(event, createError({ statusCode: 500, statusMessage: "Erreur lors de l'envoi de l'email." }));
    }
  } else {
    return sendError(event, createError({ statusCode: 405, statusMessage: 'Méthode non autorisée' }));
  }
});
