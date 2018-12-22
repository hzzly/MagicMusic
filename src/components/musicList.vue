<template>
  <div class="music-list">
    <div class="back" @click="back">
      <i class="icon">&#xe608;</i>
    </div>
    <h1 class="title" v-html="title"></h1>
    <div class="bg-image" :style="bgStyle" ref="bgImage">
      <div class="play-wrapper">
        <div ref="playBtn" v-show="songs.length>0" class="play" @click="playAll">
          <i class="icon">&#xe606;</i>
          <span class="text">播放全部</span>
        </div>
      </div>
      <div class="filter" ref="filter"></div>
    </div>
    <div class="bg-layer" ref="layer"></div>
    <v-scroll
      :data="songs"
      @scroll="scroll"
      :listen-scroll="listenScroll"
      :probe-type="probeType"
      class="list"
      ref="list"
    >
      <div class="song-list-wrapper">
        <v-song-list :song-lists="songs" v-show="songs.length > 0"></v-song-list>
      </div>
    </v-scroll>
  </div>
</template>

<script>
import scroll from '@/components/scroll'
import songList from '@/components/songList'
import { playlistMixin } from '@/common/js/mixin'
import { prefixStyle } from '@/common/js/dom'

const RESERVED_HEIGHT = 46
const transform = prefixStyle('transform')
const backdrop = prefixStyle('backdrop-filter')

export default {
  mixins: [playlistMixin],
  components: {
    'v-scroll': scroll,
    'v-song-list': songList,
  },
  props: {
    bgImage: {
      type: String,
      default: ''
    },
    songs: {
      type: Array,
      default: []
    },
    title: {
      type: String,
      default: ''
    },
    rank: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      scrollY: 0
    }
  },
  computed: {
    bgStyle() {
      return `background-image:url(${this.bgImage})`
    }
  },
  created() {
    this.probeType = 3
    this.listenScroll = true
  },
  mounted() {
    this.imageHeight = this.$refs.bgImage.clientHeight
    this.minTransalteY = -this.imageHeight + RESERVED_HEIGHT
    this.$refs.list.$el.style.top = `${this.imageHeight}px`
  },
  methods: {
    handlePlaylist(playlist) {
      const bottom = playlist.length > 0 ? '1.5rem' : ''
      this.$refs.list.$el.style.bottom = bottom
      this.$refs.list.refresh()
    },
    scroll(pos) {
      this.scrollY = pos.y
    },
    back() {
      this.$router.back()
    },
    playAll() {
      this.$store.dispatch('playAllList', this.songs)
    },
  },
  watch: {
    scrollY(newVal) {
      let translateY = Math.max(this.minTransalteY, newVal)
      let scale = 1
      let zIndex = 0
      let blur = 0
      const percent = Math.abs(newVal / this.imageHeight)
      if (newVal > 0) {
        scale = 1 + percent
        zIndex = 10
      } else {
        blur = Math.min(20, percent * 20)
      }

      this.$refs.layer.style[transform] = `translate3d(0,${translateY}px,0)`
      this.$refs.filter.style[backdrop] = `blur(${blur}px)`
      if (newVal < this.minTransalteY) {
        zIndex = 10
        this.$refs.bgImage.style.paddingTop = 0
        this.$refs.bgImage.style.height = `${RESERVED_HEIGHT}px`
        this.$refs.playBtn.style.display = 'none'
      } else {
        this.$refs.bgImage.style.paddingTop = '70%'
        this.$refs.bgImage.style.height = 0
        this.$refs.playBtn.style.display = ''
      }
      this.$refs.bgImage.style[transform] = `scale(${scale})`
      this.$refs.bgImage.style.zIndex = zIndex
    }
  }
}
</script>

<style lang="scss" scoped>
@import "../assets/css/function.scss";
.music-list {
  position: fixed;
  z-index: 100;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  background: rgb(8, 5, 58);
  .back {
    position: absolute;
    top: 0;
    line-height: px2rem(100px);
    z-index: 50;
    .icon {
      display: block;
      padding: 0 px2rem(30px);
      font-size: 22px;
    }
  }
  .title {
    position: absolute;
    top: 0;
    left: px2rem(100px);
    z-index: 40;
    width: 80%;
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
    line-height: px2rem(100px);
    font-size: 18px;
    color: #fff;
  }
  .bg-image {
    position: relative;
    width: 100%;
    height: 0;
    padding-top: 70%;
    transform-origin: top;
    background-size: cover;
    .play-wrapper {
      position: absolute;
      bottom: px2rem(60px);
      z-index: 50;
      width: 100%;
      .play {
        box-sizing: border-box;
        width: px2rem(240px);
        padding: px2rem(10px) 0;
        margin: 0 auto;
        text-align: center;
        border: 1px solid #ea2448;
        color: #ea2448;
        border-radius: px2rem(200px);
        font-size: 0;
        .icon {
          display: inline-block;
          vertical-align: middle;
          margin-right: 6px;
          font-size: 16px;
          color: #ea2448;
        }
        .text {
          display: inline-block;
          vertical-align: middle;
          font-size: 12px;
        }
      }
    }
    .filter {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: rgba(7, 17, 27, 0.4);
    }
  }
  .bg-layer {
    position: relative;
    height: 100%;
    background: rgb(8, 5, 58);
  }
  .list {
    position: absolute;
    top: 0;
    bottom: 0;
    width: 100%;
    background: rgb(8, 5, 58);
    .song-list-wrapper {
      padding: px2rem(30px) px2rem(50px);
    }
  }
}
</style>
