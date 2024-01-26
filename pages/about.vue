<template>
<div class="container">
  <h1>About Refresh!</h1>
  <div class="page_container">
    <img class="aside" src="~/public/refresh-logo.png"/>

    <p>"Refresh" is a series aimed at making maps more suitable for modern standards of TF2. We took the opportunity to use our experience to fix the issues with map geometry as well as minor aesthetic and performance improvements. We humbly invite you to try out these changes and offer your feedback, so that together we are able to increase the quality of the competitive map pool.</p>
  </div>

  <div class="page_title">The Team</div>
  <div class="page_container contributors" ref="creditsTeam">
    <profile :steamid="sid" v-for="sid in shuffledCreditsTeam" :key="sid"></profile>
  </div>
  <div class="page_title">Website Contributors</div>
  <div class="page_container contributors" ref="CreditsSite">
    <profile :steamid="sid" v-for="sid in shuffledCreditsSite" :key="sid"></profile>
  </div>
</div>
</template>

<script setup>
//import { meta } from '~/utils/utils';

function shuffleArr (array){
  var shuffled = [].concat(array);
  shuffled.sort(function(){
    return 0.5 - Math.random();
  });
 return shuffled;
}
const meta = await queryContent('meta').findOne();

const creditsTeam = [];
const creditsSite = [];

for (const [key, value] of Object.entries(meta["credits"])){
  if (value.role == 'team'){ creditsTeam.push(key) }
  if (value.role == 'site'){ creditsSite.push(key) }
}

const shuffledCreditsTeam = creditsTeam;
const shuffledCreditsSite = creditsSite;

/*export default {
  head() {
    let baseUrl = 'https://refresh.tf';
    let url = baseUrl + '/about'
    let imageUrl =  baseUrl + require('~/assets/opengraph.jpeg');
    let title = 'About Refresh'
    let description = 'About the Refresh project'
    return meta(title, description, url, imageUrl);
  },

  store.commit('RESET_LAYOUT_BG');

  mounted(){
    this.shuffledCreditsTeam = shuffleArr(this.creditsTeam);
    this.shuffledCreditsSite = shuffleArr(this.creditsSite);
    this.$forceUpdate();
  }
}
*/

</script>

<style lang="scss">

.contributors {
    text-align: center;
    >* {
        display: inline-flex;
        min-width: calc(33% - 18px);
        max-width: calc(33% - 18px);
        margin: 3px;
    }
}

.aside {
    float: left;
    max-width: 8rem;
    height: auto;
    margin-right: 20px;
}

@media only screen and (max-width: 600px) {
    .aside {
        float: none;
        display: block;
        margin: auto;
        max-width: 4rem;
    }
    .contributors {
        >* {
            display: block;
            min-width: unset;
            max-width: unset;
        }
    }
}

</style>
