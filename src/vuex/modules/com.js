import api from '../../api'
import * as types from '../types'

/**
 * App通用配置
 */
const state = {
  banners: [],
  searchHistory: [],
  showListenList: false,
  showSidebar: false,
  showPlay: false,
  showToast: false,
  showLoading: false,
  showPlayLoading: false,
  alertMsg: ''
}

const actions = {
  getBanners({ commit }) {
    api.BannerList()
      .then(res => {
        commit(types.COM_GET_BANNERS, res.banners)
      })
  },
  saveSearchHistory({ commit }, status) {
    commit(types.COM_SAVE_SEARCH_HISTORY, status)
  },
  deleteSearchHistory({ commit }, index) {
    commit(types.COM_DELETE_SEARCH_HISTORY, index)
  },
  clearSearchHistory({ commit }) {
    commit(types.COM_CLEAR_SEARCH_HISTORY)
  },
  setShowListenList({
    commit
  }, status) {
    commit(types.COM_SHOW_LISTEN_LIST, status)
  },
  setShowSidebar({
    commit
  }, status) {
    commit(types.COM_SHOW_SIDE_BAR, status)
  },
  setShowPlay({
    commit
  }, status) {
    commit(types.COM_SHOW_PLAY, status)
  },
  setAlertMsg({
    commit
  }, msg) {
    commit(types.COM_ALERT_MSG, msg)
  },
  setShowAlertMsg({
    commit
  }, status) {
    commit(types.COM_SHOW_ALERT_MSG, status)
  },
  setShowLoading({
    commit
  }, status) {
    commit(types.COM_SHOW_LOADING, status)
  },
  setShowPlayLoading({
    commit
  }, status) {
    commit(types.COM_SHOW_PLAY_LOADING, status)
  }
}

const getters = {
  banners: state => state.banners,
  searchHistory: state => state.searchHistory,
  showListenList: state => state.showListenList,
  showSidebar: state => state.showSidebar,
  showToast: state => state.showToast,
  showLoading: state => state.showLoading,
  showPlayLoading: state => state.showPlayLoading,
  showPlay: state => state.showPlay,
}


const mutations = {
  [types.COM_GET_BANNERS](state, status) {
    state.banners = status
  },
  [types.COM_SAVE_SEARCH_HISTORY](state, status) {
    state.searchHistory = [status, ...state.searchHistory]
  },
  [types.COM_DELETE_SEARCH_HISTORY](state, index) {
    state.searchHistory.splice(index, 1)
  },
  [types.COM_CLEAR_SEARCH_HISTORY](state) {
    state.searchHistory = []
  },
  [types.COM_SHOW_LISTEN_LIST](state, status) {
    state.showListenList = status
  },
  [types.COM_SHOW_SIDE_BAR](state, status) {
    state.showSidebar = status
  },
  [types.COM_SHOW_PLAY](state, status) {
    state.showPlay = status
  },
  [types.COM_ALERT_MSG](state, msg) {
    state.alertMsg = msg
  },
  [types.COM_SHOW_ALERT_MSG](state, status) {
    state.showToast = status
  },
  [types.COM_SHOW_LOADING](state, status) {
    state.showLoading = status
  },
  [types.COM_SHOW_PLAY_LOADING](state, status) {
    state.showPlayLoading = status
  },
}


export default {
  state,
  actions,
  getters,
  mutations
}
