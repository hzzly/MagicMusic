<template>
  <div class="singer" ref="singer">
    <list-view v-if="singers.length > 0" @select="selectSinger" :data="singers" ref="list"></list-view>
    <router-view></router-view>
  </div>
</template>

<script type="text/ecmascript-6">
import ListView from '@/components/listView'
import api from '@/api'
import Singer from '@/common/js/singer'
import { playlistMixin } from '@/common/js/mixin'
import { getPinYinFirstCharacter } from '@/common/js/pinyin'

const MUSIC_SIZE = 300
const HOT_NAME = '热门'

export default {
  name: 'singer',
  mixins: [playlistMixin],
  data() {
    return {
      singers: []
    }
  },
  created() {
    this._getSingerList()
  },
  methods: {
    handlePlaylist(playlist) {
      const bottom = playlist.length > 0 ? '1.5rem' : ''
      this.$refs.singer.style.bottom = bottom
      this.$refs.list && this.$refs.list.refresh()
    },
    selectSinger(singer) {
      this.$router.push({
        path: `/singer/${singer.id}`
      })
    },
    _getSingerList() {
      if (localStorage.singers) {
        this.singers = JSON.parse(localStorage.singers)
        return
      }
      this.$showLoading()
      api.SingerList().then((res) => {
        if (res.code === 200) {
          this.$hideLoading()
          this.singers = this._normalizeSinger(res.artists)
          localStorage.singers = JSON.stringify(this.singers)
        }
      })
    },
    _normalizeSinger(list) {
      let map = {
        hot: {
          title: HOT_NAME,
          items: []
        }
      }
      list.forEach((item, index) => {
        if (item.musicSize > MUSIC_SIZE) {
          map.hot.items.push(new Singer({
            name: item.name,
            id: item.id,
            avatar: item.img1v1Url
          }))
        }
        const key = getPinYinFirstCharacter((item.name).charAt(0), '', true);
        if (!map[key]) {
          map[key] = {
            title: key,
            items: []
          }
        }
        map[key].items.push(new Singer({
          name: item.name,
          id: item.id,
          avatar: item.img1v1Url
        }))
      })
      // 为了得到有序列表，我们需要处理 map
      let ret = []
      let hot = []
      for (let key in map) {
        let val = map[key]
        if (val.title.match(/[a-zA-Z]/)) {
          ret.push(val)
        } else if (val.title === HOT_NAME) {
          hot.push(val)
        }
      }
      ret.sort((a, b) => {
        return a.title.charCodeAt(0) - b.title.charCodeAt(0)
      })
      return hot.concat(ret)
    },
  },
  components: {
    ListView
  }
}

</script>

<style lang="scss" scoped>
@import "../assets/css/function.scss";
.singer {
  position: fixed;
  top: px2rem(176px);
  bottom: 0;
  width: 100%;
}
</style>