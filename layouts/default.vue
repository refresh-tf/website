<template>
<div>
  <div id="background"></div>
  <div id="core">
    <navigation></navigation>
    <div class="content">
      <nuxt/>
    </div>
  </div>
</div>
</template>

<script>
import navigation from '../components/navigation.vue';
export default {
  components: {
    navigation: navigation,
  }
}
</script>


<style>
body {
    margin: 0;
    padding: 0;
    font-family: "Noto Sans", sans-serif;
    color: #999;
}

#background {
    position: fixed;
    z-index: 0;
    width: 100%;
    height: 100vh;

    background-color: #131313;
    background-size: cover;
    background-position: center top;
    background-repeat: no-repeat;
    background-image: linear-gradient(0deg, black, #0002), url('/website/_nuxt/assets/images/cp_process.jpeg');
}

#core {
    position: absolute;
    z-index: 1;
    width: 100%;
    padding: 90px 0;
}


</style>
