export default defineNuxtConfig({
  ssr: true,
  modules: ['@nuxtjs/tailwindcss'],
  plugins: ['~/plugins/apollo-client.js'],
  css: ['@/assets/css/base.css'],
  app: {
    head: {
      title: 'Tium Recipes',
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { hid: 'description', name: 'description', content: 'Delicious food recipes' },
      ],
    },
  },
  nitro: {
    preset: 'netlify', // Add this line for Netlify SSR support
  },
});