import api from '../../api'
import * as types from '../types'

/**
 * App通用配置
 */
const state = {
  banners: [],
  searchHistory: [],
  showPlayList: false,
  showSidebar: false,
}

const actions = {
  getBanners({ commit }) {
    api.BannerList()
      .then(res => {
        commit(types.COM_GET_BANNERS, res.banners)
      })
  },
  saveSearchHistory({ commit, state }, query) {
    let searchHistory = [query, ...state.searchHistory.slice()]
    searchHistory = [...new Set(searchHistory)]
    commit(types.COM_SAVE_SEARCH_HISTORY, searchHistory)
  },
  deleteSearchHistory({ commit }, index) {
    commit(types.COM_DELETE_SEARCH_HISTORY, index)
  },
  clearSearchHistory({ commit }) {
    commit(types.COM_CLEAR_SEARCH_HISTORY)
  },
  showPlayList({ commit }, status) {
    commit(types.COM_SHOW_PLAY_LIST, status)
  },
  setShowSidebar({ commit }, status) {
    commit(types.COM_SHOW_SIDE_BAR, status)
  },
}

const getters = {
  banners: state => state.banners,
  searchHistory: state => state.searchHistory,
  showPlayList: state => state.showPlayList,
  showSidebar: state => state.showSidebar,
}


const mutations = {
  [types.COM_GET_BANNERS](state, status) {
    state.banners = status
  },
  [types.COM_SAVE_SEARCH_HISTORY](state, payload) {
    state.searchHistory = payload
  },
  [types.COM_DELETE_SEARCH_HISTORY](state, index) {
    state.searchHistory.splice(index, 1)
  },
  [types.COM_CLEAR_SEARCH_HISTORY](state) {
    state.searchHistory = []
  },
  [types.COM_SHOW_PLAY_LIST](state, status) {
    state.showPlayList = status
  },
  [types.COM_SHOW_SIDE_BAR](state, status) {
    state.showSidebar = status
  },
}


export default {
  state,
  actions,
  getters,
  mutations
}
