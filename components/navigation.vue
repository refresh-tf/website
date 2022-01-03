<template>
<header>
  <div class="header_container">
    <div class="logo">
      <NuxtLink to="/"><img src="~/assets/refresh.png" alt=""></NuxtLink>
    </div>

    <div class="header_navigation">
      <!--NuxtLink to="/">Home</NuxtLink-->

      <span class="header-item dropdown">
        <NuxtLink to="/">Maps</NuxtLink>
        <ul class="dropdown-menu">
          <li v-for="map in maps" :key="map">
            <NuxtLink :to="'/' + map" >{{map}}</NuxtLink>
          </li>
        </ul>
      </span>

      <NuxtLink to="/about">About</NuxtLink>

      <a href="https://steamcommunity.com/sharedfiles/filedetails/?id=2607508080"
         title="Find the Refresh map collection on the Steam workshop">
        <img :src="require('~/assets/icons/steam.png')" />
      </a>
      <a href="https://github.com/tom288/Refresh"
         title="Find the Refresh project on github">
        <img :src="require('~/assets/icons/github.png')" />
      </a>
    </div>
  </div>
</header>
</template>

<script>
export default {
  data(){
    return {
      maps: []
    }
  },
  async fetch() {
    const meta = await this.$content('meta').fetch();
    this.maps = meta.maps;
  },
}
</script>

<style lang="scss">
header {
    padding: 0 10px;
    box-shadow: 0px 0px 5px #000a;
    background-color: #262626;
    font-weight: bold;
    color: #f2f2f2;
    a { color: #f2f2f2; }

    position: fixed;
    z-index: 100;
    top: 0;
    left: 0;
    right: 0;

    .header_container {
        max-width: 1000px;
        margin: 0 auto;
        display: flex;
        height: 100%;
        justify-content: space-between;
        padding: 15px 0;
        img {
            height: 60px;
        }
    }
    .header_navigation {
        >a, .header-item {
            line-height: 60px;
            float: left;
            height: 60px;
            margin-left: 10px;
            padding: 0px 10px;
            border-radius: 5px;
            &:hover {
                background: #fff1;
            }
            &:active,
            &.nuxt-link-exact-active {
                background: #ffffff08;
            }
        }
        a {
            text-transform: capitalize;
            text-decoration: none;
            img {
                height: 40px;
                width: auto;
                margin: 10px 0;
            }
        }
    }

    .dropdown {
        position: relative;

        &:not([open]) > *:not(a) {
            display: none !important;
        }
        >a {
            -ms-touch-action: manipulation;
            touch-action: manipulation;
            -webkit-user-select: none;
            -moz-user-select: none;
            -ms-user-select: none;
            user-select: none;
            background-image: none;
            cursor: pointer;
            &::-webkit-details-marker {
                display: none;
            }
            &:active {
                outline: 0;
                -webkit-box-shadow: inset 0 3px 5px rgba(0, 0, 0, 0.13);
                box-shadow: inset 0 3px 5px rgba(0, 0, 0, 0.13);
            }
        }

        .dropdown-menu {
            position: absolute;
            top: 100%;
            right: 50%;
            transform: translate(50%, 0%);
            z-index: 1000;
            display: none;
            padding: 5px 0;
            margin: 2px 0 0;
            text-align: center;
            list-style: none;
            background-color: #fff;
            -webkit-background-clip: padding-box;
            background-clip: padding-box;
            border: 1px solid #ccc;
            border: 1px solid rgba(0, 0, 0, 0.15);
            border-radius: 4px;
            -webkit-box-shadow: 0 6px 12px rgba(0, 0, 0, 0.18);
            box-shadow: 0 6px 12px rgba(0, 0, 0, 0.18);

            > li {
                display: block;
            }
            > li > a {
                float: none;
                display: block;
                margin: 2px 10px;
                height: 30px;
                line-height: 30px;
                padding: 3px 20px;
                clear: both;
                color: #333;

                &:focus,
                &:hover,
                &.nuxt-link-exact-active{
                    color: #262626;
                    text-decoration: none;
                    background-color: #f5f5f5;
                }
            }
        }

        &[open] {
            .dropdown-menu {
                display: block;
            }
        }

        &:hover {
            &::after {
                content: '';
                display: block;
                position: absolute;
                right: 0;
                left: 0;
                top: 100%;
                height: 2px;
            }
            .dropdown-menu {
                display: block !important;
            }
        }
    }
}
</style>
