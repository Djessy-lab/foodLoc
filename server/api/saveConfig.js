import { defineEventHandler, readBody } from 'h3';
import fs from 'fs';
import path from 'path';

export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  const configPath = path.join(process.cwd(), '/server/config.js');

  try {
    const currentConfig = (await import(configPath)).default;

    currentConfig[body.configName] = { ...body.config };

    const configContent = `export default ${JSON.stringify(currentConfig, null, 2)};`;
    fs.writeFileSync(configPath, configContent);

    return { message: 'Configuration sauvegardée avec succès!' };
  } catch (error) {
    console.error('Erreur lors de la sauvegarde de la configuration:', error);
    return { message: 'Erreur lors de la sauvegarde de la configuration.' };
  }
});
