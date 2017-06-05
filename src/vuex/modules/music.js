import api from '../../api'
import * as types from '../types'

const state = {
    popularLists: [],
    classicalLists: [],
    lightLists: [],
    radioLists: [],
    listenLists: localStorage.musiclists ? JSON.parse(localStorage.musiclists) : [
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
        },
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
    ],
    audio: localStorage.musiclists ? JSON.parse(localStorage.musiclists).slice(0, 1) : [{
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
    }],
    audioUrl: '',
    lyric: '',
    size: '',
    playing: false, // 是否正在播放
}

const actions = {
    //添加到试听列表
    addListenLists({ commit }, music) {
        commit(types.ADD_LISTEN_LISTS, music)
    },
    removeListenLists({ commit }) {
        commit(types.REMOVE_LISTEN_LISTS)
    },
    addAllToListenLists({ commit }, musiclists) {
        commit(types.ADD_ALL_TO_LISTEN_LISTS, musiclists)
        // commit(types.SET_AUDIO, musiclists[0])
    },
    //获取热门流行歌曲
    getPopularLists({ commit }) {
        commit(types.COM_SHOW_LOADING, true)
        if (localStorage.popularmusics !== '[]' && localStorage.popularmusics) {
            setTimeout(() => {
                commit(types.COM_SHOW_LOADING, false)
                commit(types.GET_POPULAR_LISTS, JSON.parse(localStorage.popularmusics))
            }, 500)
            return;
        }
        api.PopularList()
            .then(res => {
                commit(types.COM_SHOW_LOADING, false)
                commit(types.GET_POPULAR_LISTS, res.playlist.tracks)
                localStorage.popularmusics = JSON.stringify(res.playlist.tracks.slice(0, 30))
            })
    },
    //获取古典歌曲
    getClassicalLists({ commit }) {
        commit(types.COM_SHOW_LOADING, true)
        if (localStorage.classicalmusics !== '[]' && localStorage.classicalmusics) {
            setTimeout(() => {
                commit(types.COM_SHOW_LOADING, false)
                commit(types.GET_CLASSICAL_LISTS, JSON.parse(localStorage.classicalmusics))
            }, 500)
            return;
        }
        api.ClassicalList()
            .then(res => {
                commit(types.COM_SHOW_LOADING, false)
                commit(types.GET_CLASSICAL_LISTS, res.playlist.tracks)
                localStorage.classicalmusics = JSON.stringify(res.playlist.tracks.slice(0, 30))
            })
    },
    //获取轻音乐歌曲
    getLightLists({ commit }) {
        commit(types.COM_SHOW_LOADING, true)
        if (localStorage.lightmusics !== '[]' && localStorage.lightmusics) {
            setTimeout(() => {
                commit(types.COM_SHOW_LOADING, false)
                commit(types.GET_LIGHT_LISTS, JSON.parse(localStorage.lightmusics))
            }, 500)
            return;
        }
        api.LightList()
            .then(res => {
                commit(types.COM_SHOW_LOADING, false)
                commit(types.GET_LIGHT_LISTS, res.playlist.tracks)
                localStorage.lightmusics = JSON.stringify(res.playlist.tracks.slice(0, 30))
            })
    },
    //获取电台歌曲
    getRadioLists({ commit }) {
        commit(types.COM_SHOW_LOADING, true)
        if (localStorage.radiomusics !== '[]' && localStorage.radiomusics) {
            setTimeout(() => {
                commit(types.COM_SHOW_LOADING, false)
                commit(types.GET_RADIO_LISTS, JSON.parse(localStorage.radiomusics))
            }, 500)
            return;
        }
        api.RadioList()
            .then(res => {
                commit(types.COM_SHOW_LOADING, false)
                commit(types.GET_RADIO_LISTS, res.playlist.tracks)
                localStorage.radiomusics = JSON.stringify(res.playlist.tracks.slice(0, 30))
            })
    },
    //设置此时播放的音乐
    setAudio({ commit }, music) {
        commit(types.SET_AUDIO, music)
    },
    //设置播放的音乐url
    setAudioUrl({ commit }, url) {
        commit(types.SET_AUDIO_URL, url)
    },
    //上一曲
    setNextAudio({ commit }, index) {
        commit(types.SET_NEXT_AUDIO, index)
    },
    //下一曲
    setPreAudio({ commit }, index) {
        commit(types.SET_PRE_AUDIO, index)
    },
    //播放、暂停
    setPlaying({ commit }, status) {
        commit(types.SET_PLAYING, status)
    },
    //删除试听列表的歌曲
    deleteMusic({ commit }, index) {
        commit(types.DELETE_MUSIC, index)
    },
    //获取歌词
    getMusicInfo({ commit }, id) {
        api.MusicLyric({ id })
            .then((res) => {
                res.lrc ? commit(types.GET_MUSIC_LYRIC, res.lrc.lyric) : commit(types.GET_MUSIC_LYRIC, '')
            })
    },
    //歌曲总时间
    getMusicTime({ commit }, size) {
        commit(types.GET_MUSIC_TIME, size)
    }
}

const getters = {
    listenLists: state => state.listenLists,
    popularLists: state => state.popularLists.slice(0, 30),
    radioLists: state => state.radioLists.slice(0, 30),
    lightLists: state => state.lightLists.slice(0, 30),
    classicalLists: state => state.classicalLists.slice(0, 30),
    audio: state => state.audio,
    audioUrl: state => state.audioUrl,
    playing: state => state.playing,
    lyric: state => state.lyric,
    size: state => state.size
}

const mutations = {
    [types.ADD_LISTEN_LISTS](state, music) {
        state.listenLists.push(music)
        localStorage.musiclists = JSON.stringify(state.listenLists)
    },
    [types.REMOVE_LISTEN_LISTS](state) {
        state.listenLists = []
        localStorage.musiclists = []
    },
    [types.ADD_ALL_TO_LISTEN_LISTS](state, musiclists) {
        state.listenLists = [...state.listenLists, ...musiclists]
        localStorage.musiclists = JSON.stringify(state.listenLists)
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
        state.audio = [music]
    },
    [types.SET_AUDIO_URL](state, url) {
        state.audioUrl = url
    },
    [types.SET_NEXT_AUDIO](state, index) {
        let i = index === state.listenLists.length - 1 ? 0 : (++index)
        state.audio = [state.listenLists[i]]
    },
    [types.SET_PRE_AUDIO](state, index) {
        let i = index === 0 ? state.listenLists.length - 1 : (--index)
        state.audio = [state.listenLists[i]]
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
}

export default {
    state,
    actions,
    getters,
    mutations
}