<template>
    <div class="search">
        <div class="head">
            <div class="h-icon"><i class="icon">&#xe8e2;</i></div>
            <div class="input">
                <input type="text"
                       v-model="key"
                       placeholder="搜索音乐、歌手">
            </div>
            <div class="h-icon"><i class="icon">&#xe638;</i></div>
        </div>
        <div class="search-list">
            <v-music-list :music-lists="popularLists"></v-music-list>
        </div>      
    </div>
</template>

<script>

import musicList from '@/components/musicList'

import { mapGetters } from 'vuex'
export default {
    components: {
        'v-music-list': musicList,
    },
    data() {
        return {
            key: ''
        }
    },
    computed: {
        ...mapGetters([
            'popularLists'
        ])
    },
    created() {
        if (this.popularLists.length == 0) {
            this.$store.dispatch('getPopularLists')
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
        justify-content: space-between;
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
    }
}
</style>