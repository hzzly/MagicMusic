<template>
    <div class="playbar">
        <div class="play-box">
            <div class="music-avatar"></div>
            <div class="music-name"></div>
            <div class="music-play"></div>
            <div class="music-next"></div>
            <div class="music-list"></div>
        </div>
        <div class="progress-bar"></div>
    </div>
</template>

<script>
    export default {
        data () {
            return {
                
            }
        }
    }
</script>

<style lang="scss" scoped>
    @import '../assets/css/function';

    .playbar {
        height: px2rem(120px);
        background: red;
        .play-box {
            display: flex;
            // box-shadow: 0 -2px 0 #000;
            height: px2rem(120px);
        }
        .progress-bar {
            height: px2rem(4px);
            background: linear-gradient(#902541, #902444);
        }
        
        // border-bottom: 1px solid rgba(144, 36, 68, .8);
    }
</style>