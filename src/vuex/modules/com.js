import * as types from '../types'

/**
 * App通用配置
 */
const state = {
    showListenList: false
}

const actions = {
    setShowListenList({ commit }, status) {
        commit(types.COM_SHOW_LISTEN_LIST, status)
    },

}

const getters = {
    showListenList: state => state.showListenList,
}


const mutations = {
    [types.COM_SHOW_LISTEN_LIST](state, status) {
        state.showListenList = status
    },
    // [types.COM_LOADING_STATUS](state, status) {
    //     state.loading = status
    // },

    // [types.COM_SHOW_TOAST](state, status) {
    //     state.showToast = status
    // },

    // [types.COM_SHOW_SUCCESS](state, status) {
    //     state.showSuccess = status
    // },

    // [types.COM_SHOW_FAIL](state, status) {
    //     state.showFail = status
    // },

    // [types.COM_TOAST_MSG](state, str) {
    //     state.toastMsg = str
    // },

    // [types.COM_NAV_STATUS](state, status) {
    //     state.leftNavStatus = status
    // },

    // [types.COM_SHOW_TIME_PICKER](state, status) {
    //     state.showTimePicker = status
    // },

    // [types.COM_SHOW_ALERT](state, status) {
    //     state.showAlert = status
    // },
    // [types.COM_ALERT_MSG](state, str) {
    //     state.alertMsg = str
    // },
}


export default {
    state,
    actions,
    getters,
    mutations
}