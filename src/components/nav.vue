<template>
    <div class="nav">
        <div class="nav-item">
            <router-link to="popular">
                <div class="icon"><i class="icon">&#xe62f;</i></div>
                <span>流行</span>
            </router-link>
        </div>
        <div class="nav-item">
            <router-link to="classical">
                <div class="icon"><i class="icon">&#xe635;</i></div>
                <span>古典</span>
            </router-link>
        </div>
        <div class="nav-item">
            <router-link to="light">
                <div class="icon"><i class="icon">&#xe632;</i></div>
                <span>纯音乐</span>
            </router-link>
        </div>
        <div class="nav-item">
            <router-link to="radio">
                <div class="icon"><i class="icon">&#xe634;</i></div>
                <span>电台</span>
            </router-link>
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
    .nav {
        display: flex;
        align-items: center;
        height: px2rem(100px);
        text-align: center;
        background: #1c1642;
        color: #746ca8;
        .nav-item {
            flex: 1;
            font-size: px2rem(24px);
            cursor: pointer;
            a {
                display: block;
                color: #746ca8;
                &.active {
                    color: #fff;
                }
            }
            .icon {
                font-size: px2rem(46px);
                color: #eb234a;
            }
            span {
                display: block;
                margin-top: px2rem(8px);
            }
            
        }
    }
</style>