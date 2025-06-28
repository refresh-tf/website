<script setup>

import './fonts/refresh-icons.font.js';

import { useBackground } from './state';

const background = useBackground();

useHead({
  htmlAttrs: {
    lang: 'en',
    dir: 'ltr',
  },
});


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
