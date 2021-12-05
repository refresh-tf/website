<template>
<div>
  <div id="background"></div>
  <div id="core">
    <navigation></navigation>
    <div class="content">
      <nuxt/>
    </div>
  </div>
</div>
</template>

<script>
import navigation from '../components/navigation.vue';
export default {
  components: {
    navigation: navigation,
  }
}
</script>
