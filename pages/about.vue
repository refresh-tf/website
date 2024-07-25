<template>
<div class="container">
  <h1>About Refresh!</h1>
  <div class="page_container">
    <img class="aside" src="/refresh-logo.png"/>

    <p>"Refresh" is a series aimed at making maps more suitable for modern standards of TF2. We took the opportunity to use our experience to fix the issues with map geometry as well as minor aesthetic and performance improvements. We humbly invite you to try out these changes and offer your feedback, so that together we are able to increase the quality of the competitive map pool.</p>
  </div>

  <div class="page_title">The Team</div>
  <div class="page_container contributors" ref="creditsTeam">
    <client-only><profile :profile="contributor" v-for="contributor in shuffledCreditsTeam"
                          :key="contributor.id"></profile></client-only>
  </div>
  <div class="page_title">Website Contributors</div>
  <div class="page_container contributors" ref="CreditsSite">
    <client-only><profile :profile="contributor" v-for="contributor in shuffledCreditsSite"
                          :key="contributor.id"></profile></client-only>
  </div>
</div>
</template>

<script setup>
import { onBeforeMount } from 'vue';
import { metaFactory } from '../utils/utils';

function shuffleArr (array){
  var shuffled = [].concat(array);
  shuffled.sort(function(){
    return 0.5 - Math.random();
  });
  return shuffled;
}

const credits = await queryContent('meta').only('credits').findOne();

const creditsTeam = [];
const creditsSite = [];

for (const [key, value] of Object.entries(credits.credits)){
  if (value.role == 'team'){ creditsTeam.push(key) }
  if (value.role == 'site'){ creditsSite.push(key) }
}

let shuffledCreditsTeam = [];
let shuffledCreditsSite = [];

onBeforeMount(() => {
  shuffledCreditsTeam = shuffleArr(creditsTeam.map((profileId) =>
    Object.assign({id: profileId}, credits.credits[profileId])));
  shuffledCreditsSite = shuffleArr(creditsSite.map((profileId) =>
    Object.assign({id: profileId}, credits.credits[profileId])));
});

let makeMeta = () => {
  let baseUrl = 'https://refresh.tf';
  let url = baseUrl + '/about';
  let imageUrl =  baseUrl + '/public/opengraph.jpeg';
  let title = 'About Refresh';
  let description = 'About the Refresh project';
  return metaFactory(title, description, url, imageUrl);
}

useHead(makeMeta());

import { useBackground } from '../state';
useBackground().value = '/images/background.png';

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
