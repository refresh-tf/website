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
        padding: 4rem;
    }

    a.grid_map {
        overflow: hidden;
        display: block;
        border-radius: 0.5rem;
        box-shadow: 0px 0px 5px #000a;
        position: relative;
        transition: transform .3s ease;
        height: 10rem;
        margin-bottom: 2rem;

        &:last-child {
            margin-bottom: 0px;
        }
        >img {
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
            transition: background-color .3s ease;
            background-color: #ff565300;
            color: #fff;

            .text-container {
                position: absolute;
                top: 0;
                bottom: 0;
                left: 0%;
                width: 100%;
                height: 100%;
                text-align: center;
                margin: auto;
                animation: leave 0.25s normal forwards ease-in;
            }
            &:hover {
                .text-container {
                    animation: enter 0.25s normal forwards ease-in;
                }
            }
            &:not(:hover) .text-container {
                visibility: hidden;
                transition: visibility 0.01s 0.25s;
            }
            @-webkit-keyframes enter {
                0% {
                    left: -100%;
                    opacity: 0;
                }
                100% {
                    left: 0%;
                    opacity: 1;
                }
            }
            @-webkit-keyframes leave {
                0% {
                    left: 0;
                    opacity: 1;
                }
                100% {
                    left: 100%;
                    opacity: 0;
                }
            }
            img {
                position: absolute;
                top: 0;
                left: 0;
                right: 0;
                bottom: 0;
                height: auto;
                max-width: 80%;
                margin: auto;
            }
        }
        &:hover {
            transform: scale(1.01);
            .grid_hover {
                background-color: #ff5653aa;
            }
        }
    }
}
@media only screen and (max-width: 600px) {
    #maps_page_info {
        .page_container {
            padding: 2.5rem;
        }
        a.grid_map .grid_hover .text-container {
            animation: none;
            visibility: visible !important;
            img {
                top: unset;
                bottom: -1rem;
                transition: bottom  .25s, max-width .25s;
            }
            &:hover {
                animation: none;
                img {
                    max-width: 100%;
                    bottom: 0.75rem;
                }
            }
        }
    }
}

</style>
