<template>
<div class="container">
  <div class="page_title">About Refresh!</div>
</div>
</template>
<script>
import { meta } from '~/js/utils';
export default {
  head() {
    let baseUrl = 'https://refresh-tf.github.io';
    let url = baseUrl + '/website/about'
    let imageUrl =  baseUrl + require('~/assets/Hammer_long.png');
    let title = 'About Refresh'
    let description = 'About the Refresh project'
    return meta(title, description, url, imageUrl);
  }
}
</script>
