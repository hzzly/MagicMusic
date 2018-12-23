<template>
  <transition name="list-fade">
    <div class="play-list" @click="_close" v-show="showFlag">
      <div class="play-wraper">
        <div class="num">
          <span>
            <i class="icon">&#xe6ae;</i>
            循环播放({{playList.length}}首)
          </span>
          <span @click.stop="_removeAll">
            <i class="icon">&#xe612;</i> 清空
          </span>
        </div>
        <v-scroll :data="playList" ref="listContent" class="list">
          <transition-group name="slide" tag="div">
            <div class="item" v-for="(item, index) in playList" :key="index">
              <p :class="{'current': currentIndex == index}" @click="_play(item, index)">
                {{item.name}}
                <span v-if="item.ar">· {{item.ar[0].name}}</span>
                <span v-else>· {{item.artists[0].name}}</span>
                <i class="icon" v-show="currentIndex == index">&#xe641;</i>
              </p>
              <div class="delete" @click.stop="_delete(index)">
                <i class="icon">&#xe656;</i>
              </div>
            </div>
          </transition-group>
        </v-scroll>
        <div class="close" @click="_close">关闭</div>
      </div>
      <v-confirm ref="confirm" @confirm="clearPlayList" text="是否清空播放列表" confirmBtnText="清空"></v-confirm>
    </div>
  </transition>
</template>

<script>

import scroll from '@/components/scroll'
import confirm from '@/components/confirm'
import { mapGetters } from 'vuex'

export default {
  components: {
    'v-scroll': scroll,
    'v-confirm': confirm
  },
  data() {
    return {
      showFlag: false
    }
  },
  methods: {
    show() {
      this.showFlag = true
      setTimeout(() => {
        this.$refs.listContent.refresh()
      }, 20)
    },
    clearPlayList() {
      this.showFlag = false
      this.$store.dispatch('setPlaying', false)
      this.$store.dispatch('removeAllPlayList')
    },
    _close() {
      this.showFlag = false
    },
    _removeAll() {
      this.$refs.confirm.show()
    },
    _play(music, index) {
      if (this.currentIndex === index) {
        return
      }
      this.showFlag = false
      this.$store.dispatch('selectPlaySong', music)
    },
    _delete(index) {
      this.$store.dispatch('removePlayList', index)
    },
  },
  computed: {
    ...mapGetters([
      'playList',
      'currentIndex',
    ]),
  },
}
</script>

<style lang="scss" scoped>
@import "../assets/css/function.scss";
.play-list {
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  z-index: 200;
  background-color: rgba(0, 0, 0, 0.5);
  &.list-fade-enter-active, &.list-fade-leave-active {
    transition: opacity 0.3s;
    .play-wraper {
      transition: all 0.3s;
    }
  }
  &.list-fade-enter, &.list-fade-leave-to {
    opacity: 0;
    .play-wraper {
      transform: translate3d(0, 100%, 0);
    }
  }
  // &.list-fade-enter {}
  .play-wraper {
    position: absolute;
    left: 0;
    bottom: 0;
    width: 100%;
    background: rgba(0, 0, 0, 0.8);
    .num {
      display: flex;
      justify-content: space-between;
      height: px2rem(90px);
      line-height: px2rem(90px);
      font-size: px2rem(28px);
      span {
        padding: 0 px2rem(30px);
        .icon {
          font-size: px2rem(34px);
        }
      }
    }
    .list {
      max-height: px2rem(800px);
      overflow: hidden;
      .item {
        display: flex;
        justify-content: space-between;
        height: px2rem(80px);
        line-height: px2rem(80px);
        margin: 0 px2rem(20px);
        padding-left: px2rem(15px);
        border-top: 1px solid rgba(255, 255, 255, 0.3);
        font-size: px2rem(26px);
        color: #fff;
        cursor: pointer;
        p {
          flex: 1;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
          span {
            color: rgba(255, 255, 255, 0.6);
            font-size: px2rem(24px);
          }
          &.current {
            color: #eb234a;
            span,
            .icon {
              color: #eb234a;
              padding-right: px2rem(20px);
            }
          }
        }
        .delete {
          width: px2rem(100px);
          text-align: right;
          box-sizing: border-box;
          padding-right: px2rem(20px);
        }

        .slide-enter-active,
        .slide-leave-active {
          transition: all 2s;
        }

        .slide-enter,
        .slide-leave-to {
          height: 0;
        }
        // &.slide-move {
        //   transition: all 1s;
        // }
        // // &.slide-enter {
        // //   transform: translate3d(-100%, 0, 0);
        // //   opacity: 0;
        // // }
        // &.slide-leave-active {
        //   // position: absolute;
        //   transform: translate3d(-100%, 0, 0);
        //   opacity: 0;
        // }
      }
    }

    .close {
      height: px2rem(90px);
      line-height: px2rem(90px);
      text-align: center;
      font-size: px2rem(24px);
      border-top: 1px solid rgba(255, 255, 255, 0.5);
      cursor: pointer;
    }
  }
}
// .listen-list {
//   position: absolute;
//   bottom: 0;
//   left: 0;
//   right: 0;
//   color: #fff;
//   // max-height: px2rem(885px);
//   background: rgba(0, 0, 0, 0.8);
//   z-index: 199;

// }

// .fold-enter-active,
// .fold-leave-active {
//   transition: all 0.2s;
// }
// .fold-enter,
// .fold-leave-active {
//   transform: translate3d(0, 100%, 0);
// }
</style>