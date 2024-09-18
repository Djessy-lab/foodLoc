import { Magic } from 'magic-sdk';

export default defineNuxtPlugin((nuxtApp) => {
  const config = useRuntimeConfig();

  if (process.client) {
    const magic = new Magic(config.public.magicApiKey);
    nuxtApp.provide('magic', magic);
  }
});
