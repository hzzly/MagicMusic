import * as types from '../types'

/**
 * App通用配置
 */
const state = {
    showListenList: false,
    showSidebar: false,
    showPlay: false,
    showToast: false,
    showLoading: false,
    showPlayLoading: false,
    alertMsg: ''
}

const actions = {
    setShowListenList({ commit }, status) {
        commit(types.COM_SHOW_LISTEN_LIST, status)
    },
    setShowSidebar({ commit }, status) {
        commit(types.COM_SHOW_SIDE_BAR, status)
    },
    setShowPlay({ commit }, status) {
        commit(types.COM_SHOW_PLAY, status)
    },
    setAlertMsg({ commit }, msg) {
        commit(types.COM_ALERT_MSG, msg)
    },
    setShowAlertMsg({ commit }, status) {
        commit(types.COM_SHOW_ALERT_MSG, status)
    },
    setShowLoading({ commit }, status) {
        commit(types.COM_SHOW_LOADING, status)
    },
    setShowPlayLoading({ commit }, status) {
        commit(types.COM_SHOW_PLAY_LOADING, status)
    }
}

const getters = {
    showListenList: state => state.showListenList,
    showSidebar: state => state.showSidebar,
    showToast: state => state.showToast,
    showLoading: state => state.showLoading,
    showPlayLoading: state => state.showPlayLoading,
    showPlay: state => state.showPlay,
}


const mutations = {
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