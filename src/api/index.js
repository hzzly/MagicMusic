import axios from 'axios'
import Vue from 'vue'
const vue = new Vue()

// axios 配置
axios.defaults.timeout = 10000;
axios.defaults.baseURL = 'http://localhost:3000';

//返回状态判断
axios.interceptors.response.use((res) => {
	if (res.data.code !== 200) {
    vue.$toast('网络异常')
    vue.$hideLoading()
		return Promise.reject(res);
	}
	return res;
}, (error) => {
  vue.$toast('网络异常')
  vue.$hideLoading()
	return Promise.reject(error);
});

export function fetchGet(url, param) {
  return new Promise((resolve, reject) => {
    axios.get(url, {
        params: param
      })
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
   * banners
   */
  BannerList() {
    return fetchGet('/banner')
  },

  /**
   * 歌单
   */
  DiscLists(params) {
    return fetchGet('/top/playlist', params)
  },

  /**
   * 歌单详情
   */
  SongList(params) {
    return fetchGet('/playlist/detail', params)
  },

  /**
   * 歌手列表
   */
  SingerList() {
    return fetchGet('/artist/list', {
      cat: 5001,
      limit: 80
    })
  },

  /**
   * 歌手单曲列表
   */
  SingerMusciList(params) {
    return fetchGet('/artists', params)
  },

  /**
   * 排行榜列表
   */
  RankList() {
    return fetchGet('/toplist/detail')
  },

  /**
   * 热搜
   */
  HotSearchKey() {
    return fetchGet('/search/hot')
  },

  /**
   * popularmusic列表
   */
  // PopularList() {
  //   return fetchGet('/playlist/detail', {
  //     id: 3778678
  //   })
  // },

  /**
   * classicalmusic列表
   */
  // ClassicalList() {
  //   return fetchGet('/playlist/detail', {
  //     id: 71384707
  //   })
  // },

  /**
   * lightmusic列表
   */
  // LightList() {
  //   return fetchGet('/playlist/detail', {
  //     id: 26467411
  //   })
  // },

  /**
   * radiomusic列表
   */
  // RadioList() {
  //   return fetchGet('/playlist/detail', {
  //     id: 897089
  //   })
  // },

  /**
   * music歌曲
   */
  MusicUrl(id) {
    return fetchGet('/song/url', {
      id
    })
  },

  /**
   * music歌词
   */
  MusicLyric(id) {
    return fetchGet('/lyric', {
      id
    })
  },

  /**
   * music搜索
   */
  MusicSearch(params) {
    return fetchGet('/search', params)
  },

  // /**
  //  * 排行榜
  //  */
  // MusicRank(idx) {
  //   return fetchGet('/top/list', {
  //     idx
  //   })
  // },

}
