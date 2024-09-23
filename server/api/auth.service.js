import nodemailer from 'nodemailer';
import crypto from 'crypto';
import db from '../database';

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

const generateToken = () => {
  return crypto.randomBytes(32).toString('hex');
};

export const sendMagicLink = async (email) => {
  const token = generateToken();
  const link = `${process.env.BASE_URL}/verify?token=${token}&email=${email}`;

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: email,
    subject: 'Votre lien magique',
    text: `Cliquez sur ce lien pour vous connecter : ${link}`,
  };

  await transporter.sendMail(mailOptions);

  const expirationTime = Date.now() + 15 * 60 * 1000;
  db.prepare('INSERT INTO magic_links (token, email, expires_at) VALUES (?, ?, ?)').run(token, email, expirationTime);

  return token;
};
