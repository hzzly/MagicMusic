<template>
    <div class="search">
        <div class="head">
            <div class="h-icon"
                 @click="_back"><i class="icon">&#xe608;</i></div>
            <div class="input">
                <input type="text"
                       v-model="keywords"
                       placeholder="搜索音乐、歌手">
            </div>
            <div class="h-icon"
                 @click="_search()"><i class="icon">&#xe638;</i></div>
        </div>
        <div class="search-list">
            <v-music-list :music-lists="searchLists"
                          v-if="searchLists.length"></v-music-list>
            <div class="hot-key"
                 v-else>
                <div class="title">热门搜索</div>
                <div class="hot-list">
                    <ul>
                        <li @click="search">暧昧</li>
                    </ul>
                </div>
                <div class="search-history">
                    <transition-group name="slide"
                                      tag="div"
                                      class="list-wrapper">
                        <div class="item"
                             v-for="(item, index) in searchHistory"
                             :key="item">
                            <p @click="_search(item)">
                                <i class="icon">&#xe613;</i>
                                <span>{{item}}</span>
                            </p>
                                <div class="delete"
                                     @click="_delete(index)"><i class="icon">&#xe656;</i></div>
                        </div>
                    </transition-group>
                </div>
            </div>
        </div>
    </div>
</template>

<script>

import musicList from '@/components/musicList'

import { mapGetters } from 'vuex'

import api from '../api'

export default {
    components: {
        'v-music-list': musicList,
    },
    data() {
        return {
            keywords: '',
            searchLists: [],
            searchHistory: ['前端', '童话镇', '刚好遇见你'],
            hotLists: []
        }
    },
    methods: {
        _back() {
            window.history.back()
        },
        _search(keywords) {
            this.searchLists = []
            let key = keywords ? keywords : this.keywords
            api.MusicSearch(key)
                .then(res => {
                    console.log(res)
                })
                .catch(res => {
                    console.log(res.result.songs)
                    this.searchLists = res.result.songs
                })
        },
        search(e) {
            console.log(e.target.textContent)
            api.MusicSearch(e.target.textContent)
                .then(res => {
                    console.log(res)
                })
                .catch(res => {
                    console.log(res.result.songs)
                    this.searchLists = res.result.songs
                })
        },
        _delete(index) {
            this.searchHistory.splice(index, 1)
        }
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
        line-height: px2rem(100px);
        text-align: center;
        background: #28224e;
        display: flex;
        justify-content: space-between; // box-shadow: 0 10px 20px rgba(0, 0, 0, .8);
        border-bottom: 1px solid rgba(255, 255, 255, .3);
        .h-icon {
            width: px2rem(100px);
            cursor: pointer;
            .icon {
                font-size: px2rem(46px);
            }
        }
        .input {
            flex: 1;
            input {
                width: 100%;
                box-sizing: border-box;
                border: none;
                outline: none;
                height: 60%;
                margin-top: px2rem(20px);
                background: rgba(0, 0, 0, .4);
                color: #fff;
                font-size: px2rem(32px);
                padding: 0 px2rem(25px);
                border-radius: px2rem(50px);
            }
        }
    }
    .search-list {
        flex: 1;
        overflow: auto;
        overflow-x: hidden;
        background: #28224e;
        .hot-key {
            color: rgba(255, 255, 255, .7);
            padding: px2rem(20px);
            .title {
                font-size: ppx2rem(22px);
                line-height: px2rem(50px);
            }
            .hot-list {
                ul {
                    display: flex;
                    flex-wrap: wrap;
                    li {
                        padding: px2rem(7px) px2rem(18px);
                        font-size: px2rem(24px);
                        color: rgba(255, 255, 255, .9);
                        border: 1px solid rgba(255, 255, 255, .3);
                        margin-right: px2rem(20px);
                        border-radius: px2rem(30px);
                        margin-bottom: px2rem(20px);
                        cursor: pointer;
                        &:first-child {
                            border-color: #eb234a;
                        }
                    }
                }
            }
            .search-history {
                flex: 1;
                overflow: auto;
                .item {
                    display: flex;
                    justify-content: space-between;
                    height: px2rem(80px);
                    line-height: px2rem(80px);
                    // margin: 0 px2rem(20px);
                    padding-left: px2rem(15px);
                    border-bottom: 1px solid rgba(255, 255, 255, .1);
                    font-size: px2rem(26px);
                    color: #fff;
                    cursor: pointer;
                    p {
                        flex: 1;
                        .icon {
                            font-size: px2rem(44px);
                            vertical-align: middle;
                        }
                        span {
                            vertical-align: middle;
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
        }
    }
}
</style>