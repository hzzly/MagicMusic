<template>
  <div class="slide-wrapper">
    <div class="slide-content">
      <slide
        ref="slide"
        :autoPlay="isAutoPlay"
        :loop="isLoop"
        :showDot="isShowDot"
        :interval="interval"
        :threshold="threshold"
        :speed="speed"
      >
        <div v-for="(item, index) in images" :key="index" class="slide-item">
          <a :href="item.imageUrl">
            <img :src="item.imageUrl">
          </a>
        </div>
      </slide>
    </div>
  </div>
</template>
<script>

import slide from '@/components/slide'

export default {
  name: 'banner',
  components: {
    slide,
  },
  props: {
    images: {
      require: true,
      type: Array
    },
    isAutoPlay: {
      type: Boolean,
      default: true
    },
    isLoop: {
      type: Boolean,
      default: true
    },
    isShowDot: {
      type: Boolean,
      default: true
    },
    speed: {
      type: Number,
      default: 400
    },
    threshold: {
      default: 0.3
    },
    interval: {
      type: Number,
      default: 4000
    }
  },
}
</script>
<style lang="scss">
@import "../assets/css/function";
.slide-wrapper {
  position: relative;
  width: 100%;
  height: px2rem(350px);
  background: rgba(8, 5, 58, 0.9);
  .slide-content {
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    width: 100%;
    height: 100%;
  }
}
</style>