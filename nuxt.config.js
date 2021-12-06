module.exports = {
  head: {
    title: 'Refresh',
    content: {},
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: 'Nuxt.js project' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      { rel: 'preconnect', href: "https://fonts.googleapis.com" },
      { rel: 'preconnect', href: "https://fonts.gstatic.com" },
      { rel: 'stylesheet', href: "https://fonts.googleapis.com/css2?family=Noto+Sans:ital,wght@0,400;0,700;1,400;1,700&display=swap"},
      { rel: 'stylesheet', href: "https://cdn.jsdelivr.net/npm/@mdi/font@5.9.55/css/materialdesignicons.min.css"},
    ]
  },
  css: ['~/assets/styles/style.scss'],
  loading: { color: '#3B8070' },
  modules: ["@nuxt/content"],
  router: {
    async extendRoutes(routes, resolve) {
      const {$content} = require('@nuxt/content');
      const { maps } = await $content('maps').fetch();
      maps.forEach(map => {
        routes.push({
          path: '/map/' + map + '/',
          component: resolve(__dirname, 'pages/map/_slug.vue'),
          meta: map
        });
      });
    }
  }
}
