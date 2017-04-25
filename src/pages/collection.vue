<template>
    <div class="collection">
        <div class="collection-list">
            <router-link :to="{ name: 'rank', params: { idx: 3 }}">
                <div class="item red">
                    <div class="img">
                        <img src="http://p3.music.126.net/DrRIg6CrgDfVLEph9SNh7w==/18696095720518497.jpg?param=150y150" alt="">
                    </div>
                    <div class="desc">
                        <div class="title">云音乐飙升榜</div>
                        <div class="say">每天更新</div>
                    </div>
                </div>
            </router-link>
            <router-link :to="{ name: 'rank', params: { idx: 0 }}">
                <div class="item green">
                    <div class="img">
                        <img src="http://p3.music.126.net/N2HO5xfYEqyQ8q6oxCw8IQ==/18713687906568048.jpg?param=150y150" alt="">
                    </div>
                    <div class="desc">
                        <div class="title">云音乐新歌榜</div>
                        <div class="say">每天更新</div>
                    </div>
                </div>
            </router-link>
            <router-link :to="{ name: 'rank', params: { idx: 2 }}">
                <div class="item purple">
                    <div class="img">
                        <img src="http://p4.music.126.net/sBzD11nforcuh1jdLSgX7g==/18740076185638788.jpg?param=150y150" alt="">
                    </div>
                    <div class="desc">
                        <div class="title">网易原创歌曲榜</div>
                        <div class="say">每周四更新</div>
                    </div>
                </div>
            </router-link>
            <router-link :to="{ name: 'rank', params: { idx: 1 }}">
                <div class="item blue">
                    <div class="img">
                        <img src="http://p3.music.126.net/GhhuF6Ep5Tq9IEvLsyCN7w==/18708190348409091.jpg?param=150y150" alt="">
                    </div>
                    <div class="desc">
                        <div class="title">云音乐热歌榜</div>
                        <div class="say">每周四更新</div>
                    </div>
                </div>
            </router-link>
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
.collection {
    height: 100%;
    background: rgba(8, 5, 58, .9);
    overflow: auto;
    .collection-list {
        height: 100%;
        margin: 0 px2rem(20px);
        .item {
            height: px2rem(200px);
            margin-top: px2rem(30px);
            border-radius: px2rem(20px);
            display: flex;
            align-items: center;
            &:last-child {
                margin-bottom: px2rem(30px);
            }
            &.red {
                background: linear-gradient(-45deg, rgba(237, 46, 97, .5), rgba(237, 46, 97, 1));
            }
            &.green {
                background: linear-gradient(-45deg, rgba(69, 196, 166, .5), rgba(69, 196, 166, 1));
            }
            &.purple {
                background: linear-gradient(-45deg, rgba(122, 61, 253, .5), rgba(122, 61, 253, 1));
            }
            &.blue {
                background: linear-gradient(-45deg, rgba(19, 122, 253, .5), rgba(19, 122, 253, 1));
            }

            .img {
                width: px2rem(180px);
                height: px2rem(180px);
                border-radius: px2rem(10px);
                overflow: hidden;
                margin-left: px2rem(10px);
                img {
                    width: 100%;
                }
            }
            .desc {
                margin-left: px2rem(20px);
                color: #fff;
                .title {
                    font-size: px2rem(38px);
                    line-height: px2rem(60px);
                    margin-bottom: px2rem(20px);
                }
                .say {
                    font-size: px2rem(26px);
                    color: rgba(255, 255, 255, .7);
                }
            }
        }
    }
}
</style>