<template>
<div class="image-comparison">
  <div class="img-container" v-on:mousedown="mouseDown">
    <img class="img-after" :src="after">
    <div class="image-slider"
         :style="{right: percent + '%',
                 backgroundImage: 'url(' + before + ')'}">
      <div class="handle"></div>
    </div>
  </div>
  <div class="collision-toggle" v-on:click="toggleCollision">
    Display collisions
    <div class="toggleswitch"><div class="switch" :class="{'on': collision}"></div></div>
  </div>
  <span>Before</span>
  <span>After</span>
</div>
</template>

<script>
export default {
  name: 'image-comparison',
  props: {
    comp: null,
  },
  data(){
    return {
      before: null,
      after: null,
      percent: 50,
      collision: false
    }
  },
  created(){
    this.beforeNormal = require('~/assets/images/' + this.comp['before-normal']);
    this.afterNormal = require('~/assets/images/' + this.comp['after-normal']);
    this.beforeCollision = require('~/assets/images/' + this.comp['before-collision']);
    this.afterCollision = require('~/assets/images/' + this.comp['after-collision']);
    this.before = this.beforeNormal;
    this.after = this.afterNormal;
  },
  methods: {
    toggleCollision(event){
      event.preventDefault();
      this.collision = !this.collision;
      if (this.collision){
        this.before = this.beforeCollision;
        this.after = this.afterCollision;
      } else {
        this.before = this.beforeNormal;
        this.after = this.afterNormal;
      }

    },
    mouseDown(event){
      if (event.which != 1){ return }
      this.mouseMove(event);
      document.addEventListener('mousemove', this.mouseMove);
      document.addEventListener('mouseup', this.mouseUp);
      event.preventDefault();
    },
    mouseUp(event){
      this.mouseMove(event);
      document.removeEventListener('mousemove', this.mouseMove);
      document.removeEventListener('mouseup', this.mouseUp);
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
.image-comparison {
    display: block;
    position: relative;
    overflow: hidden;
    margin-bottom: 30px;
    border: solid white 7px;
    border-radius : 7px;

    .img-container {
        position: relative;
        line-height: 0;
        cursor: col-resize;
    }

    .img-after {
        width: 100%;
        height: auto;
    }
    .img-before {
        width: auto;
        height: 100%;
        display: none;
    }
    .img-before {
        position: absolute;
        top: 0;
        left: 0;
    }
    .image-slider {
        position: absolute;
        top: 0;
        left: 0;
        right: 50%;
        bottom: 0;

        background-position: left top; /* Center the image */
        background-repeat: no-repeat; /* Do not repeat the image */
        background-size: cover; /* Resize the background image to cover the entire container */

        .handle {
            position: relative;
            height: 100%;
            display: block;

            &:after {
                content: '';
                position: absolute;
                right: -2px;
                top: 0;
                bottom: 0;
                width: 4px;
                background: white;
            }
            &:before {
                content: '';
                position: absolute;
                height: 60px;
                width: 14px;
                top: 0;
                right: -7px;
                bottom: 0;
                margin: auto;
                background: white;
                border-radius: 7px;
            }
        }
    }
    >span, .collision-toggle {
        position: absolute;
        background: rgba(255, 255, 255, 1);
        color: black;
        font-weight: 800;
        line-height: 40px;
        padding: 0 15px;
    }
    >span {
        bottom: 0;
        pointer-events: none;
        &:nth-of-type(1){
            left: 0;
            border-radius: 0px 10px 0px 0px;
        }
        &:nth-of-type(2){
            right: 0;
            border-radius: 10px 0px 0px 0px;
        }
    }

    .collision-toggle {
        top: 0;
        right: 0;
        border-radius: 0px 0px 0px 10px;
        cursor: pointer;

        .toggleswitch {
            box-sizing: border-box;
            position: relative;
            display: inline-block;
            z-index: 1;
            height: 24px;
            width: 40px;
            border: solid 2px;
	        border-color: black;
            margin: -5px 0 -5px 5px;
            border-radius: 12px;
            overflow: hidden;

            .switch {
	            position: relative;
                height: 20px;
                width: 20px;
                border: none;
                display: block;
                z-index: 1;
                left: 0;
                box-sizing: border-box;
                background: transparent;

                transition: left 0.3s;
                &.on { left: 16px; }

                &:after {
                    border-radius: 50%;
                    content: '';
                    background: black;
                    position: absolute;
                    bottom: 2px;
                    right: 2px;
                    left: 2px;
	                top: 2px;
                    margin: auto;
                    height: 16px;
	                width: 16px;
                }
            }
        }
    }
    >span, .collision-toggle {
        transition: opacity 0.3s;
        opacity: 0;
        -webkit-touch-callout: none;
        -webkit-user-select: none;
        -khtml-user-select: none;
        -moz-user-select: none;
        -ms-user-select: none;
        user-select: none;
    }
    &:hover {
        >span, .collision-toggle {
            opacity: 1;
        }
    }
}

</style>
