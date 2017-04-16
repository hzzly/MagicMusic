<template>
    <div class="listen-list">
        <div class="num">
            <i class="icon">&#xe6ae;</i> 循环播放({{musicLists.length}}首)
        </div>
        <div class="list">
            <div class="item" v-for="(item, index) in musicLists" @click="_play(item)">
                <p>{{item.name}}</p>
            </div>
        </div>
    
        <div class="close" @click="_close">关闭</div>
    </div>
</template>

<script>

import { mapGetters } from 'vuex'

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
            this.$store.dispatch('setAudio', music)
            this.$store.dispatch('setShowListenList', false)
        }
    },
    computed: {
        ...mapGetters([
			'musicLists'
		])
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
    height: 100%;

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
            height: px2rem(80px);
            line-height: px2rem(80px);
            margin: 0 px2rem(20px);
            padding-left: px2rem(15px);
            border-top: 1px solid rgba(255, 255, 255, .3);
            font-size: px2rem(26px);
            color: #fff;
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