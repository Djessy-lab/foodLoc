import nodemailer from 'nodemailer';

export default defineEventHandler(async (event) => {
  if (event.req.method === 'POST') {
    const body = await readBody(event);
    const { email } = body;

    if (!email) {
      return sendError(event, createError({ statusCode: 400, statusMessage: 'L\'adresse email est requise.' }));
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
      console.error('Erreur lors de l\'envoi de l\'email:', error);
      return sendError(event, createError({ statusCode: 500, statusMessage: 'Erreur lors de l\'envoi de l\'email.' }));
    }
  } else {
    return sendError(event, createError({ statusCode: 405, statusMessage: 'Méthode non autorisée' }));
  }
});
