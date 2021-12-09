<template>
<div class="container" id="map_page_info">
  <h1>{{map.prefix}} {{map.name}}</h1>
  <div class="page_container">
    <h2>About</h2>
    <div class="summary">
      <div class="column">
        <p>{{ map.description }}</p>
        <a class="button large" v-if="map.versions.length > 0"
           :href="map.versions[0].download" target="_blank">
          <i class="mdi mdi-download"></i>
          Download latest version
        </a>
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
const types = {
  'fix': 'fixed',
  'fixed': 'fixed',
  'revert': 'reverted',
  'reverted': 'reverted',
  'improvement': 'improvement',
  'improved': 'improvement',
}
let tagType = (type) => {
  return types[type] || type;
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
  created(){
    this.$store.commit('CHANGE_LAYOUT_BG',
                       require('~/assets/images/' + this.map.thumbnail));
  },
  methods: {
    tagType(type){
      return tagType(type)
    },
    tagColor(type){
      let ttype = tagType(type);
      if (ttype == 'improvement'){
        return 'green';
      } else if (ttype == 'reverted'){
        return 'yellow';
      } else if (ttype == 'fixed'){
        return 'red';
      } else {
        return 'blue';
      }
    },
    filename(version){
      return [this.map.prefix, this.map.name, version.suffix].join('_')
    },
    mapname(){
      return this.map.prefix.toLowerCase() + ' ' +
        this.map.name.charAt(0).toUpperCase() + this.map.name.slice(1);
    }
  },
  async asyncData({$content, params}) {
    const map = await $content(params.slug).fetch();
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
    .changelog {
        list-style: none;
        div.tag {
            text-align: center;
            display: inline-block;
            min-width: 90px;
            margin-right: 4px;
            text-transform: uppercase;
        }
    }
    .changelog,
    section p {
        padding-left: 10px;
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
    }
}
</style>
