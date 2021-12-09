<template>
<div class="container">
  <h1>About Refresh!</h1>
  <div class="page_container">
    Lorem, ipsum dolor sit amet consectetur adipisicing elit.
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
  async fetch() {
    const meta = await this.$content('meta').fetch()
    this.contributors = meta.contributors;
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
