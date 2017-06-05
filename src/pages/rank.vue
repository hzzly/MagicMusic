<template>
    <div class="search">
        <div class="head">
            <div class="h-icon"
                 @click="_back"><i class="icon">&#xe608;</i> <span class="title">{{title}}</span></div>
            <!--<div class="title"></div>-->
            <div class="h-icon right-c" v-show="rankLists.length>0" @click="_addAll"><i class="icon">&#xe606;</i>播放全部</div>
        </div>
        <div class="search-list">
            <v-music-list :music-lists="rankLists"></v-music-list>
            <div class="more" v-show="!showLoading">我是有底线的</div>
        </div>
    </div>
</template>

<script>

import musicList from '@/components/musicList'

import { mapGetters } from 'vuex'

import api from '../api'
import * as _ from '../util/tool'

export default {
    components: {
        'v-music-list': musicList,
    },
    data() {
        return {
            idx: 0,
            rankLists: []
        }
    },
    beforeRouteEnter (to, from, next) {
        next(vm => {
            vm.idx = to.params.idx
        })
    },
    mounted() {
        this.$store.dispatch('setShowLoading', true)
        api.MusicRank(this.idx)
            .then((res) => {
                this.rankLists = res.result.tracks
                setTimeout(() => {
                    this.$store.dispatch('setShowLoading', false)
                }, 500)
            })
    },
    computed: {
        ...mapGetters([
            'showLoading',
            'audio'
        ]),
        title() {
            switch(this.idx) {
                case 0:
                    return '云音乐新歌榜'
                case 1:
                    return '云音乐热歌榜'
                case 2:
                    return '网易原创歌曲榜'
                case 3:
                    return '云音乐飙升榜'
            }
        }
    },
    methods: {
        _back() {
            window.history.back()
        },
        _addAll() {
            this.$store.dispatch('addAllToListenLists', this.rankLists)
            // this.$store.dispatch('setAudioUrl', this.audio[0].mp3Url)
            _.toast('已添加到试听列表')
        },
    }
}
</script>

<style lang="scss" scoped>
@import '../assets/css/function.scss';
.search {
    display: flex;
    flex-direction: column;
    height: 100%;
    .head {
        height: px2rem(100px);
        line-height: px2rem(105px);
        text-align: center;
        background: #28224e;
        display: flex;
        justify-content: space-between; // box-shadow: 0 10px 20px rgba(0, 0, 0, .8);
        border-bottom: 1px solid rgba(255, 255, 255, .3);
        .h-icon {
            // width: px2rem(100px);
            cursor: pointer;
            font-size: px2rem(26px);
            color: #fff;
            .icon {
                display: inline-block;
                width: px2rem(100px);                
                font-size: px2rem(46px);
            }
            .title {
                display: inline-block;
                font-size: px2rem(32px);
            }
        }
        .right-c {
            margin-right: px2rem(20px);
            .icon {
                width: px2rem(60px);            
                font-size: px2rem(34px);
                vertical-align: middle;
            }
        }
    }
    .search-list {
        flex: 1;
        overflow: auto;
        overflow-x: hidden;
        background: #28224e;
        .more {
            height: px2rem(100px);
            line-height: px2rem(100px);
            text-align: center;
            color: rgba(255,255,255,.6);
            position: relative;
            &::before {
                content: '';
                position: absolute;
                top: px2rem(50px);
                left: px2rem(50px);
                width: 33%;
                border-bottom: 1px solid #3c3662;
            }
            &::after {
                content: '';
                position: absolute;
                top: px2rem(50px);
                right: px2rem(50px);
                width: 33%;
                border-bottom: 1px solid #3c3662;
            }
        }
    }
}
</style>