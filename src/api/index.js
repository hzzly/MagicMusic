import axios from 'axios'
import qs from 'qs'

// axios 配置
axios.defaults.timeout = 10000;
axios.defaults.baseURL = 'http://localhost:3000';

export function fetchGet(url, param) {
    return new Promise((resolve, reject) => {
        axios.get(url, {params: param})
            .then(response => {
                resolve(response.data)
            }, err => {
                reject(err)
            })
            .catch((error) => {
                reject(error)
            })
    })
}
export default {
    /**
     * 用户登录
     */
    Login(params) {
        return fetchGet('/login', params)
    },

     /**
     * popularmusic列表
     */
     PopularList() {
         return fetchGet('/playlist/detail', {id: 3778678})
     },

     /**
     * classicalmusic列表
     */
     ClassicalList() {
         return fetchGet('/playlist/detail', {id: 71384707})
     },

     /**
     * lightmusic列表
     */
     LightList() {
         return fetchGet('/playlist/detail', {id: 26467411})
     },

     /**
     * radiomusic列表
     */
     RadioList() {
         return fetchGet('/playlist/detail', {id: 897089})
     },

     /**
      * music歌词
      */
      MusicUrl(id) {
        return fetchGet('/music/url', {id})
      },

     /**
      * music歌词
      */
      MusicLyric(id) {
        return fetchGet('/lyric', id)
      },

      /**
      * music搜索
      */
      MusicSearch(keywords) {
        return fetchGet('/search', {keywords})
      },

      /**
      * 排行榜
      */
      MusicRank(idx) {
        return fetchGet('/top/list', {idx})
      },

}
