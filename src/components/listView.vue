<template>
  <v-scroll class="list-view" :data="data" ref="listView" :listenScroll="listenScroll" :probeType="probeType" @scroll="scroll">
    <ul>
      <li v-for="group in data" class="list-group" :key="group.key" ref="listGroup">
        <h2 class="list-group-title"> {{group.title}} </h2>
        <ul>
          <li @click="selectItem(item)" class="list-group-item" v-for="item in group.items" :key="item.key">
            <img v-lazy="item.avatar" alt="" class="avatar">
            <span class="name"> {{item.name}} </span>
          </li>
        </ul>
      </li>
    </ul>
  
    <!--右侧快速定位列表-->
    <div class="list-shortcut" @touchstart="onShortcutTouchStart" @touchmove.stop.prevent="onShortcutTouchMove">
      <ul>
        <li class="item" v-for="(item, index) in shortcutList" :data-index="index" :key="item.key" :class="{'current' : currentIndex === index}">
          {{item}}
        </li>
      </ul>
    </div>
    <div class="list-fixed" v-show="fixedTitle" ref="fixed">
      <h1 class="fixed-title"> {{fixedTitle}} </h1>
    </div>
  </v-scroll>
</template>
<script>
import scroll from '@/components/scroll'
const ANCHOR_HEIGHT = 18
const TITLE_HEIGHT = 30
export default {
  name: 'list-view',
  created() {
    this.touch = {}
    this.listenScroll = true
    this.listHeight = []
    this.probeType = 3
  },
  data() {
    return {
      scrollY: -1,
      currentIndex: 0,
      diff: -1
    }
  },
  mounted() {
    this.$nextTick(() => {
      this.calcHeight()
    })
  },
  props: {
    data: {
      type: Array,
      default: []
    }
  },
  computed: {
    shortcutList() {
      return this.data.map((group) => {
        return group.title.substr(0, 1)
      })
    },
    fixedTitle() {
      if (this.scrollY > 0) return
      return this.data[this.currentIndex] ? this.data[this.currentIndex].title : ''
    }
  },
  components: {
    'v-scroll': scroll,
  },
  watch: {
    // 监听scrollY 获取currentIndex
    scrollY(newY) {
      const listHeight = this.listHeight
      // top
      if (newY > 0) {
        this.currentIndex = 0
        return
      }
      // middle
      for (let i = 0; i < listHeight.length - 1; i++) {
        let height1 = listHeight[i]
        let height2 = listHeight[i + 1]
        // 向上滚动srcollY的值为负 所以加上负号
        if (-newY >= height1 && -newY < height2) {
          this.currentIndex = i
          this.diff = height2 + newY
          // console.log(this.diff)
          // console.log(this.currentIndex)
          return
        }
      }
      // bottom
      this.currentIndex = listHeight.length - 2
    },
    diff(newVal) {
      let fixedTop = (newVal > 0 && newVal < TITLE_HEIGHT) ? newVal - TITLE_HEIGHT : 0
      if (this.fixedTop === fixedTop) {
        return
      }
      this.fixedTop = fixedTop
      // console.log(this.fixedTop)
      this.$refs.fixed.style.transform = `translate3d(0, ${fixedTop}px, 0)`
    }
  },
  methods: {
    refresh() {
      this.$refs.listView.refresh()
    },
    getData(el, name, val) {
      const prefix = 'data-'
      name = prefix + name
      if (val) {
        return el.setAttribute(name, val)
      } else {
        return el.getAttribute(name)
      }
    },
    onShortcutTouchStart(e) {
      // 获取当前触摸的index
      let anchorIndex = this.getData(e.target, 'index')
      let firstTouch = e.touches[0]
      this.touch.y1 = firstTouch.pageY
      this.touch.anchorIndex = anchorIndex
      this._scrollTo(anchorIndex)
      console.log(anchorIndex)
    },
    onShortcutTouchMove(e) {
      let firstTouch = e.touches[0]
      this.touch.y2 = firstTouch.pageY
      // 向下取整
      let delta = (this.touch.y2 - this.touch.y1) / ANCHOR_HEIGHT | 0
      // 获取移动的距离
      let anchorIndex = parseInt(this.touch.anchorIndex) + delta
      this._scrollTo(anchorIndex)
    },
    // 监听scroll组件派发的scroll事件 获取滚动时的pos值
    scroll(pos) {
      this.scrollY = pos.y
      // console.log(this.scrollY)
    },
    _scrollTo(index) {
      if (!index && index !== 0) {
        return
      }
      // 判断index上下限
      if (index < 0) {
        index = 0
      } else if (index > this.listHeight.length - 2) {
        index = this.listHeight.length - 2
      }
      this.scrollY = -this.listHeight[index]
      this.$refs.listView.scrollToElement(this.$refs.listGroup[index], 0)
    },
    // 计算每一个singer list的height
    calcHeight() {
      this.listHeight = []
      const list = this.$refs.listGroup
      let height = 0
      this.listHeight.push(height)
      for (let i = 0; i < list.length; i++) {
        let item = list[i]
        height += item.clientHeight
        this.listHeight.push(height)
      }
    },
    selectItem(item) {
      this.$emit('select', item)
    }
  }
}
</script>
<style lang="scss" scoped>
.list-view {
  position: relative;
  width: 100%;
  height: 100%;
  overflow: hidden;
  // background: #222;
  .list-group {
    padding-bottom: 30px;
    .list-group-title {
      height: 30px;
      line-height: 30px;
      padding-left: 20px;
      font-size: 12px;
      color: rgba(255, 255, 255, 0.5);
      background: #262c50;
    }
    .list-group-item {
      display: flex;
      align-items: center;
      padding: 20px 0 0 30px;
      .avatar {
        width: 50px;
        height: 50px;
        border-radius: 50%;
      }
      .name {
        margin-left: 20px;
        color: rgba(255, 255, 255, 0.5);
        font-size: 14px;
      }
    }
  }
  .list-shortcut {
    position: absolute;
    z-index: 30;
    right: 0;
    top: 50%;
    transform: translateY(-50%);
    width: 20px;
    padding: 20px 0;
    border-radius: 10px;
    text-align: center;
    background: rgba(0, 0, 0, 0.3);
    font-family: Helvetica;
    .item {
      padding: 3px;
      line-height: 1;
      color: rgba(255, 255, 255, 0.5);
      font-size: 12px;
      &.current {
        color: #ea2448;
      }
    }
  }
  .list-fixed {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
  }
  .fixed-title {
    height: 30px;
    line-height: 30px;
    padding-left: 20px;
    font-size: 12px;
    color: rgba(255, 255, 255, 0.5);
    background: #262c50;
  }
  // .loading-container {
  //   position: absolute;
  //   width: 100%;
  //   top: 50%;
  //   transform: translateY(-50%);
  // }
}
</style>