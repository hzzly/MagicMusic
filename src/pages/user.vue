<template>
  <transition name="slide">
    <div class="user-center">
      <div class="back" @click="back">
        <i class="icon">&#xe608;</i>
      </div>
      <div class="switches-wrapper">
        <v-switches @switch="switchItem" :switches="switches" :currentIndex="currentIndex"></v-switches>
      </div>
      <div ref="playBtn" class="play" @click="playAll">
        <i class="icon">&#xe606;</i>
        <span class="text">播放全部</span>
      </div>
      <div class="list-wrapper" ref="listWrapper">
        <v-scroll
          ref="favoriteList"
          class="list-scroll"
          v-if="currentIndex === 0"
          :data="favoriteList"
        >
          <div class="list-inner">
            <v-song-list :song-lists="favoriteList" @select="selectSong" :operate="false"></v-song-list>
          </div>
        </v-scroll>
        <v-scroll ref="playList" class="list-scroll" v-if="currentIndex===1" :data="playHistory">
          <div class="list-inner">
            <v-song-list :song-lists="playHistory" @select="selectSong" :operate="false"></v-song-list>
          </div>
        </v-scroll>
      </div>
      <div class="no-result-wrapper" v-show="noResult">
        <span>{{noResultDesc}}</span>
      </div>
    </div>
  </transition>
</template>

<script type="text/ecmascript-6">
import switches from '@/components/switches'
import scroll from '@/components/scroll'
import songList from '@/components/songList'
import { mapGetters, mapActions } from 'vuex'
import { playlistMixin } from '@/common/js/mixin'

export default {
  name: 'user',
  mixins: [playlistMixin],
  components: {
    'v-switches': switches,
    'v-scroll': scroll,
    'v-song-list': songList,
  },
  data() {
    return {
      currentIndex: 0,
      switches: [
        {
          name: '我喜欢的'
        },
        {
          name: '最近听的'
        }
      ]
    }
  },
  computed: {
    noResult() {
      if (this.currentIndex === 0) {
        return !this.favoriteList.length
      } else {
        return !this.playHistory.length
      }
    },
    noResultDesc() {
      if (this.currentIndex === 0) {
        return '暂无收藏歌曲'
      } else {
        return '你还没有听过歌曲'
      }
    },
    ...mapGetters([
      'favoriteList',
      'playHistory'
    ])
  },
  methods: {
    handlePlaylist(playlist) {
      const bottom = playlist.length > 0 ? '1.5rem' : ''
      this.$refs.listWrapper.style.bottom = bottom
      this.$refs.favoriteList && this.$refs.favoriteList.refresh()
      this.$refs.playList && this.$refs.playList.refresh()
    },
    switchItem(index) {
      this.currentIndex = index
    },
    selectSong(song) {
      this.selectPlaySong(song)
    },
    back() {
      this.$router.back()
    },
    playAll() {
      this.playAllList(this.playHistory)
    },
    ...mapActions([
      'selectPlaySong',
      'playAllList'
    ])
  },
}
</script>

<style scoped lang="scss">
@import "../assets/css/function";
.user-center {
  position: fixed;
  top: 0;
  bottom: 0;
  z-index: 100;
  width: 100%;
  background: rgb(8, 5, 58);

  &.slide-enter-active,
  &.slide-leave-active {
    transition: all 0.3s;
  }

  &.slide-enter,
  &.slide-leave-to {
    transform: translate3d(100%, 0, 0);
  }

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

  .switches-wrapper {
    margin: px2rem(20px) 0 px2rem(60px) 0;
  }

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

  .list-wrapper {
    position: absolute;
    top: px2rem(220px);
    bottom: 0;
    width: 100%;

    .list-scroll {
      height: 100%;
      overflow: hidden;

      .list-inner {
        padding: px2rem(40px) px2rem(60px);
      }
    }
  }

  .no-result-wrapper {
    position: absolute;
    width: 100%;
    top: 50%;
    transform: translateY(-50%);
    text-align: center;
    font-size: 14px;
    color: hsla(0,0%,100%,.3);
  }
}
</style>