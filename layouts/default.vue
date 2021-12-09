<template>
<div>
  <div id="background">
    <img :src="background"/>
  </div>
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
  },
  computed: {
    background() {
      return this.$store.state.backgroundImg;
    }
  }
}
</script>


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
