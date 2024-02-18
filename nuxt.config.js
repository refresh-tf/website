const baseurl = '/';

const MiniCssExtractPlugin = require('mini-css-extract-plugin');

export default defineNuxtConfig({
  head: {
    htmlAttrs: { lang: 'en' },
    content: {},
    title: 'Refresh',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: 'The Refresh project' },
      { name: "msapplication-TileColor", content: "#da532c"},
      { name: "theme-color", content: "#ffffff" }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: baseurl + 'favicon.ico' },
      { rel: 'icon', type: 'image/png', sizes: '16x16', href: baseurl + 'favicon-16x16.png' },
      { rel: 'icon', type: 'image/png', sizes: '32x32', href: baseurl + 'favicon-32x32.png' },
      { rel: 'apple-touch-icon', sizes: '180x180', href: baseurl + 'apple-touch-icon.png' },
      { rel: "manifest", href: baseurl + 'site.webmanifest' },
      { rel: "mask-icon", href: baseurl + 'safari-pinned-tab.svg', color: '#5bbad5' },

      { rel: 'preconnect', href: "https://fonts.googleapis.com" },
      { rel: 'preconnect', href: "https://fonts.gstatic.com" },
      { rel: 'stylesheet',
        href: "https://fonts.googleapis.com/css2?family=Noto+Sans:ital,wght@0,400;0,700;1,400;1,700&display=swap"},
    ]
  },
  modules: ["@nuxt/content"],
  css: ['/styles/style.scss', '/public/font/refresh-icons.css'],
  loading: { color: '#3B8070' },
  watchers: {
    webpack: {
      ignored: [/node_modules/],
    }
  },
  target: 'static',
  builder: 'webpack',
  hooks: {
    'webpack:config': (configs) => {
      configs.forEach((config) =>{
        config.module.rules.push({
          test: /\.font\.js/,
          use: [
            MiniCssExtractPlugin.loader,
            {
              loader: 'css-loader',
              options: {
                url: false
              }
            },
            'webfonts-loader'
          ]
        })
      });
    }
  }
})
