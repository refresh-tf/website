<template>
<div id="maps_page_info" class="container">
  <h1>Welcome to Refresh!</h1>
  <div class="page_container">
    <NuxtLink :to="'/' + map.name" v-for="map in maps" :key="map.name" class="grid_map">
      <img :src="require('~/assets/banners/' + map.name + '/background.png')">
      <div class="grid_hover">
        <div class="text-container">
          <img :src="require('~/assets/banners/' + map.name + '/text.png')">
        </div>
      </div>
    </NuxtLink>
  </div>
</div>
</template>

<script>
import { meta } from '~/js/utils';
export default {
  head() {
    let baseUrl = 'https://refresh.tf';
    let url = baseUrl + '/'
    let imageUrl =  baseUrl + require('~/assets/opengraph.jpeg');
    let title = 'Refresh'
    let description = 'The Refresh project'
    return meta(title, description, url, imageUrl);
  },
  async asyncData({ $content, store, params }) {
    const meta = await $content('meta').fetch();
    const maps = [];
    for (let i = 0; i < meta.maps.length; i++ ){
      maps.push( await $content(meta.maps[i]).only(['name', 'thumbnail']).fetch())
    }
    store.commit('RESET_LAYOUT_BG');
    return { maps };
  },
};
</script>

<style lang="scss">
#maps_page_info {

    .page_container {
        padding: 60px;
    }

    a.grid_map {
        overflow: hidden;
        display: block;
        border-radius: 10px;
        box-shadow: 0px 0px 5px #000a;
        position: relative;
        transition: transform .3s ease;
        height: 175px;
        margin-bottom: 30px;

        &:last-child {
            margin-bottom: 0px;
        }
        >img {
            // background
            height: 100%;
            width: 100%;
            object-fit: cover;
        }
        .grid_hover {
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            text-align: center;
            opacity: 0;
            transition: opacity .3s ease;
            background-color: #ff5653aa;
            color: #fff;

            .text-container {
                //background: green;
                position: absolute;
                top: 0;
                right: 0;
                width: 0;
                bottom: 0;
                transition-property: width;
                transition-duration: 0.3s;
                transition-timing-function: ease;
            }
            &:hover {
                .text-container {
                    left: 0;
                    right: auto;
                    width: 100%;
                }
            }
            img {
                // text
                position: absolute;
                top: 0;
                left: 0;
                right: 0;
                bottom: 0;
                height: 160px;
                width: auto;
                max-width: 80%;
                margin: auto;
            }
        }
        &:hover {
            transform: scale(1.01);
            .grid_hover {
                opacity: 1;
            }
        }
    }
}
</style>
