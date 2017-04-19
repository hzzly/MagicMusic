<template>
    <div class="playbar">
        <div class="play-box">
            <div class="music-avatar"
                 @click="showPlay()">
                <img :src="audio.imgUrl"
                     alt="">
            </div>
            <div class="music-info"
                 @click="showPlay()">
                <div class="music-name">{{audio.name}}</div>
                <div class="music-s">{{audio.sname}}</div>
            </div>
            <div class="music-play">
                <i class="icon"
                   v-if="playing"
                   @click="_pause()">&#xe60a;</i>
                <i class="icon"
                   v-else
                   @click="_play()">&#xe606;</i>
            </div>
            <div class="music-next"
                 @click="_next()"><i class="icon">&#xe718;</i></div>
            <div class="music-list"
                 @click="showList()"><i class="icon">&#xe927;</i></div>
        </div>
        <div class="progress-bar">
            <div class="play" :style="{width: (now / duration).toFixed(3)*100 + '%'}"></div>
        </div>
        <audio preload
               ref="myAudio"
               :src="audio.mp3Url"
               @ended="_next()"></audio>
        <transition name="fold">
            <v-listen-list v-show="showListenList"></v-listen-list>
        </transition>
    </div>
</template>

<script>
import listenList from '@/components/listenList'

import { mapGetters } from 'vuex'

export default {
    components: {
        'v-listen-list': listenList
    },
    data() {
        return {
            now: '',
            duration: '200.045714'
        }
    },
    computed: {
        ...mapGetters([
            'musicLists',
            'audio',
            'showListenList',
            'playing',
            'size'
        ])
    },
    mounted() {
        let timer
        this.$refs.myAudio.addEventListener('play', () => {
            timer = setInterval(() => {
                this.duration = this.$refs.myAudio.duration
                this.now = this.$refs.myAudio.currentTime
            }, 1000)
        })
        this.$refs.myAudio.addEventListener('pause', () => {
            clearInterval(timer)
        })
    },
    methods: {
        _play() {
            this.$store.dispatch('setPlaying', true)
        },
        _pause() {
            this.$store.dispatch('setPlaying', false)
        },
        _next() {
            this.$store.dispatch('setPlaying', false)
            for (let i = 0; i < this.musicLists.length; i++) {
                if (this.musicLists[i].name === this.audio.name) {
                    this.$store.dispatch('setNextAudio', i)
                    this.$nextTick(() => {
                        this.$store.dispatch('setPlaying', true)
                        this.$store.dispatch('getMusicInfo', this.audio.id)
                    })
                    return
                }
            }
            
        },
        showList() {
            this.$store.dispatch('setShowListenList', true)
        },
        showPlay() {
            console.log('showPlay')
            this.$store.dispatch('setShowPlay', true)
        },
    },
    watch: {
        playing() {
            this.playing ? this.$refs.myAudio.play() : this.$refs.myAudio.pause()
        },
        audio() {
            this.now = 0
            this.$refs.myAudio.addEventListener('loadedmetadata', () => {
                this.$store.dispatch('getMusicTime', this.$refs.myAudio.duration)
            })
            this.$refs.myAudio.addEventListener('error', () => {
                alert('获取音乐出错')
                // this.$store.dispatch('getMusicTime', this.$refs.myAudio.duration)
            })
            // setTimeout(() => {
                
            // },500)
        },
    }
}
</script>

<style lang="scss" scoped>
@import '../assets/css/function';

.playbar {
    background: #ea2448;
    transition: all .7s ease-in;
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
                display: block;
            }
        }
    }
    .progress-bar {
        height: px2rem(4px);
        background: linear-gradient(#902541, #902444);
        .play {
            height: 100%;
            background: #fe7498;
        }
    }
    // &.fold-enter-active {
    //     transform: translate3d(0, 0, 0);
    // }
    // &.fold-enter,
    // &.fold-leave-active {
    //     transform: translate3d(0, -100%, 0);
    // }
    .fold-enter-active, .fold-leave-active {
        transition: transform .3s ease-in;
    }
    .fold-enter, .fold-leave-active {
        transform: translate3d(0, 100%, 0);
    }
}
</style>