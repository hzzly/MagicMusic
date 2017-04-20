<template>
    <div class="collection">
        <div class="collection-list">
            <div class="item red">
    
            </div>
            <div class="item green">
    
            </div>
            <div class="item purple">
    
            </div>
            <div class="item blue">
    
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
        }
    }
}
</style>