<template>
  <div id="app">
    <v-header @left="showSidebar">
      <i slot="left-icon" class="icon">&#xe692;</i>
      <span slot="content">Magic Music</span>
      <router-link slot="right-icon" to="/search">
        <i class="icon">&#xe638;</i>
      </router-link>
    </v-header>
    <v-tab></v-tab>
    <keep-alive>
      <router-view></router-view>
    </keep-alive>
    <v-playbar></v-playbar>

    <!--公用组件-->
    <v-sidebar></v-sidebar>
    <v-toast v-show="showToast"></v-toast>
    <!-- <v-loading v-show="showPlayLoading" class="play-loading"></v-loading> -->
    <transition name="fold">
      <v-play v-show="showPlay"></v-play>
    </transition>
  </div>
</template>

<script>
import header from '@/components/header'
import tab from '@/components/tab'
import playbar from '@/components/playbar'
import play from '@/components/play'
import sidebar from '@/components/sidebar'
import toast from '@/components/toast'
import loading from '@/components/loading'

import { mapGetters } from 'vuex'

import api from './api'

export default {
  name: 'app',
  components: {
    'v-header': header,
    'v-tab': tab,
    'v-playbar': playbar,
    'v-play': play,
    'v-sidebar': sidebar,
    'v-toast': toast,
    'v-loading': loading
  },
  created() {
    // if (!this.audioUrl) {
    //   api.MusicUrl(this.audio[0].id)
    //     .then(res => {
    //       this.$store.dispatch('setAudioUrl', res.data[0].url)
    //     })
    // }
    // this.$store.dispatch('getMusicInfo', this.audio[0].id)
  },
  data() {
    return {
    }
  },
  computed: {
    header() {
      return this.$route.path.split('/')[1] == 'search' || this.$route.path.split('/')[1] == 'rank' ? false : true
    },
    ...mapGetters([
      'showToast',
      'showPlay',
      'audio',
      'audioUrl',
      'showPlayLoading'
    ]),
  },
  methods: {
    showSidebar() {
      this.$store.dispatch('setShowSidebar', true)
    }
  }
}
</script>

<style lang="scss">
@import "./assets/css/function";

@font-face {
  font-family: "icon";
  /* project id 277165 */
  src: url("//at.alicdn.com/t/font_kmywdojzhchj8aor.eot");
  src: url("//at.alicdn.com/t/font_kmywdojzhchj8aor.eot?#iefix")
      format("embedded-opentype"),
    url("//at.alicdn.com/t/font_kmywdojzhchj8aor.woff") format("woff"),
    url("//at.alicdn.com/t/font_kmywdojzhchj8aor.ttf") format("truetype"),
    url("//at.alicdn.com/t/font_kmywdojzhchj8aor.svg#iconfont") format("svg");
}

.icon {
  font-family: "icon" !important;
  font-size: 18px;
  font-style: normal;
  color: #ffffff;
}

html,
body {
  line-height: 1;
  font-family: PingFang SC, STHeitiSC-Light, Helvetica-Light, arial, sans-serif;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
  -webkit-tap-highlight-color: transparent;
  background: rgba(8, 5, 58, 0.9);
  color: #fff;
}

#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  display: flex;
  flex-direction: column;
  .play-loading {
    top: 8rem;
    z-index: 99;
  }
  .container {
    flex: 1;
    overflow: auto;
    overflow-x: hidden;
  }
  .slide-left-enter-active {
    animation: slideLeft 0.3s;
  }
  .slide-right-enter-active {
    animation: slideRight 0.3s;
  }

  .fold-enter-active,
  .fold-leave-active {
    transition: transform 0.3s ease-in;
  }
  .fold-enter,
  .fold-leave-active {
    transform: translate3d(0, 100%, 0);
  }
}
</style>
