<template>
  <div id="app">
    <v-header></v-header>
    <div class="container" :class="{marginBottom:playBar}">
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
    }
  }
}
</script>

<style lang="scss">
@import './assets/css/function';
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  .container {
    padding-top: px2rem(100px);
    &.marginBottom {
      margin-bottom: px2rem(120px);
    }
  }
}
</style>
