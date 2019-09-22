<style lang="less">
	@import './managerMain.less';
</style>

<template>
	<div class="managerMain" style="height: 800px;">
		<Layout>
			<Header>
				<Menu mode="horizontal" theme="dark" active-name="1">
					<div class="layout-logo"><img class="logo-img" src="../../../../build/logo.png" alt=""></div>
					<div class="layout-nav">
						<template v-if="this.privilege == 'ADMIN'">
							<MenuItem name="1">
							<Icon type="ios-navigate"></Icon>
							用户管理
							</MenuItem>
							<MenuItem name="2">
							<Icon type="ios-keypad"></Icon>
							客房管理
							</MenuItem>
							<MenuItem name="3">
							<Icon type="ios-analytics"></Icon>
							订单管理
							</MenuItem>
							<MenuItem name="3">
							<Icon type="ios-analytics"></Icon>
							订单管理
							</MenuItem>
						</template>
					</div>
				</Menu>
			</Header>
			<Layout style="position: absolute;top: 64px;bottom: 0px;left: 0px;right: 0px;">
				<Sider hide-trigger :style="{background: '#fff'}">
					<Menu active-name="1-2" theme="light" width="auto" :open-names="['1']">
						<template v-if="this.privilege == 'ADMIN'">
							<Submenu name="1">
								<template slot="title">
									<Icon type="ios-navigate"></Icon>
									用户管理
								</template>
								<MenuItem name="1-1"><span @click="goFunc(1)">查看用户列表</span></MenuItem>
							</Submenu>
							<Submenu name="2">
								<template slot="title">
									<Icon type="ios-keypad"></Icon>
									客房管理
								</template>
								<MenuItem name="2-1"><span @click="goFunc(2)">新增客房</span></MenuItem>
								<MenuItem name="2-4"><span @click="goFunc(5)">查看客房列表</span></MenuItem>
							</Submenu>
							<Submenu name="3">
								<template slot="title">
									<Icon type="ios-analytics"></Icon>
									订单管理
								</template>
								<MenuItem name="3-1"><span @click="goFunc(6)">查看订单列表</span></MenuItem>
							</Submenu>
						</template>
						<template v-if="this.privilege == 'USER'">
							<Submenu name="5">
								<template slot="title">
									<Icon type="ios-keypad"></Icon>
									客房管理
								</template>
								<MenuItem name="5-4"><span @click="goFunc(8)">查找客房</span></MenuItem>
							</Submenu>
						</template>
						<Submenu name="4">
							<template slot="title">
								<Icon type="ios-keypad"></Icon>
								个人
							</template>
							<MenuItem name="2-1"><span @click="goFunc(7)">注销</span></MenuItem>
						</Submenu>
					</Menu>
				</Sider>
				<Layout :style="{padding: '0 24px 24px'}">
					<Breadcrumb :style="{margin: '24px 0'}">
						<BreadcrumbItem>Home</BreadcrumbItem>
						<BreadcrumbItem>Components</BreadcrumbItem>
						<BreadcrumbItem>Layout</BreadcrumbItem>
					</Breadcrumb>
					<Content :style="{padding: '24px', minHeight: '280px', background: '#fff'}">
						<router-view></router-view>
					</Content>
				</Layout>
			</Layout>
		</Layout>

	</div>
</template>
<script type="text/javascript">
	export default {
		name: 'managerMain',
		inject: ['reload'],
		data() {
			return {
				privilege: "",
				userName: ""
			}
		},
		methods: {
			goFunc: function(i) {
				switch (i) {
					case 1:
						this.$router.push({
							path: 'userlist'
						});
						break;
					case 2:
						this.$router.push({
							path: 'addRoom'
						});
						break;
					case 5:
						this.$router.push({
							path: 'roomlistManager'
						});
						break;
					case 6:
						this.$router.push({
							path: 'orderlist'
						})
						break;
					case 7:
						var url = "/user/exit?userName=" + this.userName;
						this.$http.post(url, null, {
							headers: {
								'Content-Type': 'application/json'
							}
						})
						this.$router.push("login");
						break;
					case 8:
						this.$router.push({
							path:'roomlist'
						})
						break;
				}
			}
		},
		mounted() {
			var user = this.$store.getters.getUser;
			this.userName = user.userName;
			this.privilege = this.$store.getters.getPrivilege;
		}
	}
</script>
