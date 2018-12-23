<template>
  <div id="app">
    <v-header @left="showSidebar">
      <i slot="left-icon" class="icon">&#xe692;</i>
      <span slot="content">Magic Music</span>
      <router-link slot="right-icon" to="/user">
        <i class="icon">&#xe63c;</i>
      </router-link>
    </v-header>
    <v-tab></v-tab>
    <keep-alive>
      <router-view></router-view>
    </keep-alive>
    <v-play></v-play>

    <!--公用组件-->
    <v-sidebar></v-sidebar>
  </div>
</template>

<script>
import header from '@/components/header'
import tab from '@/components/tab'
import play from '@/components/play'
import sidebar from '@/components/sidebar'

export default {
  name: 'app',
  components: {
    'v-header': header,
    'v-tab': tab,
    'v-play': play,
    'v-sidebar': sidebar
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
</style>
