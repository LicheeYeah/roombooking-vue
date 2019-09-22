import Vue from 'vue'
import Router from 'vue-router'

import HelloWorld from '@/components/HelloWorld'
import login from '@/components/user/login/login'
import register from '@/components/user/register/register'

import managerMain from '@/components/manager/managerMain/ManagerMain'
import userlist from '@/components/user/userlist/userlist'
import roomlist from '@/components/room/roomlist/roomlist'
import orderlist from '@/components/order/orderlist'
import roomlistManager from '@/components/room/roomlistManager/roomlistManager'
import addRoom from '@/components/room/addRoom/addRoom'
import orderWrite from '@/components/order/orderWrite'
Vue.use(Router)

export default new Router({
	routes: [{
			path: '/',
			name: 'HelloWorld',
			component: HelloWorld
		},
		{
			path: '/login',
			name: 'login',
			component: login
		},
		{
			path: '/register',
			name: 'register',
			component: register
		},
		{
			path: '/managerMain',
			name: 'managerMain',
			component: managerMain,
			children: [{
					path: '/userlist',
					name: 'userlist',
					component: userlist
				},
				{
					path: '/roomlist',
					name: 'roomlist',
					component: roomlist
				},
				{
					path: '/orderlist',
					name: 'orderlist',
					component: orderlist
				},
				{
					path: '/roomlistManager',
					name: 'roomlistManager',
					component: roomlistManager
				},
				{
					path: '/addRoom',
					name: 'addRoom',
					component: addRoom
				},
				{
					path: '/orderWrite',
					name: 'orderWrite',
					component: orderWrite
				}
			]
		}
	]
})
