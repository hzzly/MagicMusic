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
            <div class="play"></div>
        </div>
        <audio preload
               ref="myAudio"
               :src="audio.mp3Url"
               @ended="_next()"></audio>
        <v-listen-list v-show="showListenList"></v-listen-list>
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

        }
    },
    computed: {
        ...mapGetters([
            'musicLists',
            'audio',
            'showListenList',
            'playing'
        ])
    },
    mounted() {
        // let timer = setInterval(() => {
        //     console.log(this.$refs.myAudio.currentTime)
        // }, 1000)
        // this.$refs.myAudio.addEventListener('play', () => {
        //     console.log(this.$refs.myAudio.currentTime)
        //     setInterval(() => {
        //         console.log(this.$refs.myAudio.currentTime)
        //     }, 1000)
        //     // console.log(this.$refs.myAudio.currentTime)
        // })
    },
    methods: {
        _play() {
            console.log(this.$refs.myAudio.src)
            // this.playing ? this.$refs.myAudio.pause() : this.$refs.myAudio.play()
            // this.playing = !this.playing
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
        changeProcess() {

        }
    },
    watch: {
        deep: true,
        playing() {
            this.playing ? this.$refs.myAudio.play() : this.$refs.myAudio.pause()
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
                display: block;
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