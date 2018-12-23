<template>
  <transition name="move">
    <div class="menu" v-show="song.menuShow">
      <div class="inner inner-1" @click.stop="_add">
        <i class="icon">&#xe639;</i>
      </div>
      <div class="inner inner-2" @click.stop="_share(index)">
        <i class="icon">&#xe64c;</i>
      </div>
      <div class="inner inner-3" @click.stop="_love(index)">
        <i class="icon">&#xe615;</i>
      </div>
    </div>
  </transition>
</template>

<script>
import Vue from 'vue'
import { mapGetters } from 'vuex'
import { findIndex } from '@/common/js/util'

const EVENT_ADD = 'add'

export default {
  props: {
    song: Object,
    index: Number
  },
  computed: {
    ...mapGetters([
      'playList'
    ])
  },
  methods: {
    _love(index) {
      this.$toast('开发中，敬请期待...')
    },
    _add(e) {
      let fpIndex = findIndex(this.playList, this.song)
      if (fpIndex > -1) {
        this.$toast('播放列表中已存在')
      } else {
        this.$emit('add', e.target)
        this.$store.dispatch('addPlayList', this.song)
      }
      Vue.set(this.song, 'menuShow', false)
    },
    _share(index) {
      this.$toast('开发中，敬请期待...')
    }
  }
}
</script>

<style lang="scss" scoped>
@import "../assets/css/function.scss";
.menu {
  position: absolute;
  right: px2rem(130px);
  top: px2rem(20px);
  transition: all 0.7s ease-in;
  &.move-enter-active {
    .inner {
      transform: translate3d(0, 0, 0);
      transition-timing-function: cubic-bezier(0, 0.57, 0.44, 1.97);
    }
    .inner-1 {
      transition-delay: 0.1s;
    }
    .inner-2 {
      transition-delay: 0.2s;
    }
    .inner-3 {
      transition-delay: 0.3s;
    }
  }
  &.move-enter,
  &.move-leave-active {
    .inner {
      transition-timing-function: ease-in-out;
      opacity: 0;
    }
    .inner-1 {
      transform: translate3d(px2rem(20px), 0, 0);
      transition-delay: 0.3s;
    }
    .inner-2 {
      transform: translate3d(px2rem(100px), 0, 0);
      transition-delay: 0.2s;
    }
    .inner-3 {
      transform: translate3d(px2rem(180px), 0, 0);
      transition-delay: 0.1s;
    }
  }
  .inner {
    display: inline-block;
    position: absolute;
    width: px2rem(60px);
    height: px2rem(60px);
    line-height: px2rem(62px);
    border-radius: 50%;
    background: rgba(255, 255, 255, 0.1);
    text-align: center;
    color: #fff;
    cursor: pointer;
    z-index: 100;
    transition: all 0.4s;
  }
  .inner-1 {
    left: px2rem(-20px);
  }
  .inner-2 {
    left: px2rem(-100px);
  }
  .inner-3 {
    left: px2rem(-180px);
  }
}
</style>