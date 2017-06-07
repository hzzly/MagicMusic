# MagicMusic

>前言：在最近的一个外包项目[中包联盟](http://www.zblmchina.com/#/post)中使用到了video，遇到了好多坑。突发奇想来踩一踩audio的坑😀，果然一入深似海，👇下面将分享我的DIY之路-Vue音乐播放器。
>注：本项目为开源项目，不能用于商业应用，仅供学习。

[温馨提示：pc浏览f12手机模式最佳,手机建议wifi下访问,低版本浏览器可能有兼容性问题]

**demo地址：** [http://hzzly.net/magic-music](http://hzzly.net/magic-music)

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
## 跨域
> 在 clone 下来的api中的 `app.js` 中添加如下代码(这是API中的app.js，不是项目中的，好多人说找不到！！！)

```javascript
//设置跨域访问  
app.all('*', function(req, res, next) {  
    res.header("Access-Control-Allow-Origin", "*");  
    res.header("Access-Control-Allow-Headers", "X-Requested-With");  
    res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");  
    res.header("X-Powered-By",' 3.2.1')  
    res.header("Content-Type", "application/json;charset=utf-8");  
    next();  
});  
```

👉老铁们，准备发车(技能点)：
> * [vue文档](https://cn.vuejs.org/)
> * [vue-router文档](https://router.vuejs.org/zh-cn/)
> * [vuex文档](https://vuex.vuejs.org/zh-cn/) 不想看文档的可以看看我这篇博客[vuex学习实践笔记](https://hzzly.github.io/2017/04/04/vuex%E5%AD%A6%E4%B9%A0%E5%AE%9E%E8%B7%B5%E7%AC%94%E8%AE%B0/)
> * [axios文档](https://www.npmjs.com/package/axios) 或者这篇博客 [Vuex2 与 Axios 开发](https://blog.ygxdxx.com/2017/02/01/Vuex2&Axios-Develop/)(我也是参考这篇，感谢作者😁)
> * [es6(阮一峰的es6入门)](http://es6.ruanyifeng.com/) 可以参考[我的es6之路](http://hjingren.cn/tag/#es6)(还在继续,轻喷)
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
> - [x] 清空播放列表
> - [x] 本地缓存播放列表

#### 5、排行榜
> - [x] 热门排行榜
> - [x] 排行榜里的歌曲(单击播放)
> - [x] 播放全部

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


第一版文章：[DIY一个自己的音乐播放器](http://hjingren.cn/2017/04/27/%E2%80%99DIY%E4%B8%80%E4%B8%AA%E8%87%AA%E5%B7%B1%E7%9A%84%E9%9F%B3%E4%B9%90%E6%92%AD%E6%94%BE%E5%99%A8/)

第二版文章：[DIY一个人自己的音乐播放器2.0来袭](http://hjingren.cn/2017/06/05/DIY%E4%B8%80%E4%B8%AA%E4%BA%BA%E8%87%AA%E5%B7%B1%E7%9A%84%E9%9F%B3%E4%B9%90%E6%92%AD%E6%94%BE%E5%99%A82-0%E6%9D%A5%E8%A2%AD/)


车已到站✌️。

不知不觉写了这么多，老铁们凑合这看吧😁。
MagicMusic还在不断努力的改进，觉得还行的可以点个star，**你的star是我继续开源创作的动力**，谢谢！！！


### 广告

2018届毕业生求职ing
简历👉：[黄敬仁个人简历](http://hzzly.net/resume/)