<template>
<div id="maps_page_info" class="container">
  <div class="page_container component-unloaded" ref="container">
    <NuxtLink :to="'/' + map.name" class="grid_map"
              v-for="map in maps" :key="map.name">
      <img :src="'/banners/' + map.name + '/background.png'">

      <span class="version">{{map.version}}</span>
      <div class="text-name text-top"><span>{{map.name}}</span></div>
      <div class="text-name text-bottom"><span>{{map.name}}</span></div>
      <client-only>
        <span class="version-hot" v-if="map.hot">new!</span>
      </client-only>

    </NuxtLink>
  </div>
</div>
</template>

<script setup>

import { metaFactory } from '../utils/utils';
const { data: meta } = await useAsyncData('/meta', () => queryCollection('meta').first());
const maps = [];

const container = ref(null);
onMounted(() => {
  setTimeout(() =>{
    // hides the animation at page load
    container._value.classList.remove('component-unloaded');
  }, 500);
});

for (let i = 0; i < meta.value.maps.length; i++){

  const { data: mapData } = await useAsyncData(`/maps/${meta.value.maps[i]}`, () =>
        queryCollection('maps').where("name", "=", meta.value.maps[i]).first()
  );

  let latestVersion = null;
  let latestDate = null;
  const hotDate = new Date();
  hotDate.setDate(hotDate.getDate() - 60);

  for (let i = 0; i < mapData.value.versions.length; i++){
    latestVersion = latestVersion || mapData.value.versions[i].suffix;
    var parts = mapData.value.versions[i].date.split('/');
    latestDate = latestDate || new Date(parts[2], parts[1] - 1, parts[0]);
  }

  let map = {
    name: mapData.value.name,
    thumbnail: mapData.value.thumbnail,
    version: latestVersion,
    date: latestDate,
    hot: latestDate > hotDate,
  }

  if (maps.length == 0){ maps.push(map); }

  else {
    for (let m = 0; m < maps.length; m++){
      if (map.date > maps[m].date){
        maps.splice(m, 0, map);
        break;
      }
    }
  }
  if (maps.indexOf(map) == -1){
    maps.push(map);
  }
}


let makeMeta = () => {
  let baseUrl = 'https://refresh.tf';
  let url = baseUrl + '/';
  let imageUrl =  baseUrl + '/public/opengraph.jpeg';
  let title = 'Refresh';
  let description = 'The Refresh project';
  return metaFactory(title, description, url, imageUrl);
}

useHead(makeMeta());

import { useBackground } from '../state';
useBackground().value = '/images/background.png';

</script>

<style lang="scss">
@use '../utils/mixins';

@keyframes top-enter {
    0% {
        left: -100%;
        opacity: 0;
    }
    100% {
        left: 0%;
        opacity: 1;
    }
}
@keyframes top-leave {
    0% {
        left: 0%;
        opacity: 1;
    }
    100% {
        left: 100%;
        opacity: 0;
    }
}
@keyframes bottom-enter {
    0% {
        right: -100%;
        opacity: 0;
    }
    100% {
        right: 0%;
        opacity: 1;
    }
}
@keyframes bottom-leave {
    0% {
        right: 0%;
        opacity: 1;
    }
    100% {
        right: 100%;
        opacity: 0;
    }
}

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
            margin-bottom: 0;
        }

        img {
            width: 100%;
            height: 100%;
            object-fit: cover;
        }
        span {
            @include mixins.woosh();
        }
        .text-name {
            font-size: 100px;
            text-shadow: 0px 0px 10px #000a;
            color: white;
        }
        span.version,
        span.version-hot {
            vertical-align: bottom;
            position: absolute;
            text-shadow: 0px 0px 10px #000a;
        }
        span.version {
            font-size: 175px;
            line-height: 100px;
            min-width: 200px;
            overflow: visible;
            right: 0;
            bottom: -5px;
            color: #ccc;
            opacity: 0.6;
        }
        span.version-hot {
            font-size: 40px;
            line-height: 60px;
            right: 5px;
            top: -12px;
            color: #fff;
            opacity: 1;
        }

        .text-name {
            position: absolute;
            top: 0;
            bottom: 0;
            width: 100%;
            height: 100%;
            text-align: center;
            margin: auto;
        }
        .text-name.text-top,
        .text-name.text-bottom {
            height: 50%;
            overflow: hidden;
            span {
                position: absolute;
                left: 0;
                right: 0;
                transform: skew(-60deg);
                transition: transform 0.35s ease;

                vertical-align: middle;
                line-height: 50px;
            }
        }
        .text-name.text-top {
            left: 0%;
            bottom: 50%;
            animation: top-leave 0.25s normal forwards ease-in;
            span { bottom: -25px; }
        }
        .text-name.text-bottom {
            right: 0%;
            top: 50%;
            animation: bottom-leave 0.25s normal forwards ease-in;
            span { top: -25px; }
        }

        .text-name, span.version, span.version-hot {
            z-index: 1;
        }

        &:before, &:after {
            content: '';
            transition: background-color 0.3s ease, transform;
            z-index: 0;

            position: absolute;
            top: 0;
            bottom: 0;
            width: 100%;
            height: 100%;
        }
        &:before {
            background-color: #ff565399;
            left: 0%;
            bottom: 50%;
            animation: top-leave 0.25s normal forwards ease-in;
        }
        &:after {
            background-color: #96aaccbb;
            right: 0%;
            top: 50%;
            animation: bottom-leave 0.25s normal forwards ease-in;
        }

        &:hover {
            transform: scale(1.01);

            .text-name.text-top {
                animation: top-enter 0.35s normal forwards ease-in;
            }
            .text-name.text-bottom {
                animation: bottom-enter 0.35s normal forwards ease-in;
            }

            .text-name.text-top span { transform: skew(-10deg); }
            .text-name.text-bottom span { transform: skew(-10deg); }
            &:before {
                animation: top-enter 0.25s normal forwards ease-in;
            }
            &:after {
                animation: bottom-enter 0.25s normal forwards ease-in;
            }
        }
        &:not(:hover) {
            &:before, &:after,
            .text-name.text-top,
            .text-name.text-bottom {
                visibility: hidden;
                transition: visibility 0.01s 0.25s;
            }
        }

    }

    .component-unloaded .text-name {
        opacity: 0 !important;
        &:before,
        &:after {
            opacity: 0 !important;
        }
    }
}

@media only screen and (max-width: 600px) {
    #maps_page_info {
        .page_container {
            padding: 2.5rem;
        }
        a.grid_map {
            &:after,
            &:before {
                content: none;
            }
            span.version {
                min-width: unset;
            }
            .text-name.text-bottom {
                display: none;
            }
            .text-name.text-top {
                top: unset;
                bottom: 0;
                overflow: visible;
                text-align: left;
                margin-left: 10px;
                span {
                    transform: skew(-10deg);
                    bottom: 0;
                    left: 0;
                    right: 0;
                    margin: auto;
                    font-size: 60px;
                }
                visibility: visible !important;
                animation: none !important;
                &:hover {
                    animation: none !important;
                }
            }
        }
    }
}

</style>
