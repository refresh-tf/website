<template>
<div :is="index != 0 ? 'details' : 'div'" class="map-version">
  <summary>
    <div class="version">
      <h4>
        {{ map.versions[index].suffix }}
      </h4>
      <span class="version-date">
        {{map.versions[index].date}}
      </span>
    </div>
  </summary>

  <div class="changelog">
    <ul>
      <li v-for="change in map.versions[index].changes">
        <div :class="'tag ' + tagColor(change.type)">
          <span>{{tagType(change.type)}}</span>
        </div>
        <span>{{ change.message }}</span>
      </li>
    </ul>
    <a class="button"
       :href="map.versions[index].download" target="_blank">
      <i class="mdi mdi-download"></i>
      {{ filename() }}
    </a>
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

export default {
  name: 'map-version',
  props: {
    map: null,
    index: null,
  },
  computed: {
    version(){
      return this.map.versions[this.index];
    }
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
    filename(){
      return [this.map.prefix, this.map.name, this.version.suffix].join('_')
    },
  }
}

</script>

<style lang="scss">
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
