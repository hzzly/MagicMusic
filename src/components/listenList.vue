<template>
    <div class="listen-list">
        <div class="num">
            <i class="icon">&#xe6ae;</i> 循环播放({{musicLists.length}}首)
        </div>
        <div class="list">
            <transition-group name="slide"
                              tag="div"
                              class="list-wrapper">
                <div class="item"
                     v-for="(item, index) in musicLists"
                     :key="item">
                    <p :class="{'current': currentIndex == index}"
                       @click="_play(item)">
                        {{item.name}}
                        <span>-- {{item.sname}}</span>
                        <i class="icon"
                           v-show="currentIndex == index">&#xe641;</i></p>
                    <div class="delete"
                         @click="_delete(index)"><i class="icon">&#xe656;</i></div>
                </div>
            </transition-group>
        </div>
    
        <div class="close"
             @click="_close">关闭</div>
    </div>
</template>

<script>

import { mapGetters } from 'vuex'

export default {
    data() {
        return {
            // musicList: this.musicLists
        }
    },
    methods: {
        _close() {
            this.$store.dispatch('setShowListenList', false)
        },
        _play(music) {
            this.$store.dispatch('setPlaying', false)
            this.$store.dispatch('setAudio', music)
            this.$nextTick(() => {
                this.$store.dispatch('setPlaying', true)
            })
            this.$store.dispatch('setShowListenList', false)
        },
        _delete(index) {
            if(this.currentIndex === index) {
                return
            }
            this.$store.dispatch('deleteMusic', index)
        }
    },
    computed: {
        ...mapGetters([
            'musicLists',
            'audio'
        ]),
        currentIndex() {
            for (let i = 0; i < this.musicLists.length; i++) {
                if (this.musicLists[i].name === this.audio.name) {
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
        height: px2rem(90px);
        line-height: px2rem(90px);
        font-size: px2rem(28px);
        margin: 0 px2rem(15px);
        .icon {
            font-size: px2rem(34px);
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
}

@media screen and(min-width: 769px) {
    .listen-list {
        width: 460px;
    }
}
</style>