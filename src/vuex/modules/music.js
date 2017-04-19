import api from '../../api'
import * as types from '../types'

const state = {
    musicLists: [],
    popularLists: [],
    classicalLists: [],
    lightLists: [],
    radioLists: [],
    listenLists: [
        {
            "name": "暧昧",
            "id": 471385043,
            "ar": [
                {
                    "id": 5781,
                    "name": "薛之谦",
                }
            ],
            "al": {
                "name": "暧昧",
                "picUrl": "http://p4.music.126.net/ap8OhyOkOPOz5M1A7VhgAA==/18822539557778052.jpg",
            }
        },
        {
            "name": "刚好遇见你",
            "id": 439915614,
            "ar": [
                {
                    "id": 4130,
                    "name": "李玉刚",
                }
            ],
            "al": {
                "name": "刚好遇见你",
                "picUrl": "http://p3.music.126.net/lDyytkTaPYVTb1Vpide6AA==/18591642115187138.jpg",
            },
        }
    ],
    audio: {
        "name": "暧昧",
        "id": 471385043,
        "ar": [
            {
                "id": 5781,
                "name": "薛之谦",
            }
        ],
        "al": {
            "name": "暧昧",
            "picUrl": "http://p4.music.126.net/ap8OhyOkOPOz5M1A7VhgAA==/18822539557778052.jpg",
        }
    },
    audioUrl: '',
    lyric: '',
    size: '',
    currentIndex: 0, // 当前播放的歌曲位置
    playing: false, // 是否正在播放
}

const actions = {
    /**
     * 获取音乐列表
     */
    getMusicLists({ commit }) {
        if (localStorage.musics !== '[]' && localStorage.musics) {
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
    getPopularLists({ commit }) {
        if (localStorage.popularmusics !== '[]' && localStorage.popularmusics) {
            commit(types.GET_POPULAR_LISTS, JSON.parse(localStorage.popularmusics))
            return;
        }
        api.PopularList()
            .then(res => {
                commit(types.GET_POPULAR_LISTS, res.playlist.tracks)
                localStorage.popularmusics = JSON.stringify(res.playlist.tracks)
            })
            .catch(res => {
                commit(types.GET_POPULAR_LISTS, res.playlist.tracks)
                localStorage.popularmusics = JSON.stringify(res.playlist.tracks)
            })
    },
    getClassicalLists({ commit }) {
        if (localStorage.classicalmusics !== '[]' && localStorage.classicalmusics) {
            commit(types.GET_CLASSICAL_LISTS, JSON.parse(localStorage.classicalmusics))
            return;
        }
        api.ClassicalList()
            .then(res => {
                commit(types.GET_CLASSICAL_LISTS, res.playlist.tracks)
                localStorage.classicalmusics = JSON.stringify(res.playlist.tracks)
            })
            .catch(res => {
                commit(types.GET_CLASSICAL_LISTS, res.playlist.tracks)
                localStorage.classicalmusics = JSON.stringify(res.playlist.tracks)
            })
    },
    getLightLists({ commit }) {
        if (localStorage.lightmusics !== '[]' && localStorage.lightmusics) {
            commit(types.GET_LIGHT_LISTS, JSON.parse(localStorage.lightmusics))
            return;
        }
        api.LightList()
            .then(res => {
                commit(types.GET_LIGHT_LISTS, res.playlist.tracks)
                localStorage.lightmusics = JSON.stringify(res.playlist.tracks)
            })
            .catch(res => {
                commit(types.GET_LIGHT_LISTS, res.playlist.tracks)
                localStorage.lightmusics = JSON.stringify(res.playlist.tracks)
            })
    },
    getRadioLists({ commit }) {
        if (localStorage.radiomusics !== '[]' && localStorage.radiomusics) {
            commit(types.GET_RADIO_LISTS, JSON.parse(localStorage.radiomusics))
            return;
        }
        api.RadioList()
            .then(res => {
                commit(types.GET_RADIO_LISTS, res.playlist.tracks)
                localStorage.radiomusics = JSON.stringify(res.playlist.tracks)
            })
            .catch(res => {
                commit(types.GET_RADIO_LISTS, res.playlist.tracks)
                localStorage.radiomusics = JSON.stringify(res.playlist.tracks)
            })
    },
    setAudio({ commit }, music) {
        commit(types.SET_AUDIO, music)
    },
    setAudioUrl({ commit }, url) {
        commit(types.SET_AUDIO_URL, url)
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
    getMusicInfo({ commit }, id) {
        api.MusicLyric({ id })
            .then((res) => {
                res.lrc ? commit(types.GET_MUSIC_LYRIC, res.lrc.lyric) : commit(types.GET_MUSIC_LYRIC, '')
            })
            .catch((res) => {
                res.lrc ? commit(types.GET_MUSIC_LYRIC, res.lrc.lyric) : commit(types.GET_MUSIC_LYRIC, '')
            })
    },
    getMusicTime({ commit }, size) {
        commit(types.GET_MUSIC_TIME, size)
    }
}

const getters = {
    musicLists: state => state.musicLists,
    listenLists: state => state.listenLists,
    popularLists: state => state.popularLists.slice(0, 30),
    audio: state => state.audio,
    audioUrl: state => state.audioUrl,
    playing: state => state.playing,
    lyric: state => state.lyric,
    size: state => state.size
}

const mutations = {
    [types.GET_MUSIC_LISTS](state, res) {
        state.musicLists = res
    },
    [types.GET_POPULAR_LISTS](state, res) {
        state.popularLists = res
    },
    [types.GET_CLASSICAL_LISTS](state, res) {
        state.classicalLists = res
    },
    [types.GET_LIGHT_LISTS](state, res) {
        state.lightLists = res
    },
    [types.GET_RADIO_LISTS](state, res) {
        state.radioLists = res
    },
    [types.SET_AUDIO](state, music) {
        state.audio = music
    },
    [types.SET_AUDIO_URL](state, url) {
        state.audioUrl = url
    },
    [types.SET_NEXT_AUDIO](state, index) {
        let i = index === state.listenLists.length - 1 ? 0 : (++index)
        state.audio = state.listenLists[i]
    },
    [types.SET_PRE_AUDIO](state, index) {
        let i = index === 0 ? state.musicLists.length - 1 : (--index)
        state.audio = state.listenLists[i]
    },
    [types.SET_PLAYING](state, status) {
        state.playing = status
    },
    [types.DELETE_MUSIC](state, index) {
        state.listenLists.splice(index, 1)
    },
    [types.GET_MUSIC_LYRIC](state, playload) {
        state.lyric = playload
    },
    [types.GET_MUSIC_TIME](state, playload) {
        state.size = playload
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