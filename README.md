# MagicMusic

>前言：在最近的一个外包项目[中包联盟](http://www.zblmchina.com/#/post)中使用到了video，遇到了好多坑。突发奇想来踩一踩audio的坑😀，果然一入深似海，👇下面将分享我的DIY之路-Vue音乐播放器。
>注：本项目为开源项目，不能用于商业应用，仅供学习。

[温馨提示：pc浏览f12手机模式最佳,手机建议wifi下访问]
**demo地址：** [http://hjingren.cn/magic-music](http://hjingren.cn/magic-music)
欢迎大家的star啦😄~

## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report
```

API
``` bash
$ git clone git@github.com:Binaryify/NeteaseCloudMusicApi.git
$ npm install
$ node app.js
```

👉老铁们，准备发车(技能点)：
> * [vue文档](https://cn.vuejs.org/)
> * [vue-router文档](https://router.vuejs.org/zh-cn/)
> * [vuex文档](https://vuex.vuejs.org/zh-cn/) 不想看文档的可以看看我这篇博客[vuex学习实践笔记](https://hzzly.github.io/2017/04/04/vuex%E5%AD%A6%E4%B9%A0%E5%AE%9E%E8%B7%B5%E7%AC%94%E8%AE%B0/)
> * [axios文档](https://www.npmjs.com/package/axios) 或者这篇博客 [Vuex2 与 Axios 开发](https://blog.ygxdxx.com/2017/02/01/Vuex2&Axios-Develop/)(我也是参考这篇，感谢作者😁)
> * [es6(阮一峰的es6入门)](http://es6.ruanyifeng.com/) 可以参考[我的es6之路](https://hzzly.github.io/tags/es6/)(还在继续,轻喷)
> * [webpack2(中文网站)](https://doc.webpack-china.org/)
> * [Promise (浅谈Promise)](https://hzzly.github.io/2017/03/25/%E6%B5%85%E8%B0%88Promise/)
> * [flex (Web的flex弹性盒模型)](https://hzzly.github.io/2017/03/03/Web%E7%9A%84Flex%E5%BC%B9%E6%80%A7%E7%9B%92%E6%A8%A1%E5%9E%8B/)
> * [移动端屏幕适配的解决 (flexible+rem)](https://hzzly.github.io/2017/03/15/%E7%A7%BB%E5%8A%A8%E7%AB%AF%E5%B1%8F%E5%B9%95%E9%80%82%E9%85%8D%E7%9A%84%E8%A7%A3%E5%86%B3/)
> * [本地存储(sessionStorage、localStorage)](https://hzzly.github.io/2017/04/26/%E6%9C%AC%E5%9C%B0%E5%AD%98%E5%82%A8sessionStorage%E4%B8%8ElocalStorage/)
> * [图片懒加载](https://github.com/hilongjw/vue-lazyload?from=gold)

👉坐好，出发
### 实现的功能

#### 1、首页
> - [x] 轮播
> - [x] 个性推荐[流行、古典、轻音乐、流行]
> - [x] 歌曲操作
>   - [x] 加入播放列表
>   - [ ] 喜欢
>   - [ ] 分享

#### 2、底部播放控件
> - [x] 播放
> - [x] 暂停
> - [x] 下一曲
> - [x] 播放进度条

#### 3、播放页面
> - [x] 上一曲
> - [x] 播放
> - [x] 暂停
> - [x] 下一曲
> - [x] 播放进度条[弧形进度条]
> - [x] 歌词滚动
> - [x] 播放的歌词高亮
> - [ ] 播放模式[单曲循环、列表循环、随机播放]

#### 4、播放列表
> - [x] 播放歌曲高亮
> - [x] 切歌(单击切歌)
> - [x] 删歌(点击右侧小X)
> - [ ] 清空播放列表
> - [ ] 本地缓存播放列表

#### 5、排行榜
> - [x] 热门排行榜
> - [x] 排行榜里的歌曲(单击播放)

#### 6、音乐搜索
输入搜索关键词，点击`放大镜`图标
> - [x] 单曲(单击或点击歌曲操作(...)添加至音乐播放列表，部分音乐会存在版权问题无法播放)
> - [x] 歌手
> - [x] 专辑
> - [x] 歌单
> - [x] 用户

#### 侧边栏
> - [x] 头像
> - [x] 菜单
>   - [x] 个人中心

### API
感谢作者把api整理的这么好(点个赞👍)
>[网易云音乐 NodeJS 版 API](https://binaryify.github.io/NeteaseCloudMusicApi/#/?id=%e6%90%9c%e7%b4%a2%e9%9f%b3%e4%b9%90)

### 开发心得与总结

#### 1、轮播图
首先感谢作者[ShanaMaid/vue-image-scroll](https://github.com/ShanaMaid/vue-image-scroll)开源的代码，我把代码copy下来自己进行了一点修改(没有手指滑动效果)，因为这是移动端，少不了的手指滑动切换，所以添加了[vue-touch](https://github.com/vuejs/vue-touch#next)(偷偷告诉你，vue-touch的next分支还是支持vue2.0的😜)。[代码传送门](https://github.com/hzzly/MagicMusic/blob/master/src/components/banner.vue)
```javascript
<li v-for="(item,index) in image" :class="[move[index]]">
    <v-touch class="vuetouch"
            v-on:swipeleft="nextPic"
            v-on:swiperight="prePic">
        ...
    </v-touch>
</li>

methods: {
    nextPic(event) {
        let temp = this.move.pop()
        this.move.unshift(temp)
    },
    prePic(event) {
        let temp = this.move.shift()
        this.move.push(temp)
    },
}
```

#### 2、歌曲操作(喜欢，分享，加入播放列表)动画、播放列表展开与删除歌曲动画
> `Vue`提供了`transition`的封装组件，在下列情形中，可以给任何元素和组件添加 entering/leaving 过渡
>   * 条件渲染 （使用 v-if）
>   * 条件展示 （使用 v-show）
>   * 动态组件
>   * 组件根节点

```javascript
<transition name="move">
    <div class="menu" v-show="item.menuShow">
        ...
    </div>
</transition>

<transition-group name="slide" tag="div" class="list-wrapper">
    <div class="item" v-for="(item, index) in listenLists" :key="item">
        ...
    </div>
</transition-group>
```
> `transition-group`一组过度动画，这里有个小坑的，之前看官网列表过渡的栗子，给每一项设置唯一的key值，一般都会用index。所以在做的时候就把index传给key，结果过渡老是不对，后来换成对应的`item`就正常了(生无可恋脸)。

#### 3、直线进度条、弧形进度条
> 西班牙建筑大师曾说过：“直线属于人类，曲线则归于上帝”。在这里我大胆的使用了弧形来作为进度条，(几大热门音乐APP貌似还没有弧形进度条😄)。

这里我用到了Vue的**绑定内联样式**
```javascript
//首页底部直线进度条
<div class="progress-bar">
    <div class="play"
        :style="{width: (now / duration).toFixed(3)*100 + '%'}"></div>
</div>

//播放页弧形进度条
//因为用到了弧形，所以我这里用到了`border-radius`来使它变成一个大圆，然后平移`translateX`居中，其它不要的部分`overflow: hidden`。
//这里用两个div来表示进度条，一条固定的进度条，一条慢慢增加。
<div class="process" @click="showToast">
    <div class="line"></div>
    <div class="pro" :style="{transform: `translateX(${translateX}) rotate(${deg*1 + 56.5*((now / size).toFixed(3))}deg)`}"></div>
</div>
```

#### 4、本地存储
> 将一些数据缓存到localStorage，可以减少Http请求，从而优化页面加载时间。

在这个项目中首页歌曲列表以及搜索历史用到了本地缓存，拿搜索历史来举栗：
```javascript
created() {
    if (!localStorage.searchHistory) {
        let searchHistory = ['前端', '童话镇', '刚好遇见你']
        localStorage.searchHistory = JSON.stringify(searchHistory)
    } 
},
methods: {
    _search(keywords) {
        //判断搜索列表中是否已存在
        let searchHistory = JSON.parse(localStorage.searchHistory)
        let find = searchHistory.findIndex((val) => {
            return val === keywords
        })
        find === -1 ? localStorage.searchHistory = JSON.stringify([keywords, ...searchHistory]) : ''
    }
}
```

#### 5、图片懒加载
使用了[vue-lazyload](https://github.com/hilongjw/vue-lazyload?from=gold)插件
用法👉：
```node
$ npm install vue-lazyload
```
```javascript
//main.js
import VueLazyLoad from 'vue-lazyload'
import def_lazy_img from '../static/img/loading.gif' //懒加载的默认图片
Vue.use(VueLazyLoad,{
    loading: def_lazy_img
}) //使用懒加载组件

//在使用img标签的地方使用
<img v-lazy="item.al.picUrl" alt="">
```

#### 6、歌词滚动与高亮
因为api提供的歌词包括时间，如：`[03:57.280]原谅我这一生不羁放纵爱自由`
所以首先要进行字符串切割：
```javascript
<div class="lyric">
    <div class="roll-lyric" v-html="lyrics" ref="lyric"></div>
</div>

computed: {
    lyrics() {
        let lyrics = ''
        this.lyricArr = []
        if (this.lyric) {
            let arr = this.lyric.split('\n')
            for (let item of arr) {
                if (item) {
                    let arr2 = item.split(']')
                    this.lyricArr.push(arr2[0].substring(1,3)*60+arr2[0].substring(4)*1)
                    if (arr2) {
                        lyrics += `<p class='lyrichook' style='margin: 10px 0'>${arr2[1]}</p>`
                    }
                }
            }
        } else {
            lyrics = '暂无歌词~'
        }
        return lyrics
    }
}
```

然后在播放的监听事件中与播放的当前做对比：
```javascript
this.$refs.myAudio.addEventListener('play', () => {
    this.pDOM = [...document.querySelectorAll('.lyrichook')]
    timer = setInterval(() => {
        this.now = audioDOM.currentTime
        this.lyricArr.forEach((item, index) => {
            if (parseInt(item) == parseInt(this.now)) {
                this.pDOM.forEach((p) => {
                    p.style.color = 'rgba(255,255,255,.8)' //其它歌词清除高亮
                });
                this.pDOM[index].style.color = '#f12c61' //歌词高亮
                this.$refs.lyric.style.transform = `translateY(-${(index-2)*25}px)` //歌词滚动
            } 
        });
    }, 1000)
})
```
到这就ok了😜

#### 7、vuex状态管理
推荐官方调试工具 [devtools extension](https://github.com/vuejs/vue-devtools)
> 想进一步理解vuex，可以看这篇博客[vuex学习实践笔记](https://hzzly.github.io/2017/04/04/vuex%E5%AD%A6%E4%B9%A0%E5%AE%9E%E8%B7%B5%E7%AC%94%E8%AE%B0/)

之前看到好多人写的vuex，把整个项目的数据放到了一个state里，导致应用的所有状态集中到一个很大的对象。但是，当应用变得很大时，store 对象会变得臃肿不堪。
> 所以我建议(个人见解，轻喷)：将 store 分割到模块（module）。每个模块拥有自己的 state、mutation、action、getters。这样方便管理与后期的维护。

车已到站✌️。

不知不觉写了这么多，老铁们凑合这看吧😁，觉得还行的可以点个star，**你的star是我继续开源创作的动力**，谢谢！！！
