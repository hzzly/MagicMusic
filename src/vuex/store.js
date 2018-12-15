import Vue from 'vue'
import Vuex from 'vuex'

import user from './modules/user'
import music from './modules/music'
import com from './modules/com'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    user,
    music,
    com
  }
})
