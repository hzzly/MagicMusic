<template>
  <div class="recommend" ref="recommend">
    <v-scroll
      ref="scroll"
      class="recommend-content"
      :data="discList"
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
              v-for="(item, index) in discList"
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
      </div>
    </v-scroll>
    <router-view></router-view>
  </div>
</template>

<script>

import banner from '@/components/banner'
import scroll from '@/components/scroll'
import musicList from '@/components/musicList'
import { playlistMixin } from '@/common/js/mixin'
import api from '@/api'

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
      pullup: true,
      discList: []
    }
  },
  computed: {
    ...mapGetters([
      'banners',
      'playList'
    ]),
  },
  created() {
    this.limit = 10
    if (this.banners.length === 0) {
      this.$store.dispatch('getBanners')
    }
    this._getDiscList({ limit: this.limit })
  },
  methods: {
    _getDiscList(params) {
      api.DiscLists(params).then(res => {
        if (res.code === 200) {
          this.discList = res.playlists
        }
      })
    },
    selectItem(item) {
      this.$router.push({
        path: `/recommend/${item.id}`
      })
    },
    scrollToEnd() {
      this.limit += 10
      this._getDiscList({ limit: this.limit })
    },
    handlePlaylist(playList) {
      const bottom = playList.length > 0 ? '1.5rem' : ''

      this.$refs.recommend.style.bottom = bottom
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
.recommend {
  position: fixed;
  width: 100%;
  top: px2rem(176px);
  bottom: 0;
  .recommend-content {
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
