<template>
<div class="container">
  <h1>About Refresh!</h1>
  <div class="page_container">
    <p>"Refresh:" is a series aimed at making maps more suitable for modern standards of TF2. We took the opportunity to use our experience to fix the issues with map geometry as well as minor aesthetic and performance improvements. We humbly invite you to try out these changes and offer your feedback, so that together we are able to increase the quality of the competitive map pool.</p>
  </div>

  <div class="page_title">The Team</div>
  <div class="page_container contributors" ref="contributors">
    <img v-for="contributor in contributors" alt=""
         :src="'https://www.steamsignature.com/status/default/' + contributor + '.png'"/>
  </div>
</div>
</template>

<script>
import { meta } from '~/js/utils';

function shuffleArr (array){
  for (var i = array.length - 1; i > 0; i--) {
    var rand = Math.floor(Math.random() * (i + 1));
    [array[i], array[rand]] = [array[rand], array[i]]
  }
}

export default {
  head() {
    let baseUrl = 'https://refresh-tf.github.io';
    let url = baseUrl + '/website/about'
    let imageUrl =  baseUrl + require('~/assets/refresh.png');
    let title = 'About Refresh'
    let description = 'About the Refresh project'
    return meta(title, description, url, imageUrl);
  },
  data(){
    return {
      contributors: []
    }
  },
  async asyncData({ $content, store, params }) {
    const meta = await $content('meta').fetch();
    const contributors = meta.contributors;
    store.commit('RESET_LAYOUT_BG');
    return { contributors }
  },
  mounted(){
    shuffleArr(this.contributors);
    this.$forceUpdate();
  }

}
</script>

<style lang="scss">
.contributors {
    text-align: center;
}
</style>
