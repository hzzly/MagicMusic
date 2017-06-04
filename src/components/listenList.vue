<template>
    <div class="listen-list">
        <div class="num">
            <span><i class="icon">&#xe6ae;</i> 循环播放({{listenLists.length}}首)</span>
            <span @click="_deleteListenLists"><i class="icon">&#xe612;</i> 清空</span>
        </div>
        <div class="list">
            <transition-group name="slide"
                              tag="div"
                              class="list-wrapper">
                <div class="item"
                     v-for="(item, index) in listenLists"
                     :key="item">
                    <p :class="{'current': currentIndex == index}"
                       @click="_play(item)">
                        {{item.name}}
                        <span v-if="item.ar">-- {{item.ar[0].name}}</span>
                        <span v-else>-- {{item.artists[0].name}}</span>
                        <i class="icon"
                           v-show="currentIndex == index">&#xe641;</i></p>
                    <div class="delete"
                         @click="_delete(index)"><i class="icon">&#xe656;</i></div>
                </div>
            </transition-group>
        </div>
    
        <div class="close"
             @click="_close">关闭</div>
        <div v-show="showListenList" class="mask" @click="_close"></div>
    </div>
</template>

<script>

import { mapGetters } from 'vuex'

import api from '../api'

export default {
    data() {
        return {
        }
    },
    methods: {
        _close() {
            this.$store.dispatch('setShowListenList', false)
        },
        _play(music) {
            this.$store.dispatch('setPlaying', false)
            this.$store.dispatch('setAudio', music)
            this.$store.dispatch('setShowPlayLoading', true)
            api.MusicUrl(music.id)
                .then(res => {
                    this.$store.dispatch('setAudioUrl', res.data[0].url)
                })
            let audioDOM = document.querySelector('audio')
            audioDOM.addEventListener('loadedmetadata', () => {
                this.$store.dispatch('getMusicInfo', music.id)
            })
            this.$store.dispatch('setShowListenList', false)
        },
        _delete(index) {
            if(this.currentIndex === index) {
                return
            }
            this.$store.dispatch('deleteMusic', index)
        },
        _deleteListenLists() {
            this.$store.dispatch('removeListenLists')
        }
    },
    computed: {
        ...mapGetters([
            'listenLists',
            'audio',
            'showListenList'
        ]),
        currentIndex() {
            for (let i = 0; i < this.listenLists.length; i++) {
                if (this.listenLists[i].name === this.audio[0].name) {
                    return i
                }
            }
        }
    }
}
</script>

<style lang="scss" scoped>
@import '../assets/css/function.scss';
.listen-list {
    position: absolute;
    bottom: 0;
    width: 100%;
    max-height: px2rem(885px);
    background: rgba(0, 0, 0, .8);
    z-index: 99;
    overflow: auto;
    color: #fff;
    display: flex;
    flex-direction: column;
    .num {
        display: flex;
        justify-content: space-between;
        flex: 0 0 px2rem(90px);
        line-height: px2rem(90px);
        font-size: px2rem(28px);
        span {
            padding: 0 px2rem(30px);
            .icon {
                font-size: px2rem(34px);
            }
        }
        
    }
    .list {
        flex: 1;
        overflow: auto;
        .item {
            display: flex;
            justify-content: space-between;
            height: px2rem(80px);
            line-height: px2rem(80px);
            margin: 0 px2rem(20px);
            padding-left: px2rem(15px);
            border-top: 1px solid rgba(255, 255, 255, .3);
            font-size: px2rem(26px);
            color: #fff;
            cursor: pointer;
            p {
                flex: 1;
                white-space: nowrap;
                overflow:hidden;
                text-overflow:ellipsis;
                span {
                    color: rgba(255, 255, 255, .6);
                    font-size: px2rem(24px);
                }
                &.current {
                    color: #eb234a;
                    span,
                    .icon {
                        color: #eb234a;
                        padding-right: px2rem(20px);
                    }
                }
            }
            .delete {
                width: px2rem(100px);
                text-align: right;
                box-sizing: border-box;
                padding-right: px2rem(20px);
            }
            &.slide-move {
                transition: all 1s;
            }
            &.slide-enter {
                transform: translate3d(-100%, 0, 0);
                opacity: 0;
            }
            &.slide-leave-active {
                position: absolute;
                transform: translate3d(-100%, 0, 0);
            }
        }
    }

    .close {
        height: px2rem(90px);
        line-height: px2rem(90px);
        text-align: center;
        font-size: px2rem(24px);
        border-top: 1px solid rgba(255, 255, 255, .7);
        cursor: pointer;
    }
    .mask{
	    position: fixed;
	    width: 100%;
	    margin: 0 auto;
	    top: 0;
	    left: 0;
	    bottom: 0;
	    right: 0;
	    z-index: -1;
	    background: rgba(0,0,0,.5);
	}
}

@media screen and(min-width: 769px) {
    .listen-list {
        width: 460px;
        margin: 0 auto;
        .mask {
            width: 460px !important;
        }
    }
}
</style>