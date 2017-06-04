<template>
    <div class="music-list">
        <div class="list-item"
             v-for="(item, index) in musicLists" v-show="!showLoading">
            <div class="avatar"
                 @click="_play(item)">
                <img v-if="item.al" v-lazy="item.al.picUrl"
                     alt="">
                <img v-else
                     v-lazy="item.album.picUrl"
                     alt="">
            </div>
            <div class="info"
                 @click="_play(item)">
                <div class="music-name">{{item.name}}<i class="tag"
                       v-show="item.sq">SQ</i></div>
                <div class="music-s"
                     v-if="item.ar">{{item.ar[0].name}}</div>
                <div class="music-s"
                     v-else>{{item.artists[0].name}}</div>
                <div class="music-hot"
                     v-show="item.hot"><i class="icon">&#xe650;</i>{{item.hot}}</div>
            </div>
            <div class="operation"
                 @click="_showOperation(index)"><i class="icon">&#xe605;</i></div>
            <animation-menu :item="item"
                            :index="index"></animation-menu>
        </div>
        <v-loading v-show="showLoading"></v-loading>
    </div>
</template>

<script>
import animationMenu from '@/components/animationMenu'
import VLoading from '@/components/loading'

import Vue from 'vue'
import { mapGetters } from 'vuex'

import api from '../api'

export default {
    components: {
        animationMenu,
        VLoading
    },
    props: {
        musicLists: Array
    },
    data() {
        return {
        }
    },
    computed: {
        ...mapGetters([
            'listenLists',
            'showLoading',
        ])
    },
    methods: {
        _play(music) {
            this.$store.dispatch('setPlaying', false)
            this.$store.dispatch('setAudio', music)
            this.$store.dispatch('setShowPlayLoading', true)
            //查找试听列表中有没有点击中的歌
            let x = this.listenLists.findIndex((item) => {
                //判断是否是搜索列表里的(搜索结果字段不一样)
                if(item.ar && music.ar) {
                    return item.name == music.name && item.ar[0].name == music.ar[0].name
                } else if(item.artists && music.artists) {
                    return item.name == music.name && item.artists[0].name == music.artists[0].name
                }
            })
            if(x === -1) {
                this.$store.dispatch('addListenLists', music)
            }
            if (music.mp3Url) {
                this.$store.dispatch('setAudioUrl', music.mp3Url)
            } else {
                api.MusicUrl(music.id)
                    .then(res => {
                        this.$store.dispatch('setAudioUrl', res.data[0].url)
                    })
            }
        },
        _showOperation(index) {
            for (let i = 0; i < this.musicLists.length; i++) {
                if (i !== index) {
                    this.musicLists[i].menuShow = false
                }
            }
            this.musicLists[index].menuShow = !this.musicLists[index].menuShow
        },
    },
    watch: {
        musicLists() {
            for (let item of this.musicLists) {
                Vue.set(item, 'menuShow', false)
            }
        }
    }
}
</script>

<style lang="scss" scoped>
@import '../assets/css/function.scss';
.music-list {
    background: #28224e;
    position: relative;
    .list-item {
        position: relative;
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
            white-space:nowrap;
                overflow:hidden;
                text-overflow:ellipsis;
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