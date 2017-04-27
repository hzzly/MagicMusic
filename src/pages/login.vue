<template>
    <div class="login">
        <div class="mask"></div>
        <div class="logo">
            <p>MagicMusic</p>
            <p>Listen to what you want to hear</p>
        </div>
        <div class="form-g">
            <div class="input-group">
                <input type="text" placeholder="邮箱" v-model="email">
                <i class="icon">&#xe6fd;</i>
            </div>
            <div class="input-group">
                <input type="password" placeholder="密码" v-model="password">
                <i class="icon">&#xe66f;</i>
            </div>
            <div class="forget-pwd">
                忘记密码?
            </div>
            <div class="form-btn" @click="_login">登录</div>
        </div>
        <div class="other-login">
            <p>Or 使用以下账号登录</p>
            <div class="other-login-logo">
                <div class="wechat"><i class="icon">&#xe607;</i></div>
                <div class="qq"><i class="icon">&#xe722;</i></div>
                <div class="weibo"><i class="icon">&#xe602;</i></div>
            </div>
        </div>
    </div>
</template>

<script>
import api from '../api/index'
export default {
    data() {
        return {
            email: '',
            password: ''
        }
    },
    methods: {
        _login() {
            if (!this.email || !this.password) {
                // _.alert('请填写完整')
                return
            }
            let data = {
                email: this.email,
                password: this.password
            }
            // this.$store.dispatch('setLoadingState', true)
            api.Login(data)
                .then(res => {
                    if(res.code == 200) {
                        // let userInfo = Object.assign()
                        // this.$store.dispatch('setLoadingState', false)
                        // this.setUserInfo(res.data)
                        this.$router.replace('/')
                    }
                })
                .catch(res => {
                    if(res.code == 200) {
                        // let userInfo = Object.assign()
                        // this.$store.dispatch('setLoadingState', false)
                        // this.setUserInfo(res.data)
                        this.$router.replace('/')
                    }
                })
        }
    }
}
</script>

<style lang="scss" scoped>
@import '../assets/css/function.scss';
.login {
    width: 100%;
    height: 100%;
    background: url('../assets/img/login-bg.jpeg') no-repeat;
    background-size: cover;
    color: #fff;
    text-align: center;
    overflow: hidden;
    position: absolute;
    top: 0;
    .mask {
        position: fixed;
        top: 0;
        left: 0;
        bottom: 0;
        right: 0;
        background: rgba(0, 0, 0, .5);
        z-index: 1;
    }
    .logo,
    .form-g,
    .other-login {
        position: relative;
        z-index: 2;
    }
    .logo {
        
        margin: px2rem(115px) 0 px2rem(75px);
        p:first-child {
            font-size: px2rem(68px);
        }
        p:last-child {
            font-size: px2rem(26px);
            color: rgba(255, 255, 255, .8);
        }
    }
    .form-g {
        .input-group {
            margin-bottom: px2rem(25px);
            position: relative;
            input {
                width: px2rem(450px);
                height: px2rem(75px);
                box-sizing: border-box;
                background: rgba(105, 106, 108, .7);
                border-radius: px2rem(37px);
                padding: 0 px2rem(60px) 0 px2rem(30px);
                font-size: px2rem(28px);
                color: #fff;
            }
            .icon {
                position: absolute;
                right: px2rem(170px);
                top: px2rem(22px);
                font-size: px2rem(36px);
                color: rgba(255, 255, 255, .8);
            }
        }
        .forget-pwd {
            font-size: px2rem(24px);
            text-decoration: underline;
            color: rgba(255, 255, 255, .8);
            margin-top: px2rem(10px);
            cursor: pointer;
        }
        .form-btn {
            margin: px2rem(70px) auto px2rem(120px);
            width: px2rem(320px);
            height: px2rem(80px);
            line-height: px2rem(80px);
            text-align: center;
            background: #ea2448;
            border-radius: px2rem(40px);
            font-size: px2rem(26px);
            cursor: pointer;
        }
    }
    .other-login {
        p {
            color: rgba(255, 255, 255, .8);
            font-size: px2rem(22px);
        }
        .other-login-logo {
            display: flex;
            justify-content: center;
            margin-top: px2rem(40px);
            > div {
                width: px2rem(90px);
                height: px2rem(90px);
                line-height: px2rem(90px);
                border: 2px solid rgba(255, 255, 255, .8);
                border-radius: 50%;
                cursor: pointer;
                .icon {
                    font-size: px2rem(50px);
                    color: rgba(255, 255, 255, .8);
                }
                &.qq {
                    margin: 0 px2rem(25px);
                }
            }
        }
    }
}

@media screen and(min-width: 769px) {
    .mask {
        width: 460px;
        margin: 0 auto;
    }
    .form-g {
        .input-group {
            .icon {
                right: px2rem(120px) !important;
            }
        }
    }
}
</style>