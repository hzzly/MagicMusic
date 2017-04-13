<template>
    <div class="playbar">
        <div class="play-box">
            <div class="music-avatar"></div>
            <div class="music-name"></div>
            <div class="music-play"></div>
            <div class="music-next"></div>
            <div class="music-list"></div>
        </div>
        <div class="progress-bar">
            <div class="play"></div>
        </div>
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
        background: #ea2448;
        .play-box {
            display: flex;
            height: px2rem(120px);
        }
        .progress-bar {
            height: px2rem(4px);
            background: linear-gradient(#902541, #902444);
            .play {
                height: 100%;
                width: 60%;
                background: #fe7498;
            }
        }
        
    }
</style>