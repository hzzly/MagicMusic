<template>
    <div class="playbar">
        <div class="play-box"></div>
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
        position: fixed;
        bottom: 0;
        width: 100%;
        height: px2rem(120px);
        background: red;
        .play-box {
            display: flex;
            height: px2rem(120px);
            background: red;
        }
    }
</style>