<template>
<div class="container">
  <div class="page_title">About Refresh!</div>
  <div class="page_container">Lorem, ipsum dolor sit amet consectetur adipisicing elit.</div>

  <div class="page_title">The Team</div>
  <div class="page_container profiles">
    <img
      v-for="contributor in contributors"
      :src="'https://www.steamsignature.com/status/default/' + contributor + '.png'" alt=""/>
  </div>
</div>
</template>

<script>
import { meta } from '~/js/utils';
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

}
</script>

<style lang="scss">
.profiles {
    text-align: center;
}
</style>
