<template>
<a :href="'https://steamcommunity.com/profiles/' + profile.id"
   target="_blank" class="profile" v-if="profile">
  <img :src="profile.avatar"/>
  <span>{{profile.name}}</span>
</a>
</template>

<script setup>
const props = defineProps({
  profile: null
});
</script>


<style lang="scss">
.profile {
    background: #555;
    color: white;
    display: flex;
    text-decoration: none;
    padding: 5px;
    text-align: left;
    border-radius: 5px;
    display: inline-block;

    &:hover {
        background: #666;
    }

    img, span {
        display: inline-block;
        vertical-align: middle;
    }
    img {
        margin-right: 6px;
        max-height: 50px;
        width: auto;
    }
    span {
        flex-grow: 1;
        font-weight: 500;
        font-size: 18px;
        margin: auto 0;
    }
}
</style>
