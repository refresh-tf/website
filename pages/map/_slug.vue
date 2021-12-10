<template>
<div class="container" id="map_page_info">
  <h1>{{map.prefix}} {{map.name}}</h1>
  <div class="page_container">
    <h2>About</h2>
    <div class="summary">

      <div class="column">
        <p style="white-space: pre-line">{{ map.description }}</p>
        <div class="links">
          <a class="button large" v-if="map.versions.length > 0"
             :href="map.versions[0].download" target="_blank">
            <i class="mdi mdi-download"></i>
            Download latest version
          </a>
          <div class="sublinks">
            <a class="button" :href="map.workshopLink" v-if="map.workshopLink">
              Workshop</a>
            <a class="button" :href="map.tftvLink" v-if="map.tftvLink">
              TeamFortress.tv</a>
            <a class="button" :href="map.tf2mLink" v-if="map.tf2mLink">
              TF2maps</a>
          </div>
        </div>
      </div>
      <div class="column">
        <img ref="thumbnail" :src="imgUrl"/>
      </div>
    </div>

    <div class="separator"></div>

    <h2>Update History</h2>

    <section v-for="version in map.versions">
      <div class="version">
        <h4>{{ version.suffix }}</h4>
        <span class="version-date">{{version.date}}</span>
      </div>
      <ul class="changelog">
        <li v-for="change in version.changes">
          <div :class="'tag ' + tagColor(change.type)">
            <span>{{tagType(change.type)}}</span>
          </div>
          <span>{{change.message}}</span>
        </li>
      </ul>
      <p>
        <a class="button"
           :href="version.download" target="_blank">
          <i class="mdi mdi-download"></i>
          {{filename(version)}}
        </a>
      </p>
    </section>

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
export default {
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
    tagType(type){
      let t = type.toLowerCase()
      return type_remaps[t] || t;
    },
    tagColor(type){
      let ttype = this.tagType(type);
      if (ttype == 'improvement'){
        return 'lime';
      } else if (ttype == 'reverted'){
        return 'yellow';
      } else if (ttype == 'removed'){
        return 'red';
      } else if (ttype == 'fixed'){
        return 'green';
      } else if (ttype == 'added'){
        return 'blue';
      } else {
        return 'white';
      }
    },
    filename(version){
      return [this.map.prefix, this.map.name, version.suffix].join('_')
    },
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
    .version{
        color: #ccc;
        font-weight: bold;
        display: block;
        h4 {
            margin: 0;
            display: inline-block;
            text-transform: uppercase;
        }
        span.version-date {
            color: #555;
        }
    }

    .summary {
        display: grid;
        grid-template-columns: repeat(2, 1fr);
        grid-gap: 60px;

        .column {
            width: 100%;
            img {
                width: 100%;
                height: auto;
            }
        }
        .links {
            display: inline-block;
            .sublinks {
                a {
                    margin: 10px 3px 0px;
                    &:first-child {
                        margin-left: 0;
                    }
                    &:last-child {
                        margin-right: 0;
                    }
                }
            }
        }
    }

    .changelog,
    section p {
        padding-left: 10px;
    }

    .changelog {
        list-style: none;
        .tag {
            min-width: 90px;
            margin-right: 4px;
            text-transform: uppercase;
        }
        li {
            position: relative;
            margin-left: 110px;
        }
        li + li {
            margin-top: 4px;
        }
        .tag {
            position: absolute;
            top: 2px;
            left: -110px;
        }
        .update_title{
            color: #ccc;
            font-weight: bold;
        }
    }

    .tag {
        display: inline-block;

        font-weight: 700;
        font-size: 11px;
        padding: 2px 5px;
        border-radius: 5px;

        color: #000;
        text-align: center;
        text-transform: uppercase;
        &.red { background: var(--red); }
        &.blue { background: var(--blue); }
        &.lime { background: var(--lime); }
        &.green { background: var(--green); }
        &.yellow { background: var(--yellow); }
        &.white { background: var(--white); }
    }
}
</style>
