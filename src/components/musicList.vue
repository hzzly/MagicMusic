<template>
    <div class="music-list">
        <div class="list-item" v-for="(item, index) in musicData">
            <div class="avatar">
                <img :src="item.musicPic" alt="">
            </div>
            <div class="info">
                <div class="music-name">{{item.musicName}}<i class="tag" v-show="item.sq">SQ</i></div>
                <div class="music-s">{{item.musicS}}</div>
                <div class="music-hot"><i class="icon">&#xe650;</i>{{item.hot}}</div>
            </div>
            <div class="operation"><i class="icon">&#xe605;</i></div>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            "musicData": [
                {
                    "musicName": "暧昧",
                    "musicS": "薛之谦",
                    "src": "http://m10.music.126.net/20170413155603/1c2052140d3f05a882d5cf15a2555503/ymusic/57b7/3f5b/3c1d/9e8424b10ad130794e436bd47ad70c4b.mp3",
                    "musicPic": "http://p3.music.126.net/ap8OhyOkOPOz5M1A7VhgAA==/18822539557778052.jpg?param=130y130",
                    "hot": 144037
                },
                {
                    "musicName": "成都",
                    "musicS": "赵雷",
                    "src": "http://m10.music.126.net/20170413155603/1c2052140d3f05a882d5cf15a2555503/ymusic/57b7/3f5b/3c1d/9e8424b10ad130794e436bd47ad70c4b.mp3",
                    "musicPic": "http://p3.music.126.net/ap8OhyOkOPOz5M1A7VhgAA==/18822539557778052.jpg?param=130y130",
                    "hot": 144037,
                    "sq": true
                },
                {
                    "musicName": "刚好遇见你",
                    "musicS": "李玉刚",
                    "src": "http://m10.music.126.net/20170413155603/1c2052140d3f05a882d5cf15a2555503/ymusic/57b7/3f5b/3c1d/9e8424b10ad130794e436bd47ad70c4b.mp3",
                    "musicPic": "http://p3.music.126.net/ap8OhyOkOPOz5M1A7VhgAA==/18822539557778052.jpg?param=130y130",
                    "hot": 144037
                },
                {
                    "musicName": "童话镇",
                    "musicS": "陈一发儿",
                    "src": "http://m10.music.126.net/20170413155603/1c2052140d3f05a882d5cf15a2555503/ymusic/57b7/3f5b/3c1d/9e8424b10ad130794e436bd47ad70c4b.mp3",
                    "musicPic": "http://p3.music.126.net/ap8OhyOkOPOz5M1A7VhgAA==/18822539557778052.jpg?param=130y130",
                    "hot": 144037
                },
                {
                    "musicName": "Shape of You",
                    "musicS": "Ed Sheeran",
                    "src": "http://m10.music.126.net/20170413155603/1c2052140d3f05a882d5cf15a2555503/ymusic/57b7/3f5b/3c1d/9e8424b10ad130794e436bd47ad70c4b.mp3",
                    "musicPic": "http://p3.music.126.net/ap8OhyOkOPOz5M1A7VhgAA==/18822539557778052.jpg?param=130y130",
                    "hot": 144037
                },
                {
                    "musicName": "Faded",
                    "musicS": "Alan Walker",
                    "src": "http://m10.music.126.net/20170413155603/1c2052140d3f05a882d5cf15a2555503/ymusic/57b7/3f5b/3c1d/9e8424b10ad130794e436bd47ad70c4b.mp3",
                    "musicPic": "http://p4.music.126.net/8dzD62VK8jLDbhEqkmpIAg==/18277181788626198.jpg?param=130y130",
                    "hot": 144037
                },
                {
                    "musicName": "暧昧",
                    "musicS": "薛之谦",
                    "src": "http://m10.music.126.net/20170413155603/1c2052140d3f05a882d5cf15a2555503/ymusic/57b7/3f5b/3c1d/9e8424b10ad130794e436bd47ad70c4b.mp3",
                    "musicPic": "http://p3.music.126.net/ap8OhyOkOPOz5M1A7VhgAA==/18822539557778052.jpg?param=130y130",
                    "hot": 144037
                },
                {
                    "musicName": "暧昧",
                    "musicS": "薛之谦",
                    "src": "http://m10.music.126.net/20170413155603/1c2052140d3f05a882d5cf15a2555503/ymusic/57b7/3f5b/3c1d/9e8424b10ad130794e436bd47ad70c4b.mp3",
                    "musicPic": "http://p3.music.126.net/ap8OhyOkOPOz5M1A7VhgAA==/18822539557778052.jpg?param=130y130",
                    "hot": 144037
                },
                {
                    "musicName": "暧昧",
                    "musicS": "薛之谦",
                    "src": "http://m10.music.126.net/20170413155603/1c2052140d3f05a882d5cf15a2555503/ymusic/57b7/3f5b/3c1d/9e8424b10ad130794e436bd47ad70c4b.mp3",
                    "musicPic": "http://p3.music.126.net/ap8OhyOkOPOz5M1A7VhgAA==/18822539557778052.jpg?param=130y130",
                    "hot": 144037
                },
                {
                    "musicName": "暧昧",
                    "musicS": "薛之谦",
                    "src": "http://m10.music.126.net/20170413155603/1c2052140d3f05a882d5cf15a2555503/ymusic/57b7/3f5b/3c1d/9e8424b10ad130794e436bd47ad70c4b.mp3",
                    "musicPic": "http://p3.music.126.net/ap8OhyOkOPOz5M1A7VhgAA==/18822539557778052.jpg?param=130y130",
                    "hot": 144037
                },
                {
                    "musicName": "暧昧",
                    "musicS": "薛之谦",
                    "src": "http://m10.music.126.net/20170413155603/1c2052140d3f05a882d5cf15a2555503/ymusic/57b7/3f5b/3c1d/9e8424b10ad130794e436bd47ad70c4b.mp3",
                    "musicPic": "http://p3.music.126.net/ap8OhyOkOPOz5M1A7VhgAA==/18822539557778052.jpg?param=130y130",
                    "hot": 144037,
                    "sq": true
                },
                {
                    "musicName": "暧昧",
                    "musicS": "薛之谦",
                    "src": "http://m10.music.126.net/20170413155603/1c2052140d3f05a882d5cf15a2555503/ymusic/57b7/3f5b/3c1d/9e8424b10ad130794e436bd47ad70c4b.mp3",
                    "musicPic": "http://p3.music.126.net/ap8OhyOkOPOz5M1A7VhgAA==/18822539557778052.jpg?param=130y130",
                    "hot": 144037,
                    "sq": true
                },
                {
                    "musicName": "暧昧",
                    "musicS": "薛之谦",
                    "src": "http://m10.music.126.net/20170413155603/1c2052140d3f05a882d5cf15a2555503/ymusic/57b7/3f5b/3c1d/9e8424b10ad130794e436bd47ad70c4b.mp3",
                    "musicPic": "http://p3.music.126.net/ap8OhyOkOPOz5M1A7VhgAA==/18822539557778052.jpg?param=130y130",
                    "hot": 144037
                }
            ]
        }
    }
}
</script>

<style lang="scss" scoped>
@import '../assets/css/function.scss';
.music-list {
    background: #28224e;
    .list-item {
        height: px2rem(145px);
        border-bottom: 1px solid #3c3662;
        display: flex;
        align-items: center;
        cursor: pointer;
        color: #fff;
        &:last-child {
            border-bottom: none;
        }
        .avatar {
            width: px2rem(100px);
            height: px2rem(100px);
            border-radius: 50%;
            overflow: hidden;
            margin: 0 px2rem(15px) 0 px2rem(25px);
            img {
                width: 100%;
            }
        }
        .info {
            flex: 1;
            .music-name {
                font-size: px2rem(32px);
                font-weight: bold;
                vertical-align: middle;
                .tag {
                    font-size: px2rem(20px);
                    color: #e53f6f;
                    line-height: px2rem(20px);
                    border: 1px solid #e53f6f;
                    border-radius: px2rem(20px);
                    padding: 0 px2rem(8px);
                    vertical-align: middle;
                    margin-left: px2rem(6px);
                }
            }
            .music-s {
                font-size: px2rem(24px);
                color: #777686;
                line-height: px2rem(40px);
            }
            .music-hot {
                .icon {
                    font-size: px2rem(25px);
                    display: inline-block;
                    margin-right: px2rem(5px);
                    color: #e53f6f;
                }
            }
        }
        .operation {
            width: px2rem(100px);
            height: 100%;
            line-height: px2rem(145px);
            text-align: center;
        }
    }
}

@media screen and(min-width: 769px) {
    .list-item {
        .info {
            .music-hot {
                .icon {
                    font-size: 14px !important;
                }
            }
        }
    }
}
</style>