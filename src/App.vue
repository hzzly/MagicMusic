<template>
  <div id="app">
    <v-header v-show="header"></v-header>
    <div class="container">
      <router-view></router-view>
    </div>
    <!--<router-view></router-view>-->
    <v-playbar v-show="playBar"></v-playbar>
    <v-play v-show="showPlay"></v-play>
  
    <!--公用组件-->
    <v-sidebar></v-sidebar>
  </div>
</template>

<script>
import header from '@/components/header'
import playbar from '@/components/playbar'
import play from '@/components/play'
import sidebar from '@/components/sidebar'

import { mapGetters } from 'vuex'

import api from './api'

export default {
  name: 'app',
  components: {
    'v-header': header,
    'v-playbar': playbar,
    'v-play': play,
    'v-sidebar': sidebar,
  },
  created() {
    if (!this.audioUrl) {
      api.MusicUrl(this.audio.id)
        .then(res => {
          this.$store.dispatch('setAudioUrl', res.data[0].url)
        })
        .catch(res => {
          this.$store.dispatch('setAudioUrl', res.data[0].url)
        })
    }
  },
  computed: {
    playBar() {
      // return this.$route.path.split('/')[1] == 'search' ? false : true
      return true
    },
    header() {
      return this.$route.path.split('/')[1] == 'search' ? false : true
    },
    ...mapGetters([
      'showSidebar',
      'showPlay',
      'audio',
      'audioUrl'
    ]),
  }
}
</script>

<style lang="scss">
@import './assets/css/function';

@font-face {
  font-family: 'icon';  /* project id 277165 */
  src: url('//at.alicdn.com/t/font_kmywdojzhchj8aor.eot');
  src: url('//at.alicdn.com/t/font_kmywdojzhchj8aor.eot?#iefix') format('embedded-opentype'),
  url('//at.alicdn.com/t/font_kmywdojzhchj8aor.woff') format('woff'),
  url('//at.alicdn.com/t/font_kmywdojzhchj8aor.ttf') format('truetype'),
  url('//at.alicdn.com/t/font_kmywdojzhchj8aor.svg#iconfont') format('svg');
}

.icon {
  font-family: "icon" !important;
  font-size: 18px;
  font-style: normal;
  color: #ffffff;
}

#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  display: flex;
  flex-direction: column;
  height: 100%;
  .container {
    flex: 1;
    overflow: auto;
    overflow-x: hidden;
  }
}
</style>
