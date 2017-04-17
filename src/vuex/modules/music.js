import api from '../../api'
import * as types from '../types'

const state = {
    musicLists: [],
    audio: {
		"name": "刚好遇见你",
		"id": 439915614,
		"sname": "李玉刚",
		"imgUrl": "http://p4.music.126.net/lDyytkTaPYVTb1Vpide6AA==/18591642115187138.jpg?param=130y130",
    },
    // lyric:
    currentIndex: 0, // 当前播放的歌曲位置
    playing: false, // 是否正在播放
}

const actions = {
    /**
     * 获取约跑步列表
     */
    getMusicLists({ commit }) {
        if (localStorage.musics !== '[]' && localStorage.musics) {
            // state.musicData = JSON.parse(localStorage.musics);
            commit(types.GET_MUSIC_LISTS, JSON.parse(localStorage.musics))
            return;
        }
        api.MusicList()
            .then(res => {
                commit(types.GET_MUSIC_LISTS, res.musicData)
                localStorage.musics = JSON.stringify(res.musicData)
            })
            .catch(res => {
                commit(types.GET_MUSIC_LISTS, res.musicData)
                localStorage.musics = JSON.stringify(res.musicData)
            })
        // if(state.scroll) {
        //     commit(types.GET_TRAVELS_PAGE_NUM)
        //     commit(types.COM_LOADING_STATUS, true),
        //     commit(types.GET_TRAVELS_SCORLL_STATUS, false)
        //     api.TravelsList()
        //         .then(res => {
        //             console.log(res)
        //             commit(types.COM_LOADING_STATUS, false),
        //             commit(types.GET_TRAVELS_SCORLL_STATUS, true)
        //             commit(types.GET_TRAVELS_LIST, res)
        //         })
        // }
    },
    setAudio({ commit }, music) {
        commit(types.SET_AUDIO, music)
    },
    setPlaying({ commit }, status) {
        commit(types.SET_PLAYING, status)
    }
}

const getters = {
    musicLists: state => state.musicLists,
    audio: state => state.audio,
    playing: state => state.playing
}

const mutations = {
    [types.GET_MUSIC_LISTS](state, res) {
        state.musicLists = res
    },
    [types.SET_AUDIO](state, music) {
        state.audio = music
    },
    [types.SET_PLAYING](state, status) {
        state.playing = status
    }
    // [types.GET_TRAVELS_SEARCH_KEY](state, params) {
    //     state.searchKey = params
    // },
    // [types.GET_TRAVELS_PAGE_NUM](state) {
    //     state.searchKey['page'] += 1
    // },
    // [types.GET_TRAVELS_SCORLL_STATUS](state, status) {
    //     state.scroll = status
    // }
}

export default {
    state,
    actions,
    getters,
    mutations
}