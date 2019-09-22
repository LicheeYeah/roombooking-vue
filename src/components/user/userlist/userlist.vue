<template>
	<div>
		<Table border :columns="columns12" :data="data6">

			<template slot-scope="{ row, index }" slot="action">
				<Button type="primary" size="small" style="margin-right: 5px" @click="show(index)">View</Button>
				<Button type="error" size="small" @click="remove(index)">Delete</Button>
			</template>
		</Table>
		<Page class="page" :total="total" :page-size="userQueryDTO.pageBuilder.pageSize"
		 :current="userQueryDTO.pageBuilder.pageNum" :page-size-opts="size" show-elevator show-total show-sizer @on-change='changePageNum'
		 @on-page-size-change='changePageSize' />
	</div>
</template>

<script>
	export default {
		data() {
			return {
				size: [3, 5, 10],
				total: 10,
				userQueryDTO: {
					userName: "",
					nickName: "",
					phone: "",
					gender: "",
					isVip: "",
					state: "",
					registerTimes: [""],
					pageBuilder: {
						pageNum: 1,
						pageSize: 3,
					},
				},
				columns12: [{
						title: '用户名',
						key: 'userName'
					},
					{
						title: '昵称',
						key: 'nickName'
					},
					{
						title: '会员',
						key: 'isVip'
					},
					{
						title: '状态',
						key: 'state'
					},
					{
						title: '注册时间',
						key: 'registerTimes'
					},
					{
						title: 'Action',
						slot: 'action',
						width: 150,
						align: 'center'
					}
				],
				data6: []

			}
		},
		methods: {
			show(index) {
				this.$Modal.info({
					title: 'User Info',
					content: `Name：${this.data6[index].name}<br>Age：${this.data6[index].age}<br>Address：${this.data6[index].address}`
				})
			},
			remove(index) {
				this.data6.splice(index, 1);
			},
			changePageNum(index) {
				this.userQueryDTO.pageBuilder.pageNum = index;
				this.submitPage();
			},
			changePageSize(index) {
				this.userQueryDTO.pageBuilder.pageSize = index;
				this.submitPage();
			},
			submitPage: function() {
				var url = "/user/get";
				var data = this.userQueryDTO;
				console.log(data);
				this.$http.post(url, data, {
					headers: {
						'Content-Type': 'application/json'
					}
				}).then(response => {
					this.data6 = response.data.data.content;
					this.userQueryDTO.pageBuilder.pageSize = response.data.data.pageable.pageSize;
					this.userQueryDTO.pageBuilder.pageNum = response.data.data.pageable.pageNumber+1;
					this.total = response.data.data.totalElements;
				}).catch(error => {
					alert("error222: "+error);
				})
			}


		},
		mounted() {
			this.submitPage();
		}
	}
</script>

<style>
	.page {
		text-align: center;
		margin-top: 23px;
	}
</style>
