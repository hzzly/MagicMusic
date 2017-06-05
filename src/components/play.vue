<template>
    <div class="play">
        <div class="content">
            <div class="head">
                <div class="h-icon"
                    @click="hidePlay"><i class="icon">&#xe8e2;</i></div>
                <div class="h-icon" @click="showToast"><i class="icon">&#xe93b;</i></div>
            </div>
            <div class="lyrics">
                <div class="m-name">{{audio[0].name}}</div>
                <div class="s-name"
                     v-if="audio[0].ar">{{audio[0].ar[0].name}}</div>
                <div class="s-name"
                     v-else>{{audio[0].artists[0].name}}</div>
                <div class="lyric">
                    <div class="roll-lyric"
                         v-html="lyrics" ref="lyric"></div>
                </div>
            </div>
            <div class="time">
                <div class="n-time">{{nowTime}}</div>
                <div class="t-time">{{totalTime}}</div>
            </div>
            <div class="control">
                <div>
                    <div class="loop" @click="showToast"><i class="icon">&#xe819;</i></div>
                    <div class="pre"
                         @click="_pre()"><i class="icon">&#xe61e;</i></div>
                    <div class="pause">
                        <i class="icon"
                           v-if="playing"
                           @click="_pause()">&#xe644;</i>
                        <i class="icon pause-icon"
                           v-else
                           @click="_play()">&#xe630;</i>
                    </div>
                    <div class="next"
                         @click="_next()"><i class="icon">&#xe604;</i></div>
                    <div class="list"
                         @click="showList()"><i class="icon">&#xe60f;</i></div>
                </div>
            </div>
            <div class="process" @click="showToast">
                <div class="line"></div>
                <div class="pro" :style="{transform: `translateX(${translateX}) rotate(${deg*1 + 56.5*((now / size).toFixed(3))}deg)`}"></div>
            </div>
        </div>
        <div class="background">
            <img :src="audio[0].al.picUrl"
                 width="100%"
                 height="100%"
                 alt=""
                 v-if="audio[0].al">
            <img :src="audio[0].album.picUrl"
                 width="100%"
                 height="100%"
                 alt=""
                 v-else>
        </div>
    </div>
</template>

<script>
import Vue from 'vue'
import { mapGetters } from 'vuex'

import api from '../api'
import * as _ from '../util/tool'

export default {
    data() {
        return {
            now: '',
            lyricArr: [],
            pDom: [],
            deg: '',
            translateX: ''
        }
    },
    computed: {
        ...mapGetters([
            'listenLists',
            'audio',
            'showListenList',
            'playing',
            'lyric',
            'size'
        ]),
        lyrics() {
            let lyrics = ''
            this.lyricArr = []
            if (this.lyric) {
                let arr = this.lyric.split('\n')
                for (let item of arr) {
                    if (item) {
                        let arr2 = item.split(']')
                        // console.log(arr2[0])
                        // console.log(arr2[0].substring(1,3)*60)
                        // console.log(arr2[0].substring(4))
                        this.lyricArr.push(arr2[0].substring(1,3)*60+arr2[0].substring(4)*1)
                        // console.log(this.lyricArr)
                        if (arr2) {
                            lyrics += `<p class='lyrichook' style='margin: 10px 0'>${arr2[1]}</p>`
                        }
                    }
                }
            } else {
                lyrics = '暂无歌词~'
            }
            return lyrics
        },
        totalTime() {
            let m, s
            m = Math.floor(this.size / 60)
            m = m.toString().length == 1 ? ('0' + m) : m
            s = Math.floor(this.size - 60 * m)
            s = s.toString().length == 1 ? ('0' + s) : s
            return m + ':' + s
        },
        nowTime() {
            let m, s
            m = Math.floor(this.now / 60)
            m = m.toString().length == 1 ? ('0' + m) : m
            s = Math.floor(this.now - 60 * m)
            s = s.toString().length == 1 ? ('0' + s) : s
            return m + ':' + s
        },
    },
    created() {
        this.resize()
    },
    mounted() {
        let timer,
            audioDOM = document.querySelector('audio')
        audioDOM.addEventListener('play', () => {
            this.pDOM = [...document.querySelectorAll('.lyrichook')]
            timer = setInterval(() => {
                this.now = audioDOM.currentTime
                this.lyricArr.forEach((item, index) => {
                    if (parseInt(item) == parseInt(this.now)) {
                        this.pDOM.forEach((p) => {
                            p.style.color = 'rgba(255,255,255,.8)'
                        });
                        this.pDOM[index].style.color = '#f12c61'
                        this.$refs.lyric.style.transform = `translateY(-${(index-7)*25}px)`
                        
                    } 
                });
            }, 1000)
        })
        audioDOM.addEventListener('pause', () => {
            clearInterval(timer)
        })
        window.addEventListener('resize', () => {
            this.resize()
        })
    },
    methods: {
        _play() {
            this.$store.dispatch('setPlaying', true)
        },
        _pause() {
            this.$store.dispatch('setPlaying', false)
        },
        _pre() {
            this.$store.dispatch('setPlaying', false)
            this.$store.dispatch('setShowPlayLoading', true)
            for (let i = 0; i < this.listenLists.length; i++) {
                if (this.listenLists[i].name === this.audio[0].name) {
                    this.$store.dispatch('setPreAudio', i)
                    break
                }
            }
            if (this.audio[0].mp3Url) {
                this.$store.dispatch('setAudioUrl', this.audio[0].mp3Url)
            } else {
                api.MusicUrl(this.audio[0].id)
                    .then(res => {
                        this.$store.dispatch('setAudioUrl', res.data[0].url)
                    })
            }
        },
        _next() {
            this.$store.dispatch('setPlaying', false)
            this.$store.dispatch('setShowPlayLoading', true)
            for (let i = 0; i < this.listenLists.length; i++) {
                if (this.listenLists[i].name === this.audio[0].name) {
                    this.$store.dispatch('setNextAudio', i)
                    break
                }
            }
            if (this.audio[0].mp3Url) {
                this.$store.dispatch('setAudioUrl', this.audio[0].mp3Url)
            } else {
                api.MusicUrl(this.audio[0].id)
                    .then(res => {
                        this.$store.dispatch('setAudioUrl', res.data[0].url)
                    })
            }
        },
        showList() {
            this.$store.dispatch('setShowListenList', true)
        },
        hidePlay() {
            this.$store.dispatch('setShowPlay', false)
        },
        showToast() {
            _.toast('开发中，敬请期待...')
        },
        resize() {
            let cwidth = document.body.clientWidth
            if(cwidth === 460) {
                this.translateX = '-3.73333rem'
                this.deg = '-523'
            } else {
                this.translateX = '-2.98667rem'
                this.deg = '-527'
            }
        },
    },
    watch: {
        size() {
            this.$refs.lyric.style.transform = 'translateY(0px)'
        },
        lyrics() {
            this.$nextTick(() => {
                this.pDOM = [...document.querySelectorAll('.lyrichook')]
            })
        },
    }
}
</script>

<style lang="scss" scoped>
@import '../assets/css/function.scss';
.play {
    position: absolute;
    top: 0;
    bottom: 0;
    z-index: 20;
    width: 100%;
    background: rgba(0, 0, 0, .5);
    overflow: hidden;
    .content {
        height: 100%;
        overflow: hidden;
        position: relative;
        background: rgba(40, 34, 78, .7);
        .head {
            height: px2rem(100px);
            line-height: px2rem(100px);
            text-align: center;
            display: flex;
            justify-content: space-between;
            border-bottom: 1px solid rgba(40, 34, 78, .2);
            .h-icon {
                width: px2rem(100px);
                cursor: pointer;
                .icon {
                    font-size: px2rem(46px);
                }
            }
        }
        .lyrics {
            width: 100%;
            height: 100%;
            .m-name {
                font-size: px2rem(38px);
                text-align: center;
                color: #fff;
                margin: px2rem(20px);
            }
            .s-name {
                color: rgba(255, 255, 255, .8);
                font-size: px2rem(32px);
                text-align: center;
            }
            .lyric {
                width: px2rem(700px);
                height: px2rem(750px);
                margin: px2rem(40px) auto;
                color: rgba(255, 255, 255, .8);
                text-align: center;
                font-size: px2rem(30px);
                overflow: auto; 
                .roll-lyric {
                    transition: transform .5s;
                    // transform: translateY(200px);
                }
            }
        }
        .time {
            width: 100%;
            height: px2rem(50px);
            line-height: px2rem(50px);
            text-align: center;
            position: absolute;
            bottom: px2rem(220px);
            color: #fff;
            display: flex;
            justify-content: space-between;
            font-size: px2rem(28px);
            >div {
                width: px2rem(100px);
            }
        }
        .control {
            position: absolute;
            bottom: px2rem(-960px); // width: px2rem(900px);
            width: px2rem(1200px);
            left: px2rem(-225px);
            height: px2rem(1200px);
            background: #ea2448;
            border-radius: 50%;
            border-bottom-color: transparent;
            z-index: 30;
            >div {
                width: px2rem(650px);
                display: flex;
                height: px2rem(120px);
                line-height: px2rem(120px);
                transform: translate(px2rem(280px), px2rem(80px));
                >div {
                    flex: 1;
                    z-index: 35;
                    text-align: center;
                    cursor: pointer;
                    .icon {
                        font-size: px2rem(54px);
                    }
                    &:first-child,
                    &:last-child {
                        padding-top: px2rem(8px);
                        .icon {
                            font-size: px2rem(40px);
                        }
                    }
                }
                .pause {
                    background: #fff;
                    border-radius: 50%;
                    margin: 0 px2rem(6px) 0 px2rem(10px);
                    .icon {
                        color: #4436b1;
                    }
                    .pause-icon {
                        margin-top: px2rem(12px);
                        margin-left: px2rem(6px);
                    }
                }
            }
        }
        .process {
            position: absolute;
            bottom: px2rem(170px);
            width: 100%;
            height: px2rem(100px);
            overflow: hidden;
            z-index: 40;
            .line {
                width: px2rem(1200px);
                height: px2rem(1200px);
                border-radius: 50%;
                position: absolute;
                transform: translateX(px2rem(-224px)) rotate(100deg);
                border: 1px solid rgba(255, 255, 255, .6);
                border-bottom-color: transparent;
            }
            .pro {
                width: px2rem(1200px);
                height: px2rem(1200px);
                border-radius: 50%;
                position: absolute;
                transform: translateX(-2.98667rem) rotate(-528deg); //-462
                border: 2px solid #fff;
                border-bottom-color: transparent;
            }
        }
    }
    .background {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        z-index: -1;
        filter: blur(5px);
    }
}

@media screen and(min-width: 769px) {
    .play {
        width: 460px;
        .content {
            width: 460px;
            overflow: hidden;
            .lyrics {
                height: 580px;
                .lyric {
                    height: 75%;
                    width: 460px;
                    font-size: px2rem(25px);
                }
            }
            .time {
                bottom: px2rem(150px);
            }
            .control {
                bottom: px2rem(-1020px);
                left: px2rem(-280px);
                >div {
                    width: px2rem(550px);
                    height: px2rem(100px);
                    line-height: px2rem(100px);
                    transform: translate(px2rem(325px), px2rem(60px));
                    >div {
                        .icon {
                            font-size: px2rem(44px);
                        }
                        &:first-child,
                        &:last-child {
                            padding-top: px2rem(8px);
                            .icon {
                                font-size: px2rem(30px);
                            }
                        }
                    }
                    .pause {
                        margin: 0 px2rem(6px) 0 px2rem(10px);
                    }
                }
            }
            .process {
                bottom: px2rem(125px);
                overflow: hidden;
                height: px2rem(75px);
                .line {
                    width: px2rem(1200px);
                    height: px2rem(1200px);
                    border-radius: 50%;
                    position: absolute;
                    transform: translateX(px2rem(-280px)) rotate(100deg);
                    border: 1px solid rgba(255, 255, 255, .6);
                    border-bottom-color: transparent;
                }
                .pro {
                    width: px2rem(1200px);
                    height: px2rem(1200px);
                    border-radius: 50%;
                    position: absolute;
                    transform: translateX(px2rem(-280px)) rotate(-523deg); //-462
                    border: 2px solid #fff;
                    border-bottom-color: transparent;
                }
            }
        }
    }
}
</style>