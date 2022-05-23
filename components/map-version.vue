<template>
<div :is="index != 0 ? 'details' : 'div'"
     class="map-version" :id="uri">
  <summary>
    <div class="version">
      <h4>
        {{ version.suffix }}
      </h4>
      <span class="version-date">
        {{ version.date }}
      </span>
      <a :href="url" v-on:click="versionLinked">
        <i class="rfi rfi-link"></i>
      </a>
    </div>
  </summary>

  <div class="changelog">
    <ul>
      <li v-for="change in version.changes">
        <div :class="'tag ' + tagColor(change.type)">
          <span>{{tagType(change.type)}}</span>
        </div>
        <span>{{ change.message }}</span>
      </li>
    </ul>
    <a class="button"
       :href="version.download" target="_blank">
      <i class="rfi rfi-ic_file_download_48px"></i>
      {{ filename() }}
    </a>
  </div>
</div>
</template>

<script>

import mixinUri from './mixin-uri';

const type_remaps = {
  'fix': 'fixed',
  'revert': 'reverted',
  'improved': 'improvement',
  'remove' : 'removed',
  'add': 'added'
}

export default {
  name: 'map-version',
  mixins: [mixinUri],
  props: {
    map: null,
    index: null,
    version: null
  },
  data() {
    return {
      uriPrefix: 'version',
      uriValue: this.version.suffix
    }
  },
  mounted(){
    if (this.$route.hash == '#' + this.uri &&
        this.index != 0){
      this.$el.open = true;
    }
  },
  methods: {
    versionLinked($event){
      this.linked($event);
      this.$el.open = true;
    },
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
    filename(){
      return [this.map.prefix, this.map.name, this.version.suffix].join('_')
    },
  }
}

</script>

<style lang="scss">

details.map-version>summary {
    cursor: pointer;
}

.map-version {
    margin-bottom: 10px;

    .version {
        color: #ccc;
        font-weight: bold;
        display: inline-block;
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
        margin-bottom: 30px;

        ul {
            list-style: none;
        }
        ul, .changelog>a.button {
            padding-left: 10px;
        }
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
