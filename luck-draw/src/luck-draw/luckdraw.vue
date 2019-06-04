<template>
	<div>
		<div class="cj-box" :class="{curr:!boxRote}">
			<!--<div class="rote">-->
			<ul class="clearfix">
				<li class="fl" v-for="(item,index) in cjInfo" :key="index" :class="{active:index==activeIndex}" :id="item.id">
					<img v-if="index==4" @click="goCj()" :src="item.picUrl" alt="" />
					<img v-else :src="item.picUrl" alt="" />
				</li>
			</ul>
			<!--</div>-->
		</div>
		<div class="toast" v-if="toastShow">
			{{toastText}}
		</div>
		<div class="cj_result" v-if="overaward">
			<article>
				<span class="close" @click="closeDialog">X</span>
				<h2>恭喜你，中奖了</h2>
				<img :src="rewardInfo.data.imgUrl" alt="" />
				<p>{{rewardInfo.data.name}}</p>
			</article>
		</div>
	</div>
</template>

<script>
	import cjBg from "./img/cj-bg.png"
	import start from "./img/start.png"
	import axios from "axios"
	export default {
		name: 'cj',
		props: {
			"infoUrl": {
				type: String,
				default: ""
			},
			"awardUrl": {
				type: String,
				default: ""
			},
			"needDialog": {
				//自带中奖后弹窗
				type: Boolean,
				default: true
			},
			"rotaVal": {
				//自带中奖后弹窗
				type: Number,
				default: 4
			}

		},
		data() {
			return {
				activeIndex: 0,
				/*九宫格转到当前的index值*/
				overRote: 0,
				/*已经转动的圈数*/
				boxRote: false,
				delay: true,
				rewardIndex: "",
				timer: null,
				cjInfo: {},
				rewardInfo: {},
				toastText: "",
				toastShow: false,
				overaward: false,
				rewardId: "" /*请求返回后得到的中奖ID值*/
			}
		},
		created() {
			//			debugger
			var that = this;
			axios.get(that.infoUrl).then(function(res) {
				console.log(res.data);
				that.cjInfo = res.data.data.info.awardTos;
				that.cjInfo.splice(4, 0, {
					"picUrl": start
				})
			})
		},
		mounted() {
			var that = this
			var img = new Image();
			img.src = cjBg;
			if(img.complete) {
				that.boxrota()
			}
			img.onload = function() {
				that.boxrota()
			}

		},
		methods: {
			boxrota() {
				var that = this
				if(that.boxRote) {
					that.boxRote = false
				} else {
					that.boxRote = true
				}
				setTimeout(() => {
					that.boxrota()
				}, 1000)
			},
			cj_active() {
				var that = this;
				//01258763-01258763轮转顺序
				if(that.rewardId !== "" && that.overRote >= that.rotaVal) {
					that.qfId(that.rewardId)
				}
				if(that.activeIndex < 2) {
					that.activeIndex++
				} else if(that.activeIndex == 2) {
					that.activeIndex = 5
				} else if(that.activeIndex == 5) {
					that.activeIndex = 8
				} else if(that.activeIndex <= 8 && that.activeIndex > 6) {
					that.activeIndex--
				} else if(that.activeIndex == 6) {
					that.activeIndex = 3
				} else if(that.activeIndex == 3) {
					that.activeIndex = 0;
					that.overRote++;
				}
				if((that.rewardIndex === that.activeIndex)) {
					that.cjStop()
					that.timer = setTimeout(() => {
						that.delay = true;
						that.dialog();
						that.$emit("receiveData", that.rewardInfo)
					}, 200)
				} else {
					that.timer = setTimeout(() => {
						that.cj_active()
					}, 200)

				}
			},
			dialog() {
				let that = this;
				if(that.needDialog) {
					that.overaward = true
				}
			},
			closeDialog() {
				let that = this;
				that.overaward = false;
				that.activeIndex = 0;
				that.overRote = 0;
				that.rewardIndex = "";
				that.rewardId=""
			},
			goCj() {
				var that = this;
				if(that.delay) {
					that.delay = false;
					that.$emit("cjClick")
					axios.get(that.awardUrl)
						.then(function(res) {
							//						debugger
							that.rewardInfo = res.data;
							that.rewardId = res.data.data.id;
						})
						.catch(function(res) {
							/*debugger*/
							setTimeout(() => {
								//超时
								that.toast("请求超时！");
								that.$emit("timeOut", that.timer)

							}, 20000)
						})
					that.cj_active();
				}
			},
			qfId(id) {
				let that = this;
				that.cjInfo.forEach(function(v, i) {
					if(i !== 4) {
						if(v.id == id) {
							that.rewardIndex = i;
						}
					}
				})
			},
			cjStop() {
				let that = this;
				clearTimeout(that.timer);
				that.timer = null;
			},
			toast(text) {
				let that = this;
				that.toastText = text;
				that.toastShow = true;
				setTimeout(() => {
					that.toastShow = false;
				}, 2000)
			}
		}

	}
</script>

<style lang="scss">
	body {
		max-width: 640px;
		margin: 0 auto;
	}
	
	$baseWidth:360;
	.cj_result {
		position: fixed;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
		width: 100%;
		height: 100%;
		background-color: rgba(0, 0, 0, .6);
		z-index: 6;
		max-width: 640px;
		article {
			position: absolute;
			width: 80%;
			top: 50%;
			left: 50%;
			transform: translate(-50%, -50%);
			background-color: #fff;
			padding: 10px;
			.close {
				position: absolute;
				font-size: 20px;
				color: #333;
				right: -6px;
				top: -10px;
				cursor: pointer;
			}
			img {
				margin: 10px auto;
			}
		}
	}
	
	.cj-box {
		width: 275/$baseWidth*100%;
		padding: 32/$baseWidth*100% 20px;
		background: url("./img/cj-bg.png") no-repeat center;
		background-size: contain;
		box-sizing: border-box;
		margin: 0 auto;
		overflow: hidden;
		&.curr {
			background: url("./img/cj-bg-curr.png") no-repeat center;
			background-size: contain;
		}
		ul {
			padding: 2.5%;
			li {
				width: 30%;
				text-align: center;
				margin-left: 2.5%;
				padding: 5px 0;
				padding-right: 4px;
				box-sizing: border-box;
				cursor: pointer;
				border-radius: 5px;
				background: #fff;
				position: relative;
				&:nth-of-type(n+4) {
					margin-top: 3%;
				}
				&:nth-of-type(5) {
					padding: 0 0;
					img {
						width: 100%;
						margin-top: 0;
						position: absolute;
						left: 50%;
						transform: translate(-50%);
					}
				}
				/*	display: flex;
				justify-content: center;
				align-items: center;
				text-align: center;*/
				&.active {
					background: url("./img/hover.png") no-repeat center;
					background-size: 100%;
				}
				img {
					width: 70%;
					margin-top: 15%;
				}
			}
		}
	}
	
	.toast {
		height: 40px;
		line-height: 40px;
		padding: 0 30px;
		box-sizing: border-box;
		position: fixed;
		top: 50%;
		left: 50%;
		margin-top: -20px;
		text-align: center;
		/*background: rgba(0, 0, 0, .4);*/
		border-radius: 10px;
		background: #e1e1e1;
		font-size: 14px;
		color: #333;
		-webkit-transform: translate(-50%);
		-moz-transform: translate(-50%);
		-ms-transform: translate(-50%);
		-o-transform: translate(-50%);
		transform: translate(-50%);
		z-index: 111;
	}
</style>