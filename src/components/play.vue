<template>
    <div class="play">
        <div class="head">
            <div class="h-icon"><i class="icon">&#xe8e2;</i></div>
            <div class="h-icon"><i class="icon">&#xe93b;</i></div>
        </div>
        <div class="name">刚好遇见你</div>
        <div class="operation">
            <div class="love"></div>
            <div class="msg"></div>
            <div class="share"></div>
        </div>
        <div class="content">
            <div class="lyrics"></div>
            <div class="control">
                <div>
                    <div class="loop"><i class="icon">&#xe6ae;</i></div>
                    <div class="pre"><i class="icon">&#xe6ae;</i></div>
                    <div class="pause"><i class="icon">&#xe6ae;</i></div>
                    <div class="next"><i class="icon">&#xe6ae;</i></div>
                    <div class="list"><i class="icon">&#xe6ae;</i></div>
                </div>
            </div>
            <div class="process">
                <div class="line"></div>
                <div class="pro">
                    <div class="pro-line"></div>
                </div>
                <!--<div class="control-box">
                    <div class="absolutely-x-center">
                        <div class="control-circle control-process"></div>
                        <div class="control-circle control-pannel"></div>
                    </div>
                </div>-->
            </div>
        </div>
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
.play {
    position: absolute;
    top: 0;
    bottom: 0;
    z-index: 20;
    width: 100%; // background: rgba(0, 0, 0, .7);
    background: url(https://y.gtimg.cn/music/photo_new/T002R300x300M000002qBBpu2q0vL3.jpg?max_age=2592000) no-repeat;
    background-size: cover;
    .head {
        height: px2rem(100px);
        line-height: px2rem(100px);
        text-align: center;
        display: flex;
        justify-content: space-between;
        .h-icon {
            width: px2rem(100px);
            cursor: pointer;
            .icon {
                font-size: px2rem(46px);
            }
        }
    }
    .name {
        font-size: px2rem(60px); // font-weight: bold;
        color: #fff;
        position: absolute;
        top: px2rem(300px);
        left: 50%;
        transform: translateX(-50%);
    }
    .operation {
        position: absolute;
        right: px2rem(100px);
        top: px2rem(430px);
        z-index: 50;
        >div {
            width: px2rem(80px);
            height: px2rem(80px);
            border-radius: 50%;
            background: #f12c61;
            position: relative;
            cursor: pointer;
        }
        .love {
            right: px2rem(150px);
            top: px2rem(60px);
        }
        .msg {
            right: px2rem(50px);
            background: #45c4a6;
        }
        .share {
            right: px2rem(-50px);
            top: px2rem(-58px);
            background: #7a3dfd;
        }
    }
    .content {
        height: 100%; // overflow: hidden;
        position: relative;
        .lyrics {
            position: absolute;
            bottom: 0;
            width: 100%;
            height: px2rem(850px);
            background: rgba(40, 34, 78, .9);
            &::after {
                content: '';
                position: absolute;
                top: px2rem(-147.6px);
                width: 0;
                height: 0; // border-left: px2rem(750px) solid rgba(40, 34, 78, .9);
                border-bottom: px2rem(150px) solid rgba(40, 34, 78, .9);
                border-right: px2rem(750px) solid transparent;
            }
        }
        .control {
            position: absolute;
            bottom: px2rem(-850px); // width: px2rem(900px);
            width: px2rem(1200px);
            left: px2rem(-225px);
            height: px2rem(1200px);
            background: #ea2448;
            border-radius: 50%;
            border-bottom-color: transparent;
            z-index: 30;
            >div {
                width: px2rem(650px);
                display: flex;
                transform: translate(px2rem(270px), px2rem(140px));
                >div {
                    flex: 1;
                    z-index: 35;
                    text-align: center;
                }
            }
        }
        .process {
            position: absolute;
            bottom: px2rem(280px);
            width: 100%;
            height: px2rem(100px);
            background: #fff;
            overflow: hidden;
            z-index: 40;
            .line {
                width: px2rem(1200px);
                height: px2rem(1200px);
                border-radius: 50%;
                position: absolute;
                transform: translateX(-115px);
                border-bottom-color: transparent;
                // background: #000;
                border: 1px solid red;
            }
            .pro {
                width: px2rem(1200px);
                height: px2rem(1200px);
                border-radius: 50%;
                transform: translateX(-115px);
                border-bottom-color: transparent;
                // background: #000;
                border: 1px solid #000;
                transform-origin: 115px center;
            }
        }
    }
}

@media screen and(min-width: 769px) {
    .play {
        width: 460px;
        .name {
            top: px2rem(250px);
        }
        .operation {
            top: px2rem(350px);
        }
        .content {
            width: 460px; // overflow: hidden;
            .lyrics {
                height: 500px;
            }
            .control {
                position: absolute;
                bottom: px2rem(-520px); // width: px2rem(900px);
                width: px2rem(850px);
                left: px2rem(-105px);
                height: px2rem(800px);
                background: #ea2448;
                border-radius: 50% 50% 0 0;
            }
            .process {
                position: absolute;
                bottom: px2rem(-140px);
                left: px2rem(265px);
                z-index: 30;
                width: px2rem(106px);
                overflow: hidden;
                transform: rotate(90deg);
                .line {
                    width: px2rem(700px);
                    height: px2rem(800px);
                    border: 1px solid #fff;
                    border-radius: 50%;
                    border-bottom-color: transparent;
                }
            }
        }
    }
}
</style>