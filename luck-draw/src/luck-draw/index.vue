<template>
	<cj :infoUrl="infoUrl" :awardUrl="awardUrl" v-on:receiveData="receive" v-on:timeOut="overtime" :needDialog="needDialog" :cjClick="cjStart"></cj>
</template>

<script>
	import axios from 'axios' //更好突显此组件中引入该方法
	import cj from "./luckdraw"
	export default {
		name: "luck",
		components: {
			cj
		},
		data() {
			return {
				awardUrl: "./static/test.json",
				infoUrl: "./static/img.json",
				needDialog: true
			}
		},
		created() {},
		methods: {
			receive(data) {
				debugger
				//请求成功并且成功转到中奖物品后返回的回调函数
			},
			overtime(time) {
				//请求超时并返回的回调函数
				//
				clearTimeout(time)
			},
			cjStart() {
				//点击抽奖按钮的回调
			}
		}
	}
</script>

<style>

</style>