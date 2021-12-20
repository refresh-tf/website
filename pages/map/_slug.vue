<template>
<div class="container" id="map_page_info">
  <h1>{{map.prefix}} {{map.name}}</h1>
  <div class="page_container">
    <h2>About</h2>
    <div class="summary">

      <div class="column">
        <p class="ugc">{{ map.description }}</p>
        <div class="links">
          <a class="button large" v-if="map.versions.length > 0"
             :href="map.versions[0].download" target="_blank">
            <i class="mdi mdi-download"></i>
            Download latest version
          </a>
          <div class="sublinks">
            <a :href="map.workshopLink" target="_blank"
               v-if="map.workshopLink" title="workshop">
              <img :src="require('~/assets/icons/steam.png')">
            </a>
            <a :href="map.tftvLink" target="_blank"
               v-if="map.tftvLink" title="teamfortress.tv">
              <img :src="require('~/assets/icons/teamfortress_tv.png')">
            </a>
            <a :href="map.tf2mLink" target="_blank"
               v-if="map.tf2mLink" title="TF2Maps">
              <img :src="require('~/assets/icons/tf2maps.png')">
            </a>
            <a :href="map.githubLink" target="_blank"
               v-if="map.githubLink" title="Photo album">
              <img :src="require('~/assets/icons/github.png')">
            </a>
            <a :href="map.albumLink" target="_blank"
               v-if="map.albumLink" title="Photo album">
              <img :src="require('~/assets/icons/image.png')">
            </a>
          </div>
        </div>
      </div>
      <div class="column">
        <img ref="thumbnail" :src="imgUrl"/>
        <div class="credits" v-if="map.originalAuthorsComment ||
                                   map.refreshAuthorsComment">
          <p v-if="map.originalAuthorsComment" class="ugc"
             >{{ map.originalAuthorsComment }}</p>
          <p v-if="map.refreshAuthorsComment" class="ugc"
             >{{ map.refreshAuthorsComment }}</p>
        </div>
      </div>
    </div>

    <div v-if=" map.versions && map.versions.length > 0">
      <div class="separator"></div>
      <h2>Update History</h2>
      <map-version
        v-for="(version, index) in map.versions" :key="version.suffix"
        :map="map" :index="index" :version="version">
      </map-version>
    </div>

    <div v-if=" map.comparisons && map.comparisons.length > 0">
      <div class="separator"></div>
      <image-comparison
        v-for="(comp, index) in map.comparisons" :key="index"
        :comp="comp" :mapname="map.name">
      </image-comparison>
    </div>
  </div>
</div>
</template>

<script>
const type_remaps = {
  'fix': 'fixed',
  'revert': 'reverted',
  'improved': 'improvement',
  'remove' : 'removed',
  'add': 'added'
}

import { meta } from '~/js/utils';
import mapVersion from '../../components/map-version.vue';
import imageComparison from '../../components/image-comparison.vue';

export default {
  components: {
    mapVersion: mapVersion,
    imageComparison: imageComparison,
  },
  head() {
    let baseUrl = 'https://refresh-tf.github.io';
    let url = baseUrl + '/website/map/' + this.map.name.toLowerCase();
    let imageUrl =  baseUrl + this.imgUrl;
    let title = 'Refresh - ' + this.mapname();
    let description = this.map.description;
    return meta(title, description, url, imageUrl);
  },
  computed: {
    imgUrl(){
      return require('~/assets/images/' + this.map.thumbnail);
    },
  },
  methods: {
    mapname(){
      return this.map.name.charAt(0).toUpperCase() + this.map.name.slice(1);
    }
  },
  async asyncData({$content, store, params}) {
    const map = await $content(params.slug).fetch();
    store.commit('CHANGE_LAYOUT_BG',
                 require('~/assets/images/' + map.thumbnail));
    return { map };
  }
}
</script>


<style lang="scss">
#map_page_info {
    h1 {
        text-transform: uppercase;
    }

    .summary {
        display: grid;
        grid-template-columns: repeat(2, 1fr);
        grid-gap: 60px;

        p.ugc {
            white-space: pre-line;
        }
        .column {
            width: 100%;
            img {
                width: 100%;
                height: auto;
            }
            >img {
                box-sizing: border-box;
                border: solid white 7px;
                border-radius : 7px;
            }
        }
        .links {
            display: inline-block;
            margin-top: 30px;

            .sublinks {
                a {
                    height: 40px;
                    width: 40px;
                    display: inline-block;
                    cursor: pointer;
                    margin: 10px 3px 0px;
                    position: relative;
                    padding: 5px;

                    &:after, &:before {
                        content: '';
                        position: absolute;
                        top: 0;
                        left: 0;
                        right: 0;
                        bottom: 0;
                    }
                    &:after { top: 60%;}
                    &:before { top: 25%;}
                    &:hover {
                        background: radial-gradient(ellipse at 50% 50%,
                                                    rgba(255, 255, 255, 0.20) 30%,
                                                    rgba(255, 255, 255, 0) 75%);
                        &:after {
                            background: radial-gradient(ellipse at 50% 50%,
                                                        rgba(255, 255, 255, 0.4) 30%,
                                                        rgba(255, 255, 255, 0) 75%);
                        }
                        &:before {
                            background: radial-gradient(ellipse at 50% 50%,
                                                        rgba(255, 255, 255, 0.4) 10%,
                                                        rgba(255, 255, 255, 0) 55%);
                        }
                    }
                    &:first-child {
                        margin-left: 0;
                    }
                    &:last-child {
                        margin-right: 0;
                    }
                }
            }
        }
        .credits {
            background: #333;
            padding: 10px 20px;
            margin-top: 10px;
            p {
                color: #ccc;
            }
        }
    }
}
</style>
