<template>
<header>
  <div class="header-container open">
    <div class="logo">
      <NuxtLink to="/"><img src="/refresh.png" alt=""></NuxtLink>
    </div>

    <div class="header-navigation">
      <a class="burger"><span></span></a>

      <div class="header-navigation-menu menu">
        <NuxtLink class="home" to="/">Home</NuxtLink>

        <div class="maps-navigation">

          <NuxtLink class="maps" to="/">Maps</NuxtLink>
          <div class="maps-navigation-menu menu">
            <NuxtLink :to="'/' + map" v-for="map in maps" :key="map">{{map}}</NuxtLink>
          </div>
        </div>

        <NuxtLink class="about" to="/about">About</NuxtLink>

        <a href="https://steamcommunity.com/sharedfiles/filedetails/?id=2607508080"
           title="Find the Refresh map collection on the Steam workshop"
           class="ext rfi rfi-steam" target="_blank">
        </a><a href="https://github.com/tom288/Refresh"
               title="Find the Refresh project on github"
               class="ext rfi rfi-github" target="_blank">
        </a>
      </div>
    </div>
  </div>
</header>
</template>

<script setup>

const meta = await queryContent('meta').findOne();
const maps = meta.maps;
/*export default {
  data(){
    return {
      maps: []
    }
  },
  async fetch() {
    const meta = await this.$content('meta').fetch();
    this.maps = meta.maps;
  },
}*/
</script>

<style lang="scss">
@mixin menu {
    z-index: 1000;
    padding: 5px 0 1.5rem;
    margin: 2px 0 0;
    text-align: center;
    background: #262626;
    -webkit-background-clip: padding-box;
    background-clip: padding-box;
    border: 1px solid #ccc;
    border: 1px solid rgba(0, 0, 0, 0.15);
    border-radius: 0.25rem;
    -webkit-box-shadow: 0 0.5rem 0.75rem rgba(0, 0, 0, 0.18);
    box-shadow: 0 0.5rem 0.75rem rgba(0, 0, 0, 0.18);

    a {
        @include menu-item;
    }

}
@mixin menu-item {
    display: block;
    float: none;
    display: block;
    margin: 0.25rem 0.5rem;
    height: 2rem;
    line-height: 2rem;
    padding: 0.25rem 1.25rem;
    clear: both;
    color: #f2f2f2;
    text-align: center;
    border-radius: 0;

    &:focus,
    &:hover,
    &.nuxt-link-exact-active{
        color: #262626 !important;
        text-decoration: none !important;
        background-color: #f5f5f5 !important;
    }
}

@mixin menu-container {
    position: relative;
    &:not([open]) > *:not(a) {
        display: none;
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
    }

    >.menu {
        position: absolute;
        display: none;
        @include menu;
    }
    &:not([open]) > *:not(a) {
        display: none;
    }
    &[open],
    &:hover {
        >.menu {
            display: block;
        }
    }
}

header {
    padding: 0 0.5rem;
    box-shadow: 0px 0px 5px #000a;
    background-color: #262626;
    font-weight: bold;
    color: #f2f2f2;

    position: fixed;
    z-index: 100;
    top: 0;
    left: 0;
    right: 0;

    a.rfi {
        font-size: 40px;
    }
    .header-navigation {
        a {
            color: #f2f2f2;
            display: inline-block;
            text-transform: capitalize;
            text-decoration: none;
            line-height: 4rem;
            vertical-align: middle;
            height: 4rem;
            margin-left: 0.5rem;
            padding: 0px 0.5rem;
            border-radius: 5px;
            &:hover {
                background: #fff1;
            }
            &:active,
            &.nuxt-link-exact-active {
                background: #ffffff08;
            }
            img {
                height: 2.5rem;
                width: auto;
                margin: 0.75rem 0;
            }
        }
    }

    .header-container {
        max-width: 1000px;
        margin: 0 auto;
        display: flex;
        height: 100%;
        justify-content: space-between;
        padding: 1rem;
        img {
            height: 4rem;
        }
    }
    .header-navigation {
        flex-grow: 1;
        text-align: right;

        a.home, a.burger {
            display: none;
        }
    }

    .maps-navigation {
        display: inline-block;
        @include menu-container;
        .maps-navigation-menu {
            top: 100%;
            right: 50%;
            transform: translate(50%, 0%);
        }
    }

    a.burger {
        padding: 0 1rem;
        width: 3rem;
    }
    .burger span,
    .burger span::before,
    .burger span::after {
        content: '';
        display: block;
        width: 3rem;
        height: 0.25rem;
        position: absolute;
        margin-top: 2rem;
        background: rgba(255, 255, 255, 1);
        border-radius: 0.3rem;
    }

    .burger span::before {
        margin-top: -0.8rem;
    }

    .burger span::after {
        margin-top: 0.8rem;
    }
}

@media only screen and (max-width: 600px) {
    header .header-navigation {
        position: absolute;
        top: 0;
        right: 0;
        font-size: 1.5rem;

        @include menu-container;

        >*,
        .header-navigation-menu>*,
        .maps-navigation>* {
            display: block;
        }
        a.burger {
            display: inline-block;
        }
        a.home {
            display: block !important;
        }
        a.maps {
            display: none !important;
        }
        a.ext {
            display: inline-block !important;
            padding: 0.25rem !important;
            border-radius: 5rem;
        }
        .maps-navigation, .maps-navigation-menu {
            display: contents !important;
        }
        .maps-navigation-menu:after,
        .maps-navigation-menu:before {
            content: '';
            display: block;
            height: 2px;
            width: 75%;
            margin: auto;
            background: #ccc;
            margin: 10px auto;
        }

        .header-navigation-menu {
            position: absolute;
            top: 100%;
            right: 0;
            display: none;
            @include menu;
            a {
                display: block;
                float: none;
                height: 2.5rem !important;
                line-height: 2.5rem !important;
                &.ext {
                    border-radius: 1rem;
                    padding: 0.75rem !important;
                }
            }
        }
        &[open],
        &:hover {
            .header-navigation-menu {
                display: block;
            }
        }

    }
}

</style>
