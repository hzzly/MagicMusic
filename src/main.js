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
import VueLazyLoad from 'vue-lazyload'

//懒加载的默认图片 
import def_lazy_img from '../static/img/loading.gif'
//使用懒加载组件
Vue.use(VueLazyLoad,{
  loading: def_lazy_img
})

router.push('/home/popular')

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  ...App
})
