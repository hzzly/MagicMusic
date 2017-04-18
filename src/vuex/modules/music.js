import api from '../../api'
import * as types from '../types'

const state = {
    musicLists: [],
    audio: {
		"name": "刚好遇见你",
		"id": 439915614,
		"sname": "李玉刚",
		"imgUrl": "http://p4.music.126.net/lDyytkTaPYVTb1Vpide6AA==/18591642115187138.jpg",
        "mp3Url": "http://m2.music.126.net/qv3RI4K7ABKJ0TyAdb3taw==/3250156397064860.mp3"
    },
    lyric: '',
    currentIndex: 0, // 当前播放的歌曲位置
    playing: false, // 是否正在播放
}

const actions = {
    /**
     * 获取音乐列表
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
    },
    setAudio({ commit }, music) {
        commit(types.SET_AUDIO, music)
    },
    setNextAudio({ commit }, index) {
        commit(types.SET_NEXT_AUDIO, index)
    },
    setPreAudio({ commit }, index) {
        commit(types.SET_PRE_AUDIO, index)
    },
    setPlaying({ commit }, status) {
        commit(types.SET_PLAYING, status)
    },
    deleteMusic({ commit }, index) {
        commit(types.DELETE_MUSIC, index)
    },
    getLyric({ commit }, id) {
        api.MusicLyric({id})
            .then((res) => {
                // console.log(res.lrc.lyric)
                res.lrc ? commit(types.GET_LYRIC, res.lrc.lyric) : commit(types.GET_LYRIC, '')
            })
            .catch((res) => {
                // console.log(res.lrc.lyric)
                res.lrc ? commit(types.GET_LYRIC, res.lrc.lyric) : commit(types.GET_LYRIC, '')
            })
        
    }
}

const getters = {
    musicLists: state => state.musicLists,
    audio: state => state.audio,
    playing: state => state.playing,
    lyric: state => state.lyric
}

const mutations = {
    [types.GET_MUSIC_LISTS](state, res) {
        state.musicLists = res
    },
    [types.SET_AUDIO](state, music) {
        state.audio = music
    },
    [types.SET_NEXT_AUDIO](state, index) {
        let i = index === state.musicLists.length - 1 ? 0 : (++index)
        state.audio = state.musicLists[i]
    },
    [types.SET_PRE_AUDIO](state, index) {
        let i = index === 0 ? state.musicLists.length - 1 : (--index)
        state.audio = state.musicLists[i]
    },
    [types.SET_PLAYING](state, status) {
        state.playing = status
    },
    [types.DELETE_MUSIC](state, index) {
        state.musicLists.splice(index, 1)
    },
    [types.GET_LYRIC](state, playload) {
        state.lyric = playload
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