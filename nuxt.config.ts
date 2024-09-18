// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2024-04-03",
  devtools: { enabled: true },
  modules: [
    "@nuxtjs/tailwindcss",
    "@nuxtjs/color-mode",
    "nuxt-lucide-icons",
    "@nuxt/icon",
  ],
  runtimeConfig: {
    public: {
      magicApiKey: process.env.MAGIC_LINK_PUBLIC_KEY, 
    },
  },
  tailwindcss: {
    config: {
      theme: {
        extend: {
          fontFamily: {
            amsterdam: ["New Amsterdam", "sans-serif"],
          },
        },
      },
    },
  },
  app: {
    head: {
      link: [
        {
          rel: "stylesheet",
          href: "https://fonts.googleapis.com/css2?family=New+Amsterdam&display=swap",
        },
      ],
    },
  },
});
