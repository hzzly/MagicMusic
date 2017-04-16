// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'

Vue.config.productionTip = false

import '../static/css/reset.scss'

var VueTouch = require('vue-touch')
Vue.use(VueTouch, {name: 'v-touch'})

import store from './vuex/store'

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  ...App
})
