<template>
    <div class="listen-list">
        <div class="num">
            <i class="icon">&#xe6ae;</i> 循环播放(7首)
        </div>
        <div class="list">
            <div class="item">
                <p>Faded</p>
            </div>
            <div class="item">
                <p>刚好遇见你</p>
            </div>
            <div class="item">
                <p>Faded</p>
            </div>
            <div class="item">
                <p>刚好遇见你</p>
            </div>
            <div class="item">
                <p>Faded</p>
            </div>
            <div class="item">
                <p>刚好遇见你</p>
            </div>
            <div class="item">
                <p>Faded</p>
            </div>
            <div class="item">
                <p>刚好遇见你</p>
            </div>
            <div class="item">
                <p>Faded</p>
            </div>
            <div class="item">
                <p>刚好遇见你</p>
            </div>
        </div>
    
        <div class="close">关闭</div>
    </div>
</template>

<script>
export default {
    data() {
        return {

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
    height: 100%;

    .num {
        height: px2rem(80px);
        line-height: px2rem(80px);
        font-size: px2rem(23px);
        margin: 0 px2rem(15px);
        .icon {
            font-size: px2rem(26px);
        }
    }
    .list {
        flex: 1;
        overflow: auto;
        .item {
            height: px2rem(70px);
            line-height: px2rem(70px);
            margin: 0 px2rem(15px);
            border-top: 1px solid rgba(255, 255, 255, .3);
            font-size: px2rem(24px);
        }
    }
    
    .close {
        height: px2rem(90px);
        line-height: px2rem(90px);
        text-align: center;
        font-size: px2rem(22px);
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