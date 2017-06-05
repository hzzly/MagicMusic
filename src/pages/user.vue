<template>
    <div class="user">
        <div class="user-card">
            <div class="avatar">
                <img src="https://dn-mhke0kuv.qbox.me/51ec2dae1418f9c88443.png?imageView2/1/w/100/h/100/q/85/interlace/1"
                     alt="">
            </div>
            <div class="name">hzzly</div>
            <div class="desc">
                <p>本人大三狗一枚，就读的是江西一所普通的大学(非985,211)，但这并没有阻挡我对前端的热爱，
                    自学两年多，做过两个外包项目以及两个个人的开源项目。<span>求实习ing。</span></p>
            </div>
            <div class="about">
                <div class="dynamic" @click="dynamics">
                    <span>{{dynamic}}</span>
                    <span>动态</span>
                </div>
                <div class="focus" @click="focuses">
                    <span>{{focus}}</span>
                    <span>关注</span>
                </div>
                <div class="love" @click="loves">
                    <span>{{love}}</span>
                    <span>喜欢</span>
                </div>
            </div>
            <div class="btn">
                <a href="http://hzzly.net/resume/" target="_blank">
                    <i class="icon">&#xe63c;</i>关于我
                </a>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            dynamic: localStorage.dynamic || 10,
            focus: localStorage.focus || 20,
            love: localStorage.love || 30
        }
    },
    methods: {
        dynamics() {
            this.dynamic++
            localStorage.dynamic = this.dynamic
        },
        focuses() {
            this.focus++
            localStorage.focus = this.focus
        },
        loves() {
            this.love++
            localStorage.love = this.love
        }
    }
}
</script>

<style lang="scss" scoped>
@import '../assets/css/function.scss';
.user {
    height: 100%;
    background: rgba(8, 5, 58, .9);
    display: flex;
    align-items: center;
    justify-content: center;
    .user-card {
        width: px2rem(600px);
        height: px2rem(600px);
        border-radius: px2rem(30px);
        background: #fff;
        position: relative;
        z-index: 0;
        text-align: center;
        &::before {
            content: '';
            position: absolute;
            left: px2rem(10px);
            top: px2rem(30px);
            width: px2rem(580px);
            height: px2rem(580px);
            border-radius: px2rem(30px);
            background: rgba(255, 255, 255, .8);
            z-index: -1;
        }
        &::after {
            content: '';
            position: absolute;
            left: px2rem(20px);
            top: px2rem(60px);
            width: px2rem(560px);
            height: px2rem(560px);
            border-radius: px2rem(30px);
            background: rgba(255, 255, 255, .6);
            z-index: -2;
        }
        .avatar {
            width: px2rem(150px);
            height: px2rem(150px);
            border-radius: 50%;
            background: #fff;
            position: absolute;
            top: px2rem(-75px);
            left: 50%;
            border: 2px solid rgba(255, 255, 255, 1);
            transform: translateX(-50%);
        }
        .name {
            margin-top: px2rem(90px);
            font-size: px2rem(50px);
            font-weight: bold;
        }
        .desc {
            font-size: px2rem(28px);
            color: rgba(0, 0, 0, .6);
            margin: px2rem(30px) px2rem(50px);
            p {
                line-height: px2rem(36px);
                span {
                    font-weight: bold;
                }
            }
        }
        .about {
            display: flex;
            justify-content: center;
            font-size: px2rem(24px);
            > div {
                width: px2rem(120px);
                text-align: center;
                display: flex;
                flex-direction: column;
                cursor: pointer;
                span {
                    line-height: px2rem(40px);
                    &:first-child {
                        color: #ea2448;
                    }
                }
            }
        }
        .btn {
            width: px2rem(260px);
            height: px2rem(80px);
            line-height: px2rem(80px);
            text-align: center;
            font-size: px2rem(30px);
            font-weight: bold;
            color: #fff;
            margin: px2rem(30px) auto;
            border-radius: px2rem(40px);
            background: linear-gradient(45deg, #ea2448, #902444);
            cursor: pointer;
            transition: all .5s;
            a {
                display: block;
                color: #fff;
            }
            .icon {
                font-size: px2rem(40px);
                margin-right: px2rem(10px);
                vertical-align: middle;
                transition: all .5s;
            }
            &:hover {
                box-shadow:0 15px 30px rgba(0,0,0,0.15);
            }
        }
    }
}
</style>