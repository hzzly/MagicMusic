<template>
    <ul class="banner">
        <li v-for="(item,index) in image"
            :class="[move[index]]">
            <v-touch class="vuetouch"
                     v-on:swipeleft="nextPic"
                     v-on:swiperight="prePic">
                <template v-if="typeof item === 'object'">
                    <img v-lazy="item.src"
                         @click="target(index)">
                    <span :class="{tag:item.tagName}"
                          :style="item.tagStyle">{{item.tagName}}</span>
                </template>
                <template v-if="typeof item === 'string'">
                    <img :src="item"
                         @click="target(index)">
                </template>
            </v-touch>
        </li>
        <li class="button">
            <em v-for="(item,index) in image"
                @click="target(index)"
                :class="[move[index]]"></em>
        </li>
    </ul>
</template>
<script>
export default {
    name: 'banner',
    props: {
        image: {
            require: true,
            type: Array,
            validator: function (value) {
                return value.length >= 3
            }
        },
        interval: {
            default: 5000
        },
        autoRoll: {
            default: true
        },
        direction: {
            default: 'left'
        }
    },
    created() {

        for (let i = 3; i < this.image.length; i++) {
            this.move[i] = 'wait'
        }
        if (this.autoRoll) {
            if (this.direction === 'left') {
                setInterval(this.nextPic, this.interval)
            }
            else {
                setInterval(this.prePic, this.interval)
            }
        }
    },
    data() {
        return {
            move: ['left', 'center', 'right']
        }
    },
    methods: {
        nextPic(event) {
            let temp = this.move.pop()
            this.move.unshift(temp)
        },
        prePic(event) {
            let temp = this.move.shift()
            this.move.push(temp)
        },
        target(pos) {
            const num = this.image.length
            for (let i = 0; i < num; i++) {
                this.move[i] = 'wait'
            }
            this.move[pos] = 'center'
            this.move[pos + 1 < num ? pos + 1 : 0] = 'right'
            this.move[pos - 1 === -1 ? num - 1 : pos - 1] = 'left'
            this.move = this.move.concat()
        }
    }
}
</script>
<style scoped lang="scss">
@import '../assets/css/function';
.banner {
    perspective: 1000px;
    position: relative;
    width: 100%;
    height: px2rem(350px);
    // padding-top: px2rem(10px);
    background: rgba(8, 5, 58, .9);
}

li {
    list-style-type: none;
    position: absolute;
    top: 0px;
    transition: transform 0.5s, scale 1s, left 1s, right 1s;
    &.left,
    &.right {
        transform: scale(0.9, 0.9);
        z-index: 10;
    }
    &.left {
        left: 0;
    }
    &.center {
        left: 15%;
        z-index: 100;
    }
    &.right {
        left: 33%;
    }
    &.wait {
        transform: scale(0, 0);
    }
}

.button {
    text-align: center;
    width: 100%;
    height: 20px;
    top: calc(100% - 20px);
}

.control {
    text-align: center;
    width: 100%;
    height: 30px;
    top: calc(50% - 20px);
    display: none;
    left: 0;
}

.banner:hover .control {
    display: inline-block;
}

.button em {
    display: inline-block;
    width: 20px;
    height: 5px;
    background-color: rgb(225, 225, 226);
    border-radius: 10px;
    margin: 0 2px;
    cursor: pointer;
}

em.center {
    background-color: rgb(198, 47, 47);
}

.tag {
    display: inline-block;
    padding: 5px;
    background-color: rgb(198, 47, 47);
    position: absolute;
    right: 0px;
    bottom: 15px;
    border-top-left-radius: 10px;
    font-size: 0.5rem;
    border-bottom-left-radius: 10px;
    color: white;
}

img {
    width: px2rem(500px);
    height: px2rem(300px);
}
</style>