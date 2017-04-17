<template>
	<div class="sidebar" :class="{showSidebar: showSidebar}">
		<div class="sidebar-con" :class="{showbar: showSidebar}">
			<div class="head">
				<div class="avatar">
					<img src="https://dn-mhke0kuv.qbox.me/51ec2dae1418f9c88443.png?imageView2/1/w/100/h/100/q/85/interlace/1" alt="">
				</div>
				<div class="name">hzzly</div>
			</div>
			<div class="menu">
				<ul>
					<li>
						<router-link to="">
							<i class="icon">&#xe63c;</i>
							<span>个人中心</span>
						</router-link>
					</li>
					<li>
						<router-link to="">
							<i class="icon">&#xe631;</i>
							<span>音效调整</span>
						</router-link>
					</li>
					<li>
						<router-link to="">
							<i class="icon">&#xe65b;</i>
							<span>定时关闭</span>
						</router-link>
					</li>
					<li>
						<router-link to="">
							<i class="icon">&#xe601;</i>
							<span>听歌识曲</span>
						</router-link>
					</li>
					<li>
						<router-link to="">
							<i class="icon">&#xe600;</i>
							<span>帮助</span>
						</router-link>
					</li>
					<li>
						<router-link to="">
							<i class="icon">&#xe61f;</i>
							<span>设置</span>
						</router-link>
					</li>
				</ul>
			</div>
	    </div>
	    <div v-show="showSidebar" class="sidebar_mask" @click="_hidebar"></div>
	</div>
</template>

<script>

import { mapGetters } from 'vuex'

    export default {
        data () {
            return {
                // showbar: false,
                userInfo: {
                    avatar: '',
                    username: 'hzzly'
                },
            }
        },
        methods: {
            _hidebar() {
                this.$store.dispatch('setShowSidebar', false)
            },
        },
        computed: {
            ...mapGetters([
				'showSidebar'
			]),
        }
    }
// import { mapGetters } from 'vuex'
// import * as _ from '../util/tool'
// export default {
// 	data () {
// 		return {
			
// 		}
// 	},
// 	// created () {
// 	// 	let userId = localStorage.userId
// 	// 	let phone = localStorage.phone
// 	// 	if (userId && phone) {
// 	// 		this.isLogin = true
// 	// 	} else {
// 	// 		this.isLogin = false
// 	// 	}
// 	// },
// 	computed: {
// 		...mapGetters([
// 			'loginStatus',
//             'userInfo'
// 		]),
// 		showbar () {
// 			return this.$store.state.com.leftNavStatus
// 		}
// 	},
// 	methods: {
// 		hidebar () {
// 			this.$store.dispatch('setNavState', false)
// 		},
// 		logout () {
// 			this.$store.dispatch('setSignOut')
// 			_.alert('退出登录成功')
// 			setTimeout(() => {
// 				this.$router.replace('/user')
// 			}, 500)
// 		}
// 	}
// }
</script>

<style scoped lang="scss">
@import '../assets/css/function';
.sidebar {
    color: #e8e8e8;
	.sidebar-con {
		background: #040308;
		position: absolute;
	    top: 0;
	    left: px2rem(-400px);
	    transform: translateZ(0);
		opacity: 0;
	    width: px2rem(350px);
	    z-index: 1002;
	    height: 100%;
	    overflow: auto;
	    transition: all .3s ease;
		
	    &.showbar {
	    	transform: translateX(px2rem(400px));
			opacity: 1;
	    }
		.head {
			text-align: center;
			.avatar {
				width: px2rem(90px);
				height: px2rem(90px);
				background: #f1f1f1;
				border-radius: 50%;
				margin: px2rem(60px) auto px2rem(15px);
				img {
					width: 100%;
				}
			}
			.name {
				font-size: px2rem(32px);
			}
		}
		.menu {
			margin-top: px2rem(30px);
			ul {
				li {
					height: px2rem(90px);
					line-height: px2rem(90px);
					a {
						display: block;
						padding-left: px2rem(60px);
						&:hover {
							// background: rgba(0, 0, 0, .8);
							// border-bottom: 1px solid #fff;
						}
						.icon {
							font-size: px2rem(36px);
							vertical-align: middle;
						}
						span {
							vertical-align: middle;
							font-size: px2rem(24px);
							padding-left: px2rem(20px);
							color: #fff;
						}
					}
				}
			}
		}
	}
	.sidebar_mask{
	    position: fixed;
	    width: 100%;
	    margin: 0 auto;
	    top: 0;
	    left: 0;
	    bottom: 0;
	    right: 0;
	    z-index: 1001;
	    background: rgba(0,0,0,.4);
	}
}

@media screen and(min-width: 769px) {
    .showSidebar {
        width: 460px;
        margin: 0 auto;
		position: absolute;
    	height: 100%;
		.sidebar_mask {
			width: 460px;
		}
    }
}
</style>