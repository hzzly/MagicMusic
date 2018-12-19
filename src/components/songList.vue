<template>
  <div class="song-list">
    <div class="list-item" v-for="(item, index) in songLists" :key="index" v-show="!showLoading">
      <div class="info" @click="_play(item)">
        <div class="song-name">
          {{item.name}}
        </div>
        <div class="song-desc">{{getDesc(item)}}</div>
      </div>
      <div class="operation" @click="_showOperation(index)">
        <i class="icon">&#xe605;</i>
      </div>
      <animation-menu :item="item" :index="index"></animation-menu>
    </div>
  </div>
</template>

<script>
import animationMenu from '@/components/animationMenu'
import api from '@/api'

import Vue from 'vue'
import { mapGetters } from 'vuex'

export default {
  components: {
    animationMenu,
  },
  props: {
    songLists: Array
  },
  data() {
    return {
    }
  },
  computed: {
    ...mapGetters([
      'listenLists',
      'showLoading',
    ]),
  },
  methods: {
    getDesc(song) {
      const singer = song.ar && song.ar[0].name
      const album = song.al && song.al.name
      return `${singer}·${album}`
    },
    _play(music) {
      this.$store.dispatch('setPlaying', false)
      this.$store.dispatch('setAudio', music)
      this.$store.dispatch('setShowPlayLoading', true)
      //查找试听列表中有没有点击中的歌
      let x = this.listenLists.findIndex((item) => {
        //判断是否是搜索列表里的(搜索结果字段不一样)
        if (item.ar && music.ar) {
          return item.name == music.name && item.ar[0].name == music.ar[0].name
        } else if (item.artists && music.artists) {
          return item.name == music.name && item.artists[0].name == music.artists[0].name
        }
      })
      if (x === -1) {
        this.$store.dispatch('addListenLists', music)
      }
      if (music.mp3Url) {
        this.$store.dispatch('setAudioUrl', music.mp3Url)
      } else {
        api.MusicUrl(music.id)
          .then(res => {
            this.$store.dispatch('setAudioUrl', res.data[0].url)
          })
      }
    },
    _showOperation(index) {
      for (let i = 0; i < this.songLists.length; i++) {
        if (i !== index) {
          this.songLists[i].menuShow = false
        }
      }
      this.songLists[index].menuShow = !this.songLists[index].menuShow
    },
  },
  watch: {
    songLists() {
      for (let item of this.songLists) {
        Vue.set(item, 'menuShow', false)
      }
    }
  }
}
</script>

<style lang="scss" scoped>
@import "../assets/css/function.scss";
.song-list {
  position: relative;
  .list-item {
    position: relative;
    height: px2rem(120px);
    font-size: 14px;
    display: flex;
    align-items: center;
    cursor: pointer;
    color: #fff;
    .info {
      flex: 1;
      line-height: 20px;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      .song-name {
        color: #fff;
      }
      .song-desc {
        margin-top: 4px;
        color: hsla(0,0%,100%,.5);
      }
    }
    .operation {
      width: px2rem(100px);
      height: 100%;
      box-sizing: border-box;
      padding-top: px2rem(25px);
      text-align: right;
    }
  }
}
</style>
