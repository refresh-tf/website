<template>
<div class="container">
  <h1>About Refresh!</h1>
  <div class="page_container">
    <img class="aside" src="~/assets/refresh-logo.png"/>
    <p>"Refresh:" is a series aimed at making maps more suitable for modern standards of TF2. We took the opportunity to use our experience to fix the issues with map geometry as well as minor aesthetic and performance improvements. We humbly invite you to try out these changes and offer your feedback, so that together we are able to increase the quality of the competitive map pool.</p>
  </div>

  <div class="page_title">The Team</div>
  <div class="page_container contributors" ref="creditsTeam">
    <a v-for="contributor in creditsTeam" target="_blank"
       :href="'http://steamcommunity.com/profiles/' + contributor">
      <img alt="" :src="'https://www.steamsignature.com/status/default/' + contributor + '.png'"/>
    </a>
  </div>
  <div class="page_title">Website Contributors</div>
  <div class="page_container contributors" ref="creditsSite">
    <a v-for="contributor in creditsSite"
       :href="'http://steamcommunity.com/profiles/' + contributor">
      <img alt="" :src="'https://www.steamsignature.com/status/default/' + contributor + '.png'"/>
    </a>
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
    let baseUrl = 'https://refresh.tf';
    let url = baseUrl + '/about'
    let imageUrl =  baseUrl + require('~/assets/opengraph.jpeg');
    let title = 'About Refresh'
    let description = 'About the Refresh project'
    return meta(title, description, url, imageUrl);
  },
  data(){
    return {
      creditsTeam: [],
      creditsSite: []
    }
  },
  async asyncData({ $content, store, params }) {
    const meta = await $content('meta').fetch();
    const creditsTeam = meta["credits-team"];
    const creditsSite = meta["credits-site"];
    store.commit('RESET_LAYOUT_BG');
    return { creditsTeam, creditsSite }
  },
  mounted(){
    shuffleArr(this.creditsTeam);
    shuffleArr(this.creditsSite);
    this.$forceUpdate();
  }

}
</script>

<style lang="scss">
.contributors {
    text-align: center;
    >* {
        margin: 5px 2.5px;
    }
}
.aside {
    float: left;
    max-width: 150px;
    height: auto;
    margin-right: 20px;
}

</style>
