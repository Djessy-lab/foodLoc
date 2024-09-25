import { defineEventHandler, getHeader } from "h3";
import db from "../../database";

export default defineEventHandler(async (event) => {
  const token = getHeader(event, "authorization")?.split(" ")[1];

  if (!token) {
    return { status: 401, message: "Utilisateur non authentifié." };
  }

  try {
    db.prepare("DELETE FROM magic_links WHERE token = ?").run(token);

    return { status: 200, message: "Déconnexion réussie." };
  } catch (error) {
    console.error("Erreur lors de la déconnexion:", error);
    return { status: 500, message: "Erreur lors de la déconnexion." };
  }
});
