<template>
    <div class="playbar">
        <div class="play-box">
            <div class="music-avatar"
                 @click="showPlay()">
                <img src="http://p3.music.126.net/ap8OhyOkOPOz5M1A7VhgAA==/18822539557778052.jpg?param=130y130"
                     alt="">
            </div>
            <div class="music-info"
                 @click="showPlay()">
                <div class="music-name">暧昧</div>
                <div class="music-s">薛之谦</div>
            </div>
            <div class="music-play"
                 @click="play()">
                <i class="icon"
                   v-if="playing">&#xe60a;</i>
                <i class="icon"
                   v-else>&#xe606;</i>
            </div>
            <div class="music-next"
                 @click="next()"><i class="icon">&#xe718;</i></div>
            <div class="music-list"
                 @click="showList()"><i class="icon">&#xe927;</i></div>
        </div>
        <div class="progress-bar">
            <div class="play"></div>
        </div>
        <audio preload
               ref="myAudio"
               src="http://m10.music.126.net/20170413174301/bb78a4e4daf144294bacebc756ce0879/ymusic/57b7/3f5b/3c1d/9e8424b10ad130794e436bd47ad70c4b.mp3"></audio>
        <v-listen-list v-show="showLists"></v-listen-list>
    </div>
</template>

<script>
import listenList from '@/components/listenList'

export default {
    components: {
        'v-listen-list': listenList
    },
    data() {
        return {
            playing: false,
            showLists: false
        }
    },
    mounted() {
        // let timer = setInterval(() => {
        //     console.log(this.$refs.myAudio.currentTime)
        // }, 1000)
        this.$refs.myAudio.addEventListener('play', () => {
            console.log(this.$refs.myAudio.currentTime)
            setInterval(() => {
                console.log(this.$refs.myAudio.currentTime)
            }, 1000)
            // console.log(this.$refs.myAudio.currentTime)
        })
    },
    methods: {
        play() {
            console.log(this.$refs.myAudio.duration)
            this.playing ? this.$refs.myAudio.pause() : this.$refs.myAudio.play()
            this.playing = !this.playing
        },
        next() {
            console.log('next')
        },
        showList() {
            console.log('showList')
            this.showLists = true
        },
        showPlay() {
            console.log('showPlay')
        },
        changeProcess() {

        }
    }
}
</script>

<style lang="scss" scoped>
@import '../assets/css/function';

.playbar {
    background: #ea2448;
    .play-box {
        display: flex;
        align-items: center;
        height: px2rem(110px);
        color: #fff;
        cursor: pointer;
        .music-avatar {
            width: px2rem(80px);
            height: px2rem(80px);
            border-radius: 50%;
            margin: 0 px2rem(20px) 0 px2rem(30px);
            overflow: hidden;
            img {
                width: 100%;
            }
        }
        .music-info {
            flex: 4;
            .music-name {
                font-size: px2rem(30px);
                font-weight: bold;
            }
            .music-s {
                font-size: px2rem(22px);
                color: rgba(255, 255, 255, .7);
                margin-top: px2rem(5px);
            }
        }
        .music-play,
        .music-next,
        .music-list {
            flex: 1;
            height: 100%;
            line-height: px2rem(110px);
            cursor: pointer;
            .icon {
                font-size: px2rem(44px);
            }
        }
    }
    .progress-bar {
        height: px2rem(4px);
        background: linear-gradient(#902541, #902444);
        .play {
            height: 100%;
            width: 60%;
            background: #fe7498;
        }
    }
}
</style>