<template>
  <div class="popular" ref="popular">
    <v-scroll
      ref="scroll"
      class="popular-content"
      :data="discLists"
      :pullup="true"
      @scrollToEnd="scrollToEnd"
    >
      <div>
        <v-banner v-if="banners.length > 0" :images="banners"></v-banner>
        <div class="recommend-list">
          <h1 class="list-title">热门歌单推荐</h1>
          <ul>
            <li
              @click="selectItem(item)"
              v-for="(item, index) in discLists"
              :key="index"
              class="item"
            >
              <div class="icon">
                <img width="60" height="60" v-lazy="item.coverImgUrl">
              </div>
              <div class="text">
                <h2 class="name" v-html="item.name"></h2>
                <p class="desc" v-html="item.description"></p>
              </div>
            </li>
          </ul>
        </div>

        <!-- <v-music-list :music-lists="popularLists"></v-music-list> -->
      </div>
      <!-- <div>
        <div class="slider-wrapper">
          <div class="slider-content">
            <slider ref="slider">
              <div v-for="item in recommends">
                <a :href="item.linkUrl">
                  <img @load="loadImage" :src="item.picUrl">
                </a>
              </div>
            </slider>
          </div>
        </div>
        <div class="recommend-list">
          <h1 class="list-title">热门歌单推荐</h1>
          <ul>
            <li @click="selectItem(item)" v-for="(item, index) in discList" :key="index" class="item">
              <div class="icon">
                <img width="60" height="60" v-lazy="item.imgurl">
              </div>
              <div class="text">
                <h2 class="name" v-html="item.creator.name"></h2>
                <p class="desc" v-html="item.dissname"></p>
              </div>
            </li>
          </ul>
        </div>
      </div>
      <div class="loading-container" v-show="!discList.length">
        <loading></loading>
      </div>-->
    </v-scroll>
    <router-view></router-view>
  </div>
  <!-- <v-music-list :music-lists="popularLists"></v-music-list> -->
</template>

<script>

import banner from '@/components/banner'
import scroll from '@/components/scroll'
import musicList from '@/components/musicList'
import { playlistMixin } from '@/common/js/mixin'

import { mapGetters } from 'vuex'

export default {
  name: 'recommend',
  mixins: [playlistMixin],
  components: {
    'v-banner': banner,
    'v-scroll': scroll,
    'v-music-list': musicList,
  },
  data() {
    return {
      pullup: true
    }
  },
  computed: {
    ...mapGetters([
      'discLists',
      'banners',
      'listenLists'
    ]),
  },
  created() {
    this.limit = 10
    if (this.discLists.length === 0) {
      this.$store.dispatch('getDiscLists', { limit: this.limit })
    }
    if (this.banners.length === 0) {
      this.$store.dispatch('getBanners')
    }
  },
  mounted() {
    // let audioDOM = document.querySelector('audio')
    // audioDOM.addEventListener('loadedmetadata', () => {
    //   // this.$store.dispatch('setPlaying', true)
    //   // this.$store.dispatch('setShowPlayLoading', false)
    //   this.$store.dispatch('getMusicTime', audioDOM.duration)
    // })
  },
  methods: {
    selectItem(item) {
      this.$router.push({
        path: `/recommend/${item.id}`
      })
    },
    scrollToEnd() {
      this.limit += 10
      this.$store.dispatch('getDiscLists', { limit: this.limit });
    },
    handlePlaylist(listenLists) {
      const bottom = listenLists.length > 0 ? '1.5rem' : ''

      this.$refs.popular.style.bottom = bottom
      this.$refs.scroll.refresh()
    },
  },
  watch: {
    pullUpLoadObj: {
      handler() {
        this.rebuildScroll()
      },
      deep: true
    },
  }
}
</script>

<style lang="scss" scoped>
@import "../assets/css/function.scss";
.popular {
  position: fixed;
  width: 100%;
  top: px2rem(176px);
  bottom: 0;
  z-index: 10;
  .popular-content {
    height: 100%;
    overflow: hidden;
    .recommend-list {
      .list-title {
        height: px2rem(120px);
        line-height: px2rem(130px);
        text-align: center;
        font-size: 14px;
        color: #ea2448;
      }
      .item {
        display: flex;
        box-sizing: border-box;
        align-items: center;
        padding: 0 px2rem(40px) px2rem(40px) px2rem(40px);
        .icon {
          flex: 0 0 px2rem(120px);
          width: px2rem(120px);
          padding-right: px2rem(40px);
        }
        .text {
          display: flex;
          flex-direction: column;
          justify-content: center;
          flex: 1;
          line-height: px2rem(40px);
          overflow: hidden;
          font-size: 14px;
          .name {
            margin-bottom: px2rem(20px) x;
            color: #fff;
          }
          .desc {
            color: hsla(0, 0%, 100%, 0.3);
            overflow: hidden;
            text-overflow: ellipsis;
            display: -webkit-box;
            -webkit-line-clamp: 2;
            -webkit-box-orient: vertical;
          }
        }
      }
    }
  }
}
</style>
