<template>
<div class="container" id="map_page_info">
  <h1><span><span class="h1-prefix">{{map.prefix}}</span> {{map.name}} <span class="h1-suffix">{{map.versions[0].suffix}}</span></span></h1>
  <div class="page_container">
    <h2>About</h2>
    <div class="summary">

      <img class="thumbnail" ref="thumbnail" :src="'/images/' + map.thumbnail"/>

      <div class="credits" v-if="map.originalAuthors.length > 0">
        <div class="credit" v-for="author in map.originalAuthors">
          <p class="ugc">{{ author.comment }}</p>
          <a :href="author.link" target="_blank"
             class="highlight" v-if="author.link">
            <i class="rfi rfi-link-external"></i>
          </a>
        </div>
      </div>

      <div class="credits" v-if="map.refreshAuthors.length > 0">
        <p>Refreshed By:
          <profile v-if="map.refreshAuthors"
                   v-for="sid in map.refreshAuthors" :key="sid"
                   :steamid="sid">{{ map.refreshAuthors }}
          </profile>
        </p>
      </div>

      <p class="ugc">{{ map.description }}</p>
      <div class="links">
        <a class="button large" v-if="map.versions.length > 0"
           :href="map.versions[0].download" target="_blank">
          <i class="rfi rfi-ic_file_download_48px"></i>
          Download latest version
        </a>
        <div class="sublinks">
          <a class="highlight" :href="map.workshopLink" target="_blank"
             v-if="map.workshopLink" title="workshop">
            <i class="rfi rfi-steam"></i>
          </a>
          <a class="highlight" :href="map.tftvLink" target="_blank"
             v-if="map.tftvLink" title="teamfortress.tv">
            <img src="/icons/teamfortress_tv.png">
          </a>
          <a class="highlight" :href="map.tf2mLink" target="_blank"
             v-if="map.tf2mLink" title="TF2Maps">
            <img src="/icons/tf2maps.png">
          </a>
          <a class="highlight" :href="map.githubLink" target="_blank"
             v-if="map.githubLink" title="Photo album">
            <i class="rfi rfi-github"></i>
          </a>
          <a class="highlight" v-on:click="goAlbum" title="Photo album"
             v-if=" map.comparisons && map.comparisons.length > 0">
            <img src="/icons/image.png">
          </a>
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

    <div ref="album">
      <div class="separator"></div>
      <image-comparison
        v-for="(comp, index) in map.comparisons" :key="index"
        :comp="comp" :mapname="map.name">
      </image-comparison>
    </div>
  </div>
</div>
</template>

<script setup>

import { ref } from 'vue';
import { metaFactory } from '../utils/utils';

const route = useRoute();
const map = await queryContent(route.params.slug).findOne();

import { useBackground } from '../state';
useBackground().value = 'images/' + map.thumbnail;

const album = ref();
const goAlbum = () => {
  const y = album.value.getBoundingClientRect().top + window.pageYOffset - 100;
  window.scrollTo({top: y, behavior: 'smooth'})
}

let makeMeta = () =>{
  let mapName = map.name.charAt(0).toUpperCase() + map.name.slice(1);
  let baseUrl = 'https://refresh.tf';
  let url = baseUrl + '/' + map.name.toLowerCase();
  let imgUrl = baseUrl + '/images/' + map.thumbnail;
  let title = 'Refresh - ' + mapName;
  let description = map.description;
  return metaFactory(title, description, url, imgUrl);
}
useHead(makeMeta());
</script>


<style lang="scss">
#map_page_info {
    .summary {
        position: relative;

        >img, .sublinks img {
            width: 100%;
            height: auto;
        }
        >img {
            box-sizing: border-box;
            border: solid white 7px;
            border-radius : 7px;
        }
        &:after {
            content: '';
            display: block;

            //float: right;
            clear:both;
        }
    }
    img.thumbnail, .credits {
        margin-left: 2rem;
        width: calc(50% - 2rem);
        float: right;
        box-sizing: border-box;
        clear: both;
    }
    img.thumbnail {
        height: auto;
        border: solid #333 7px;
        border-radius : 7px;
    }
    p.ugc {
        white-space: pre-line;
    }
    .profile {
        margin-top: 4px;
        margin-bottom: 10px;
        display: block;
    }
    .links {
        display: inline-block;
        margin-top: 30px;

        .sublinks {
            a {
                height: 40px;
                width: 40px;
                margin: 10px 3px 0px;
                padding: 5px;
                i {
                    vertical-align: unset;
                    font-size: 40px;
                }
            }
        }
    }
    a.highlight {
        display: inline-block;
        cursor: pointer;
        position: relative;

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
    .credits {
        background: #333;
        padding: 3px 20px;
        margin-top: 10px;

        .credit {
            position: relative;
            display: flex;
            &:not(:last-child):after {
                content: '';
                display: block;
                margin: 0 0;
                height: 1px;
                width: 100%;
                background: #555;
                position: absolute;
                bottom: -0.25rem;
                left: 0;
                right: 0;
            }
            p {
                flex-grow: 1;
            }
            a {
                height: 30px;
                margin: auto 0;
                vertical-align: middle;
                display: inline-block;
                text-align: center;

                height: 30px;
                min-width: 30px;
                margin-left: 6px;

                i.rfi {
                    font-size: 20px;
                }
            }
        }
        p {
            color: #ccc;
            position: relative;
        }
    }
}

#map_page_info {
    h1 {
        text-transform: uppercase;
        position: relative;
        display: block;
        margin-left: auto;
        margin-right: auto;
        font-size: 100px;
        span {
            position: relative;
        }
        span.h1-prefix {
            position: absolute;
            top: 16px;
            font-size: 60px;
            right: 100%;
            margin-right: 10px;
        }
        span.h1-suffix {
            position: absolute;
            bottom: 16px;
            font-size: 60px;
            left: 100%;
            margin-left: 10px;
        }
    }
}

@media only screen and (max-width: 700px) {
    #map_page_info {
        h1 {
            font-size: 60px;
            span.h1-prefix {
                font-size: 36px;
                top: 0px;
            }
            span.h1-suffix {
                font-size: 36px;
                bottom: 0px;
            }
        }
        .summary {
            display:flex;
            flex-flow: row wrap;
            flex-direction: column;
            img.thumbnail {
                order: 1;
            }
            h2, >.ugc, .links {
                order: 2;
            }
            .credits {
                order: 4;
            }
        }
        img.thumbnail, .credits {
            width: 100%;
            margin-left: 0;
            float: none;
        }
    }
}

</style>
