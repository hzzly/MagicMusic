<template>
  <div id="app">
    <v-header v-show="header"></v-header>
    <div class="container">
      <router-view></router-view>
    </div>
    <!--<router-view></router-view>-->
    <v-playbar v-show="playBar"></v-playbar>

    <!--公用组件-->
    <v-sidebar></v-sidebar>
  </div>
</template>

<script>
import header from '@/components/header'
import playbar from '@/components/playbar'
import sidebar from '@/components/sidebar'

import { mapGetters } from 'vuex'

export default {
  name: 'app',
  components: {
    'v-header': header,
    'v-playbar': playbar,
    'v-sidebar': sidebar,
  },
  computed: {
    
    playBar() {
      return true
    },
    header() {
      return true
    },
    ...mapGetters([
			'showSidebar'
		]),
  }
}
</script>

<style lang="scss">
@import './assets/css/function';

@font-face {
  font-family: 'icon';  /* project id 277165 */
  src: url('//at.alicdn.com/t/font_vazj4h1dw7bymn29.eot');
  src: url('//at.alicdn.com/t/font_vazj4h1dw7bymn29.eot?#iefix') format('embedded-opentype'),
  url('//at.alicdn.com/t/font_vazj4h1dw7bymn29.woff') format('woff'),
  url('//at.alicdn.com/t/font_vazj4h1dw7bymn29.ttf') format('truetype'),
  url('//at.alicdn.com/t/font_vazj4h1dw7bymn29.svg#iconfont') format('svg');
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
