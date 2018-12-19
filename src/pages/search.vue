<template>
  <div class="search">
    <div class="search-box-wrapper">
      <search-box ref="searchBox" @query="onQueryChange"></search-box>
    </div>
    <div ref="shortcutWrapper" class="shortcut-wrapper" v-show="!query">
      <v-scroll :refreshDelay="refreshDelay" ref="shortcut" class="shortcut" :data="shortcut">
        <div>
          <div class="hot-key">
            <h1 class="title">热门搜索</h1>
            <ul>
              <li
                @click="addQuery(item.first)"
                class="item"
                v-for="(item, index) in hotKey"
                :key="index"
              >
                <span>{{item.first}}</span>
              </li>
            </ul>
          </div>
          <div class="search-history" v-show="searchHistory.length">
            <h1 class="title">
              <span class="text">搜索历史</span>
              <span @click="showConfirm" class="clear">
                <i class="icon-clear"></i>
              </span>
            </h1>
            <!-- <search-list @delete="deleteSearchHistory" @select="addQuery" :searches="searchHistory"></search-list> -->
          </div>
        </div>
      </v-scroll>
    </div>
    <div class="search-result" v-show="query" ref="searchResult">
      <v-suggest @listScroll="blurInput" @select="saveSearch" ref="suggest" :query="query"></v-suggest>
    </div>
    <!-- <confirm ref="confirm" @confirm="clearSearchHistory" text="是否清空所有搜索历史" confirmBtnText="清空"></confirm> -->
    <router-view></router-view>
  </div>
  <!-- <div class="search">
    <div class="head">
      <div class="h-icon" @click="_back" v-if="!show">
        <i class="icon">&#xe608;</i>
      </div>
      <div class="h-icon" @click="_show" v-else>
        <i class="icon">&#xe608;</i>
      </div>
      <div class="input">
        <input type="text" v-model="keywords" placeholder="搜索音乐、歌手">
      </div>
      <div class="h-icon" @click="_search()">
        <i class="icon">&#xe638;</i>
      </div>
    </div>
    <div class="search-list">
      <v-music-list :music-lists="searchLists" v-if="show"></v-music-list>
      <div class="hot-key" v-else>
        <div class="title">热门搜索</div>
        <div class="hot-list">
          <ul>
            <li v-for="(item, index) in hotList" :key="index" @click="_search(item)">{{item}}</li>
          </ul>
        </div>
        <div class="search-history">
          <transition-group name="slide" tag="div" class="list-wrapper">
            <div class="item" v-for="(item, index) in searchHistory" :key="'a'+index">
              <p @click="_search(item)">
                <i class="icon">&#xe613;</i>
                <span>{{item}}</span>
              </p>
              <div class="delete" @click="_delete(index)">
                <i class="icon">&#xe656;</i>
              </div>
            </div>
          </transition-group>
        </div>
      </div>
    </div>
  </div>-->
</template>

<script>
// import SearchList from 'base/search-list/search-list'
import searchBox from '@/components/searchBox'
import scroll from '@/components/scroll'
import { playlistMixin, searchMixin } from 'common/js/mixin'
// import Confirm from 'base/confirm/confirm'
import suggest from '@/components/suggest'
import api from '@/api'

import { mapActions, mapGetters } from 'vuex'


export default {
  name: 'search',
  components: {
    'v-scroll': scroll,
    'search-box': searchBox,
    'v-suggest': suggest
  },
  mixins: [playlistMixin, searchMixin],
  data() {
    return {
      hotKey: [],
    }
  },
  computed: {
    ...mapGetters([
      'searchHistory'
    ]),
    shortcut() {
      return this.hotKey.concat(this.searchHistory)
    }
  },
  created() {
    this.limit = 10
    this._getHotKey()
  },
  methods: {
    handlePlaylist(playlist) {
      const bottom = playlist.length > 0 ? '60px' : ''

      this.$refs.searchResult.style.bottom = bottom
      this.$refs.suggest.refresh()

      this.$refs.shortcutWrapper.style.bottom = bottom
      this.$refs.shortcut.refresh()
    },
    showConfirm() {
      // this.$refs.confirm.show()
    },
    _getHotKey() {
      api.HotSearchKey().then((res) => {
        if (res.code === 200) {
          this.hotKey = res.result.hots.slice(0, 10)
        }
      })
    },
    ...mapActions([
      'clearSearchHistory'
    ])
  },
  watch: {
    query(newQuery) {
      if (!newQuery) {
        setTimeout(() => {
          this.$refs.shortcut.refresh()
        }, 20)
      }
    }
  },
  // components: {
  //   'v-music-list': musicList,
  // },
  // data() {
  //   return {
  //     show: false,
  //     keywords: '',
  //     searchLists: [],
  //     hotLists: ['暧昧', '成都', '童话镇', '刚好遇见你', '告白气球', '前端', '演员', 'Fade', 'See You Again', '咱们屯里人(粤语版)', '南山南', '薛之谦', '李玉刚', '汪峰', '周杰伦'],
  //     searchHistory: localStorage.searchHistory ? JSON.parse(localStorage.searchHistory) : ['前端', '童话镇', '刚好遇见你']
  //   }
  // },
  // created() {
  //   if (!localStorage.searchHistory) {
  //     let searchHistory = ['前端', '童话镇', '刚好遇见你']
  //     localStorage.searchHistory = JSON.stringify(searchHistory)
  //   }
  // },
  // computed: {
  //   hotList() {
  //     let s = new Set()
  //     for (let i = 0; i < 6; i++) {
  //       let arrIndex = Math.floor(Math.random() * this.hotLists.length)
  //       s.add(this.hotLists[arrIndex])
  //     }
  //     return [...s]
  //   },
  //   searchHistorys() {
  //     return localStorage.searchHistory ? JSON.parse(localStorage.searchHistory) : ['前端', '童话镇', '刚好遇见你']
  //   }
  // },
  // methods: {
  //   _back() {
  //     window.history.back()
  //   },
  //   _show() {
  //     this.show = false
  //   },
  //   _search(keywords) {
  //     this.show = true
  //     this.$store.dispatch('setShowLoading', true)
  //     if (this.keywords) {
  //       localStorage.searchHistory = JSON.stringify([this.keywords, ...JSON.parse(localStorage.searchHistory)])
  //     }
  //     let searchHistory = JSON.parse(localStorage.searchHistory)
  //     let find = searchHistory.findIndex((val) => {
  //       return val === keywords
  //     })
  //     find === -1 ? localStorage.searchHistory = JSON.stringify([keywords, ...searchHistory]) : ''
  //     this.searchLists = []
  //     let key = keywords ? keywords : this.keywords
  //     api.MusicSearch(key)
  //       .then(res => {
  //         this.searchLists = res.result.songs
  //         setTimeout(() => {
  //           this.$store.dispatch('setShowLoading', false)
  //         }, 500)
  //       })
  //   },
  //   _delete(index) {
  //     let searchHistory = JSON.parse(localStorage.searchHistory)
  //     searchHistory.forEach((item, sindex) => {
  //       index === sindex ? searchHistory.splice(index, 1) : ''
  //     })
  //     localStorage.searchHistory = JSON.stringify(searchHistory)
  //     this.searchHistory.splice(index, 1)
  //   }
  // }
}
</script>

<style lang="scss" scoped>
@import "../assets/css/function.scss";
.search {
  .search-box-wrapper {
    margin: px2rem(40px);
  }
  .shortcut-wrapper {
    position: fixed;
    top: px2rem(360px);
    bottom: 0;
    width: 100%;
    .shortcut {
      height: 100%;
      overflow: hidden;
      .hot-key {
        margin: 0 px2rem(40px) px2rem(40px) px2rem(40px);
        .title {
          margin-bottom: px2rem(40px);
          font-size: 14px;
          color: hsla(0,0%,100%,.5);
        }
        .item {
          display: inline-block;
          padding: px2rem(10px) px2rem(20px);
          margin: 0 px2rem(20px) px2rem(20px) 0;
          border-radius: 6px;
          background: #2f3054;
          font-size: 14px;
          color: hsla(0,0%,100%,.3);
        }
      }
      .search-history {
        position: relative;
        margin: 0 px2rem(40px);
        .title {
          display: flex;
          align-items: center;
          height: px2rem(80px);
          font-size: 14px;
          color: hsla(0,0%,100%,.5);
          .text {
            flex: 1;
          }
          .clear {
            // extend-click()
            .icon-clear {
              font-size: 14px;
              color: hsla(0,0%,100%,.3);
            }
          }
        }
      }
    }
  }
  .search-result {
    position: fixed;
    width: 100%;
    top: px2rem(360px);
    bottom: 0;
  }
}

// .search {
//   display: flex;
//   flex-direction: column;
//   height: 100%;
//   .head {
//     height: px2rem(100px);
//     line-height: px2rem(100px);
//     text-align: center;
//     background: #28224e;
//     display: flex;
//     justify-content: space-between; // box-shadow: 0 10px 20px rgba(0, 0, 0, .8);
//     border-bottom: 1px solid rgba(255, 255, 255, 0.3);
//     .h-icon {
//       width: px2rem(100px);
//       cursor: pointer;
//       .icon {
//         font-size: px2rem(46px);
//       }
//     }
//     .input {
//       flex: 1;
//       input {
//         width: 100%;
//         box-sizing: border-box;
//         border: none;
//         outline: none;
//         height: 60%;
//         margin-top: px2rem(20px);
//         background: rgba(0, 0, 0, 0.4);
//         color: #fff;
//         font-size: px2rem(32px);
//         padding: 0 px2rem(25px);
//         border-radius: px2rem(50px);
//       }
//     }
//   }
//   .search-list {
//     flex: 1;
//     overflow: auto;
//     overflow-x: hidden;
//     background: #28224e;
//     .hot-key {
//       color: rgba(255, 255, 255, 0.7);
//       padding: px2rem(20px);
//       .title {
//         font-size: ppx2rem(22px);
//         line-height: px2rem(50px);
//       }
//       .hot-list {
//         ul {
//           display: flex;
//           flex-wrap: wrap;
//           li {
//             padding: px2rem(10px) px2rem(26px);
//             font-size: px2rem(26px);
//             color: rgba(255, 255, 255, 0.9);
//             border: 1px solid rgba(255, 255, 255, 0.3);
//             margin-right: px2rem(20px);
//             border-radius: px2rem(30px);
//             margin-bottom: px2rem(20px);
//             cursor: pointer;
//             &:first-child {
//               border-color: #eb234a;
//             }
//           }
//         }
//       }
//       .search-history {
//         flex: 1;
//         overflow: auto;
//         .item {
//           display: flex;
//           justify-content: space-between;
//           height: px2rem(80px);
//           line-height: px2rem(80px);
//           // margin: 0 px2rem(20px);
//           padding-left: px2rem(15px);
//           border-bottom: 1px solid rgba(255, 255, 255, 0.1);
//           font-size: px2rem(26px);
//           color: #fff;
//           cursor: pointer;
//           p {
//             flex: 1;
//             .icon {
//               font-size: px2rem(44px);
//               vertical-align: middle;
//             }
//             span {
//               vertical-align: middle;
//             }
//           }
//           .delete {
//             width: px2rem(100px);
//             text-align: right;
//             box-sizing: border-box;
//             padding-right: px2rem(20px);
//           }
//           &.slide-move {
//             transition: all 1s;
//           }
//           &.slide-enter {
//             transform: translate3d(-100%, 0, 0);
//             opacity: 0;
//           }
//           &.slide-leave-active {
//             position: absolute;
//             transform: translate3d(-100%, 0, 0);
//           }
//         }
//       }
//     }
//   }
// }
</style>