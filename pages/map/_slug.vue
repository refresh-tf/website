<template>
<div class="container">
  <div class="page_title">{{map.prefix}} {{map.name}}</div>
  <div class="page_container"></div>
</div>
</template>

<script>
export default {
  head() {
    return {title: this.map.name};
  },
  async asyncData({$content, params}) {
    const map = await $content(params.slug).fetch();
    return { map };
  }
}
</script>
