<template>
<div :class="{'image-comparison-fullscreen': fullscreen}"
     v-on:click="exitFullscreen" :id="uri">
  <div class="image-comparison" v-on:click.stop>

    <div class="img-header" v-if="comp.title">{{comp.title}}
      <a :href="url" v-on:click="linked">
        <i class="rfi rfi-link"></i>
      </a>

      <a class="toggle-fullscreen" v-on:click="toggleFullscreen">
        <i class="rfi"
           :class="{'rfi-screen-full': !fullscreen,
                   'rfi-screen-normal': fullscreen,}"></i>
      </a>
    </div>

    <div class="img-container"
         :class="{'active': active}">

      <div class="clickarea" v-on:mousedown="mouseDown"></div>

      <img class="img-after" :src="after">
      <div class="image-slider"
           :style="{right: percent + '%',
                   backgroundImage: 'url(' + before + ')'}">
        <div class="handle"></div>
      </div>

      <span>Before</span>
      <span>After</span>
    </div>

    <div class="img-footer">

      <div class="collision-toggle" v-on:click="toggleCollision">
        Display collisions
        <div class="toggleswitch">
          <div class="switch" :class="{'on': collision}"></div>
        </div>
      </div>

      <div class="legend" v-if="collision">
        <span class="brush-magenta">PlayerClip</span>
        <span class="brush-purple">BlockBullet</span>
        <span class="brush-red">Grate</span>
        <span class="wireframe">Collision</span>
      </div>
    </div>
  </div>
</div>
</template>

<script>
import mixinUri from './mixin-uri';
export default {
  name: 'image-comparison',
  mixins: [mixinUri],
  props: {
    mapname: null,
    comp: null,
  },
  data(){
    return {
      active: false,
      before: null,
      after: null,
      percent: 50,
      collision: false,
      uriPrefix: 'compared',
      uriValue: this.comp.name,
      fullscreen: false,
    }
  },
  created(){
    this.comparison = {}
    const imgpath = '/comparison/' + this.mapname + '/';
    let beforeNormal = imgpath + this.comp.name + '_collision_off.jpg';
    let beforeCollide = imgpath + this.comp.name + '_collision_on.jpg';
    let afterNormal = imgpath + this.comp.name + '_' + this.comp.version + '_collision_off.jpg';
    let afterCollide = imgpath + this.comp.name + '_' + this.comp.version + '_collision_on.jpg';

    this.comparison['before-normal'] = require('~/assets' + beforeNormal);
    this.comparison['before-collision'] = require('~/assets' + beforeCollide);
    this.comparison['after-normal'] = require('~/assets' + afterNormal);
    this.comparison['after-collision'] = require('~/assets' + afterCollide);

    this.before = this.comparison['before-normal'];
    this.after = this.comparison['after-normal'];
  },
  methods: {
    toggleFullscreen(){
      this.fullscreen = !this.fullscreen;
    },
    exitFullscreen(){
      this.fullscreen = false;
    },
    toggleCollision(event){
      event.preventDefault();
      this.collision = !this.collision;
      if (this.collision){
        this.before = this.comparison['before-collision'];
        this.after = this.comparison['after-collision'];;
      } else {
        this.before = this.comparison['before-normal'];
        this.after = this.comparison['after-normal'];;
      }

    },
    mouseDown(event){
      if (event.which != 1){ return }
      this.active = true;
      this.mouseMove(event);
      document.addEventListener('mousemove', this.mouseMove);
      document.addEventListener('mouseup', this.mouseUp);
      event.preventDefault();
    },
    mouseUp(event){
      this.active = false;
      this.mouseMove(event);
      document.removeEventListener('mousemove', this.mouseMove);
      document.removeEventListener('mouseup', this.mouseUp);
      this.$forceUpdate();
    },
    mouseMove(event){
      let localPosX = event.x - this.$el.getBoundingClientRect().x;
      localPosX = Math.max(0, Math.min(localPosX, this.$el.clientWidth))
      this.percent = 100 - (localPosX / this.$el.clientWidth * 100);;
    },
  }
}
</script>

<style lang="scss">
$text-color: black;
$text-color: white;

$bg-color: white;
$bg-color: #333;
$bg-color2: #555;

.image-comparison {
    display: block;
    position: relative;
    overflow: hidden;
    margin-bottom: 2rem;
    border: solid $bg-color2 0.5rem;
    border-radius : 0.5rem;
    background: $bg-color2;

    .img-container {
        display: inline-block;
        position: relative;
        line-height: 0;
        cursor: col-resize;
    }
    .img-after {
        width: 100%;
        height: auto;
    }
    .image-slider {
        position: absolute;
        top: 0;
        left: 0;
        right: 50%;
        bottom: 0;

        background-position: left top;
        background-repeat: no-repeat;
        background-size: cover;

        .handle {
            position: relative;
            height: 100%;
            display: block;

            &:after {
                content: '';
                position: absolute;
                right: -0.125rem;
                top: 0;
                bottom: 0;
                width: 0.25rem;
                background: $bg-color2;
                background: $text-color;
            }
            &:before {
                content: '';
                position: absolute;
                height: 4rem;
                width: 1rem;
                top: 0;
                right: -0.5rem;
                bottom: 0;
                margin: auto;
                background: $bg-color2;
                background: $text-color;
                border-radius: 0.5rem;
            }
        }
    }
    .img-container>span {
        position: absolute;
        z-index: 3;
        background: $bg-color2;
        color: $text-color;
        font-weight: 800;
        line-height: 2.5rem;
        padding: 0 1rem;
        top: 0;

        pointer-events: none;
        &:nth-of-type(1){
            left: 0;
            border-radius: 0px 0px 0.5rem 0px;
        }
        &:nth-of-type(2){
            right: 0;
            border-radius: 0px 0px 0px 0.5rem;
        }
    }
    .img-container>.clickarea {
        position: absolute;
        z-index: 2;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
    }

    .img-header,
    .img-footer {
        position: relative;
        display: block;
        background: $bg-color2;
        color: $text-color;
    }
    .img-header {
        font-size: 1.25rem;
        font-weight: 800;
        text-align: center;
        margin-bottom: 5px;
        .toggle-fullscreen {
            float: right;
        }
    }
    .img-footer {
        margin-top: 5px;
        font-weight: 800;
        line-height: 2.5rem;
    }

    .collision-toggle {
        display: inline-block;
        top: 0;
        right: 0;
        border-radius: 0px 0px 0px 0.5rem;
        cursor: pointer;
        margin-right: 10px;

        .toggleswitch {
            box-sizing: border-box;
            position: relative;
            display: inline-block;
            z-index: 1;
            height: 1.5rem;
            width: 2.5rem;
            border: solid 2px;
	        border-color: black;
            border-color: $text-color;
            margin: -5px 0 -5px 5px;
            border-radius: 0.75rem;
            overflow: hidden;

            .switch {
	            position: relative;
                height: 1.25rem;
                width: 1.25rem;
                border: none;
                display: block;
                z-index: 1;
                left: 0;
                box-sizing: border-box;
                background: transparent;

                transition: left 0.3s;
                &.on { left: 1rem; }

                &:after {
                    border-radius: 50%;
                    content: '';
                    background: $text-color;
                    position: absolute;
                    bottom: 2px;
                    right: 2px;
                    left: 2px;
	                top: 2px;
                    margin: auto;
                    height: calc(100% - 4px);
	                width: calc(100% - 4px);
                }
            }
        }
    }
    .legend {
        display: inline-block;
        span {
            margin: 2px 1px;
            padding: 2px 8px;
            box-sizing: border-box;
        }
        .brush-magenta {
            background: #cc00aa;
        }
        .brush-purple {
            background: #8800ff;
        }
        .brush-red {
            background: #ff0000;
        }
        .wireframe {
            border: solid 2px #03f9f9;
            //margin: 2px;
            padding: 0 6px;
        }
    }
    .img-container {
        >span, .collision-toggle {
            transition: opacity 0.3s;
            opacity: 1; // 0
                        -webkit-touch-callout: none;
            -webkit-user-select: none;
            -khtml-user-select: none;
            -moz-user-select: none;
            -ms-user-select: none;
            user-select: none;
        }
        &.active {
            >span, .collision-toggle {
                opacity: 0 !important;
            }
        }
    }
    &:hover {
        .img-container>span, .collision-toggle {
            opacity: 1;
        }
    }

}

.image-comparison-fullscreen {
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    background: rgba(30,30,30,0.75);
    padding-top: 120px;
    z-index: 10;

    .img-after {
        max-height: calc(90vh - 200px);
    }
    .img-header,
    .img-footer,
    .img-after {
        max-width: 80vw;
    }
    display: flex;
    justify-content: center;
    align-items: center;

    .image-comparison {
        display: inline-block;
    }
}

@media only screen and (max-width: 800px) {
    .image-comparison-fullscreen {
        position: fixed;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
        background: rgba(30,30,30,0.75);
        z-index: 10;
    }
}

</style>
