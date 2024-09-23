import { defineEventHandler, getQuery } from "h3";
import db from "../../database";

export default defineEventHandler(async (event) => {
  const { token, email } = getQuery(event);

  const result = db
    .prepare("SELECT * FROM magic_links WHERE token = ? AND email = ?")
    .get(token, email);

  if (!result) {
    return { status: 401, message: "Token invalide ou expiré." };
  }

  if (Date.now() > result.expires_at) {
    return { status: 401, message: "Token expiré." };
  }

  db.prepare("DELETE FROM magic_links WHERE token = ?").run(token);

  const user = db.prepare("SELECT * FROM users WHERE email = ?").get(email);

  if (user) {
    return {
      status: 200,
      message: "Utilisateur authentifié.",
      email: user.email,
    };
  } else {
    return { status: 404, message: "Utilisateur non trouvé." };
  }
});
