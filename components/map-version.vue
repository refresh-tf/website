<template>
<details :id="uri" ref="el" class="map-version">
  <summary>
    <div class="version">
      <h4>
        {{ version.suffix }}
      </h4>
      <span class="version-date">
        {{ props.version.date }}
      </span>
      <a :href="url" v-on:click="versionLinked">
        <i class="rfi rfi-link"></i>
      </a>
    </div>
  </summary>

  <div class="changelog">
    <ul>
      <li v-for="change in props.version.changes">
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
</details>
</template>

<script setup>

import { ref, onMounted, computed } from 'vue';

const el = ref('el');

const props = defineProps({
  map: null,
  index: null,
  version: null
});

const type_remaps = {
  'fix': 'fixed',
  'revert': 'reverted',
  'improved': 'improvement',
  'remove' : 'removed',
  'add': 'added'
};

const route = useRoute();

const uriPrefix = 'version';
const uriValue = props.version.suffix;

const uri = uriPrefix + '-' + uriValue;
const url = route.path + '#' + uri;

onMounted(() => {
  if (props.index == 0 || route.hash == '#' + uri){
    el._value.open = true;
  }
});

const versionLinked = ($event) => {
  linked($event);
  el._value.open = true;
}

const linked = ($event) => {
  $event.preventDefault();
  console.log('linked', el);
  window.location.hash = uri;
  navigator.clipboard.writeText(window.location.host + url);
  el._value.open = true;
}

const tagType = (type) => {
  let t = type.toLowerCase()
  return type_remaps[t] || t;
}

const tagColor = (type) => {
  let ttype = tagType(type);
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
}

const filename = () => {
  return [props.map.prefix, props.map.name, props.version.suffix].join('_')
}

</script>

<style lang="scss">

details.map-version>summary {
    cursor: pointer;
}
details:nth-of-type(1) {

    ::marker {
        display: none;
        content: none;
    }
}

.map-version {
    margin-bottom: 10px;

    .version {
        color: #ccc;
        font-weight: bold;
        display: inline-block;
        h4 {
            min-width: 40px;
            margin: 0;
            display: inline-block;
            text-transform: uppercase;
        }
        span.version-date {
            color: #555;
            min-width: 600px;
        }
        a {
            margin-left: 10px;
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
