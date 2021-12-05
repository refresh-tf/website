<template>
<div class="container">
  <div class="page_title">Welcome to Refresh!</div>
  <div class="page_container">
    <div class="maps_grid">
      <a href="index.html" v-for="map in maps">
        <NuxtLink :to="'map/' + map">
          <div class="grid_map">
            <img src="https://wiki.teamfortress.com/w/images/thumb/8/82/Cp_process_middle_point.jpeg/1280px-Cp_process_middle_point.jpeg" alt="">
            <div class="grid_hover">{{map}}</div>
        </div>
        </NuxtLink>
      </a>
    </div>
  </div>
</div>
</template>

<script>
export default {
  async asyncData({ $content, params }) {
    const mapsData = await $content('maps').fetch();
    const maps = mapsData.maps;

    return { maps };
  },
};
</script>
