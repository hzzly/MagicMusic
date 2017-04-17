<template>
    <transition name="move">
        <div class="menu"
             v-show="item.menuShow">
            <div class="inner inner-1" @click="_delete(index)"><i class="icon">&#xe612;</i></div>
            <div class="inner inner-2" @click="_share(index)"><i class="icon">&#xe64c;</i></div>
            <div class="inner inner-3"
                 @click="_love(index)"><i class="icon">&#xe615;</i></div>
        </div>
    </transition>
</template>

<script>
export default {
    props: {
        item: Object,
        index: Number
    },
    data() {
        return {

        }
    },
    methods: {
        _love(index) {
            console.log(index)
        },
        _delete(index) {
            console.log(index)
        },
        _share(index) {
            console.log(index)
        }
    }
}
</script>

<style lang="scss" scoped>
@import '../assets/css/function.scss';
.menu {
    position: absolute;
    right: px2rem(130px);
    top: px2rem(44px);
    transition: all .7s ease-in;
    &.move-enter-active {
        .inner {
            transform: translate3d(0, 0, 0);
            transition-timing-function: cubic-bezier(0, .57, .44, 1.97);
        }
        .inner-1 {
            transition-delay: .1s;
        }
        .inner-2 {
            transition-delay: .2s;
        }
        .inner-3 {
            transition-delay: .3s;
        }
    }
    &.move-enter,
    &.move-leave-active {
        .inner {
            transition-timing-function: ease-in-out;
            opacity: 0;
        }
        .inner-1 {
            transform: translate3d(px2rem(20px), 0, 0);
            transition-delay: .3s;
        }
        .inner-2 {
            transform: translate3d(px2rem(100px), 0, 0);
            transition-delay: .2s;
        }
        .inner-3 {
            transform: translate3d(px2rem(180px), 0, 0);
            transition-delay: .1s;
        }
    }
    .inner {
        display: inline-block;
        position: absolute;
        width: px2rem(60px);
        height: px2rem(60px);
        line-height: px2rem(62px);
        border-radius: 50%;
        background: rgba(255, 255, 255, .1);
        text-align: center;
        color: #fff;
        cursor: pointer;
        transition: all .4s;
    }
    .inner-1 {
        left: px2rem(-20px);
    }
    .inner-2 {
        left: px2rem(-100px);
    }
    .inner-3 {
        left: px2rem(-180px);
    }
}
</style>