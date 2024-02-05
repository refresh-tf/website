<script setup>
const baseurl = '/';
const description = 'The Refresh project' ;

useHead({
  htmlAttrs: {
    lang: 'en',
  },
  charset: 'utf-8',
  title: 'Refresh',
  meta: [
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
    { rel: 'stylesheet', href: "https://fonts.googleapis.com/css2?family=Noto+Sans:ital,wght@0,400;0,700;1,400;1,700&display=swap"},
  ],
});

//const background = null;
const maps = [];

const background = '/images/background.jpg';
/*
import "~/assets/font/refresh-icons.css";
import navigation from '../components/navigation.vue';
export default {
  components: {
    navigation: navigation,
  },
  computed: {
    background() {
      return '';
      //return $store.state.backgroundImg;
    }
  }
}*/

</script>

<template>
  <div>
    <div id="background">
      <img :src="background"/>
    </div>
    <div id="core">
      <navigation></navigation>
      <NuxtPage />
      <div class="content">
      </div>
    </div>
  </div>
</template>

<style lang="scss">
  body {
    margin: 0;
    padding: 0;
    font-family: "Noto Sans", sans-serif;
    color: #999;
}

#background {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 0;
    background-color: #131313;

    &:after {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-image: linear-gradient(0deg, black, #0002);
    }
    img {
        width: 100%;
        height: 100%;
        object-fit: cover;
    }
}

#core {
    position: absolute;
    z-index: 1;
    width: 100%;
    padding: 90px 0;
}
</style>
