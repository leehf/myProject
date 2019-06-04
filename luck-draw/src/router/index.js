import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import luckDraw from '@/luck-draw/luckdraw'
import cj from '@/luck-draw/index'
import index from '@/components/index'

Vue.use(Router)

export default new Router({
	routes: [{
			path: '/helloworld',
			name: 'HelloWorld',
			component: HelloWorld
		},
		{
			path: '/luckDraw',
			name: 'luckDraw',
			component: luckDraw
		}, {
			path: '/cj',
			name: 'index',
			component: cj
		},
		{
			path: '/',
			name: 'index',
			component: index
		}
	]
})