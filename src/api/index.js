import axios from 'axios'
import qs from 'qs'


// axios 配置
axios.defaults.timeout = 5000;
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8';
axios.defaults.baseURL = 'http://localhost:3000';

//POST传参序列化
axios.interceptors.request.use((config) => {
    if (config.method === 'post') {
        config.data = qs.stringify(config.data);
    }
    return config;
}, (error) => {
    return Promise.reject(error);
});

//返回状态判断
axios.interceptors.response.use((res) => {
    if (!res.data.success) {
        // _.toast(res.data.msg);
        return Promise.reject(res);
    }
    return res;
}, (error) => {
    return Promise.reject(error);
});

export function fetchPost(url, params) {
    return new Promise((resolve, reject) => {
        axios.post(url, params)
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

export function fetchGet(url, param) {
    return new Promise((resolve, reject) => {
        axios.get(url, {params: param})
            .then(response => {
                resolve(response.data)
            }, err => {
                reject(err.data)
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
     * music列表
     */
     MusicList() {
         return fetchGet('/musiclist')
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
        return fetchGet('/top_list', {idx})
      },

}
