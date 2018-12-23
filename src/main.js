// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import fastclick from 'fastclick'
import VueLazyLoad from 'vue-lazyload'
import App from './App'
import router from './router'
import store from './vuex/store'
import '../static/css/reset.scss'
import '../static/css/plugin.scss'

Vue.config.productionTip = false

fastclick.attach(document.body)

import { Toast, Loading } from '@/common/js/plugin';
Vue.use(Toast);
Vue.use(Loading);

//懒加载的默认图片 
import def_lazy_img from '../static/img/loading.gif'
//使用懒加载组件
Vue.use(VueLazyLoad,{
  loading: def_lazy_img
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  ...App
})
