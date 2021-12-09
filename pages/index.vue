<template>
<div id="maps_page_info" class="container">
  <h1>Welcome to Refresh!</h1>
  <div class="page_container">
    <div class="maps_grid">
      <NuxtLink :to="'map/' + map.name" v-for="map in maps" :key="map.name">
        <div class="grid_map">
          <div class="grid_container">
            <img :src="require('~/assets/images/' + map.thumbnail)">
            <div class="grid_hover">
              <span>{{map.name}}</span>
            </div>
          </div>
        </div>
      </NuxtLink>
    </div>
  </div>
</div>
</template>

<script>
import { meta } from '~/js/utils';
export default {
  head() {
    let baseUrl = 'https://refresh-tf.github.io';
    let url = baseUrl + '/website/'
    let imageUrl =  baseUrl + require('~/assets/refresh.png');
    let title = 'Refresh'
    let description = 'The Refresh project'
    return meta(title, description, url, imageUrl);
  },
  async asyncData({ $content, params }) {
    const meta = await $content('meta').fetch();
    const maps = [];
    for (let i = 0; i < meta.maps.length; i++ ){
      maps.push( await $content(meta.maps[i]).only(['name', 'thumbnail']).fetch())
    }
    return { maps };
  },
};
</script>

<style lang="scss">
#maps_page_info {

    .maps_grid {
        display: grid;
        grid-template-columns: repeat(2, 1fr);
        grid-template-rows: repeat(8, 5vw);
        grid-gap: 60px;
        padding: 30px;
        margin-top: 20px;
    }

    .grid_map {
        overflow: hidden;
        border-radius: 10px;
        box-shadow: 0px 0px 5px #000a;
        position: relative;
        transition: transform .2s ease;
        height: 250px;

        .grid_container,
        .grid_hover,
        .grid_hover div{
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
        }
        img, .grid_hover {
            height: 100%;
            width: 100%;
        }
        img {
            object-fit: cover;
        }
        .grid_hover {
            text-align: center;
            opacity: 0;
            transition: opacity .2s ease;
            background-color: #ff5653aa;
            color: #fff;
            display:table;
            span {
                font-weight: bold;
                font-size: 24px;
                display:table-cell;
                vertical-align:middle;
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
