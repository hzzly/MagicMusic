import * as types from '../types'
import { findIndex } from '@/common/js/util'

const state = {
  playing: false,
  fullScreen: false,
  playList: [],
  currentIndex: -1,
  favoriteList: [],
  playHistory: [],
}

const actions = {
  // 加入播放列表
  addPlayList({ commit, state }, song) {
    let playlist = [...state.playList.slice(), song]
    if (playlist.length === 1) {
      let currentIndex = state.currentIndex
      currentIndex++
      commit(types.SET_CURRENT_INDEX, currentIndex)
      commit(types.SET_PLAYING, true)
    }
    commit(types.SET_PLAYLIST, playlist)
  },
  playAllList({ commit }, list) {
    commit(types.SET_CURRENT_INDEX, 0)
    commit(types.SET_PLAYLIST, list)
  },
  //选择音乐播放
  selectPlaySong({ commit, state }, song) {
    let playlist = state.playList.slice()
    let currentIndex = state.currentIndex
    // 查找当前列表中是否有待插入的歌曲并返回其索引
    let fpIndex = findIndex(playlist, song)
    // 如果已经包含了这首歌
    if (fpIndex > -1) {
      currentIndex = fpIndex
    } else {
      playlist = [...playlist, song]
      currentIndex = playlist.length - 1
    }

    commit(types.SET_PLAYLIST, playlist)
    commit(types.SET_CURRENT_INDEX, currentIndex)
    commit(types.SET_FULL_SCREEN, true)
    commit(types.SET_PLAYING, true)
  },
  // 删除列表音乐
  removePlayList({ commit, state }, index) {
    let playlist = state.playList.slice()
    playlist.splice(index, 1)
    commit(types.SET_PLAYLIST, playlist)
  },
  // 情况播放列表
  removeAllPlayList({ commit }) {
    commit(types.SET_PLAYLIST, [])
  },
  // 保存播放历史
  savePlayHistory({ commit, state }, song) {
    let playHistory = state.playHistory.slice()
    playHistory = [...playHistory, song]
    commit(types.SAVE_PLAY_HISTORY, playHistory)
  },
  // 保存喜欢列表
  saveFavoriteList({ commit, state }, song) {
    let favoriteList = state.favoriteList.slice()
    favoriteList = [...favoriteList, song]
    commit(types.SAVE_FAVORITE_LIST, favoriteList)
  },
  //播放、暂停
  setPlaying({ commit }, status) {
    commit(types.SET_PLAYING, status)
  }
}

const getters = {
  playing: state => state.playing,
  fullScreen: state => state.fullScreen,
  playList: state => state.playList,
  currentIndex: state => state.currentIndex,
  currentSong: state => {
    return state.playList[state.currentIndex] || {}
  },
  favoriteList: state => state.favoriteList,
  playHistory: state => state.playHistory,
}

const mutations = {
  [types.SET_PLAYLIST](state, playlist) {
    state.playList = playlist
  },
  [types.SET_CURRENT_INDEX](state, index) {
    state.currentIndex = index
  },
  [types.SET_PLAYING](state, status) {
    state.playing = status
  },
  [types.SET_FULL_SCREEN](state, status) {
    state.fullScreen = status
  },
  [types.SAVE_PLAY_HISTORY](state, payload) {
    state.playHistory = payload
  },
  [types.SAVE_FAVORITE_LIST](state, payload) {
    state.favoriteList = payload
  }
}

export default {
  state,
  actions,
  getters,
  mutations
}
