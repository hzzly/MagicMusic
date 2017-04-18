<template>
    <div class="play">
        <div class="head">
            <div class="h-icon"
                 @click="hidePlay"><i class="icon">&#xe8e2;</i></div>
            <div class="h-icon"><i class="icon">&#xe93b;</i></div>
        </div>
        <div class="name">{{audio.name}}</div>
        <div class="operation">
            <div class="love"><i class="icon">&#xe615;</i></div>
            <div class="msg"><i class="icon">&#xe603;</i></div>
            <div class="share"><i class="icon">&#xe64c;</i></div>
        </div>
        <div class="content">
            <div class="lyrics">
                <div class="m-name">{{audio.name}}</div>
                <div class="s-name">{{audio.sname}}</div>
                <div class="lyric">
                    <p>因为我刚好遇见你</p>
                    <p>因为我刚好遇见你</p>
                    <p>刚好遇见你</p>
                    <p>因为我刚好遇见你</p>
                    <p>因为我刚好遇见你</p>
                    <p>因为我刚好遇见你</p>
                    <p>遇见你</p>
                    <p>因为我刚好遇见你</p>
                    <p>因为我刚好遇见你</p>
                    <p>因为我刚好遇见你</p>
                    <p>因为</p>
                </div>
            </div>
            <div class="time">
                <div class="n-time">3:25</div>
                <div class="t-time">4:15</div>
            </div>
            <div class="control">
                <div>
                    <div class="loop"><i class="icon">&#xe819;</i></div>
                    <div class="pre" @click="_pre()"><i class="icon">&#xe61e;</i></div>
                    <div class="pause">
                        <i class="icon"
                           v-if="playing"
                           @click="_pause()">&#xe644;</i>
                        <i class="icon"
                           v-else
                           @click="_play()">&#xe630;</i>
                    </div>
                    <div class="next"
                         @click="_next()"><i class="icon">&#xe604;</i></div>
                    <div class="list"
                         @click="showList()"><i class="icon">&#xe60f;</i></div>
                </div>
            </div>
            <div class="process">
                <div class="line"></div>
                <div class="pro"></div>
            </div>
        </div>
        <div class="background">
            <img :src="audio.imgUrl"
                 width="100%"
                 height="100%"
                 alt="">
        </div>
    </div>
</template>

<script>

import { mapGetters } from 'vuex'

export default {
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
    created() {

    },
    mounted() {

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
            for (let i = 0; i < this.musicLists.length; i++) {
                if (this.musicLists[i].name === this.audio.name) {
                    this.$store.dispatch('setPreAudio', i)
                    this.$nextTick(() => {
                        this.$store.dispatch('setPlaying', true)
                    })
                    return
                }
            }
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
        hidePlay() {
            this.$store.dispatch('setShowPlay', false)
        }
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
    .head {
        height: px2rem(100px);
        line-height: px2rem(100px);
        text-align: center;
        display: flex;
        justify-content: space-between;
        .h-icon {
            width: px2rem(100px);
            cursor: pointer;
            .icon {
                font-size: px2rem(46px);
            }
        }
    }
    .name {
        font-size: px2rem(60px); // font-weight: bold;
        color: #fff;
        position: absolute;
        top: px2rem(300px);
        left: 50%;
        transform: translateX(-50%);
    }
    .operation {
        position: absolute;
        right: px2rem(100px);
        top: px2rem(430px);
        z-index: 50;
        >div {
            width: px2rem(80px);
            height: px2rem(80px);
            line-height: px2rem(80px);
            text-align: center;
            border-radius: 50%;
            background: #f12c61;
            position: relative;
            cursor: pointer;
            .icon {
                font-size: px2rem(46px);
            }
        }
        .love {
            right: px2rem(150px);
            top: px2rem(60px);
            line-height: px2rem(90px);
        }
        .msg {
            right: px2rem(50px);
            background: #45c4a6;
        }
        .share {
            right: px2rem(-50px);
            top: px2rem(-58px);
            background: #7a3dfd;
        }
    }
    .content {
        height: 100%;
        overflow: hidden;
        position: relative;
        .lyrics {
            position: absolute;
            bottom: 0;
            width: 100%;
            height: px2rem(850px);
            background: rgba(40, 34, 78, .9);

            &::after {
                content: '';
                position: absolute;
                top: px2rem(-147.6px);
                width: 0;
                height: 0; // border-left: px2rem(750px) solid rgba(40, 34, 78, .9);
                border-bottom: px2rem(150px) solid rgba(40, 34, 78, .9);
                border-right: px2rem(750px) solid transparent;
            }
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
                width: px2rem(500px);
                height: px2rem(250px);
                margin: px2rem(40px) auto;
                color: rgba(255, 255, 255, .8);
                text-align: center;
                font-size: px2rem(30px);
                overflow: auto; // transform: translateY(20px);
                p {
                    margin: px2rem(20px) 0;
                    transform: translateY(-20px);
                }
            }
        }
        .time {
            width: 100%;
            height: px2rem(50px);
            line-height: px2rem(50px);
            text-align: center;
            position: absolute;
            bottom: px2rem(320px);
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
            bottom: px2rem(-850px); // width: px2rem(900px);
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
                }
            }
        }
        .process {
            position: absolute;
            bottom: px2rem(280px);
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
                transform: translateX(px2rem(-224px)) rotate(-528deg); //-462
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
        .name {
            top: px2rem(250px);
        }
        .operation {
            top: px2rem(350px);
        }
        .content {
            width: 460px;
            overflow: hidden;
            .lyrics {
                height: 500px;
                .lyric {
                    height: px2rem(200px);
                    font-size: px2rem(25px);
                }
            }
            .time {
                bottom: px2rem(250px);
            }
            .control {
                bottom: px2rem(-925px);
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
                bottom: px2rem(220px);
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