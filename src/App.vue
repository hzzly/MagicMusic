<template>
  <div id="app">
    <v-header></v-header>
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
  display: flex;
  flex-direction: column;
  height: 100%;
  .container {
    flex: 1;
    overflow: auto;
  }
}
</style>
