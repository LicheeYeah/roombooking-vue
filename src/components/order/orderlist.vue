<template>
	<div>
		<h2 style="letter-spacing: 2px;margin-bottom: 10px;">订单管理</h2>
		<Table border :columns="columns12" :data="data6">
			<template slot-scope="{ row, index }" slot="action">
				<Button type="primary" size="small" style="margin-right: 5px" @click="show(index)">View</Button>
				<Button type="error" size="small" @click="remove(index)">Delete</Button>
			</template>
		</Table>
		<Page class="page" :total="this.total" :page-size="orderQueryDTO.pageBuilder.pageSize" :current="orderQueryDTO.pageBuilder.pageNum"
		 :page-size-opts="size" show-elevator show-total show-sizer @on-change='changePageNum' @on-page-size-change='changePageSize' />
	</div>
</template>

<script>
	export default {
		data() {
			return {
				size: [3, 5, 10],
				total: "",
				orderQueryDTO: {
					code: "",
					createTimes: [""],
					checkInTimes: [""],
					checkOutTimes: [""],
					status: "",
					pageBuilder: {
						pageNum: 1,
						pageSize: 10
					}
				},
				columns12: [{
						title: '订单编号',
						key: 'code'
					},
					{
						title: '经手人',
						key: 'managerId'
					},
					{
						title: '入住时间',
						key: 'checkInTime'
					},
					{
						title: '退房时间',
						key: 'checkOutTime'
					},
					{
						title: '订单状态',
						key: 'state'
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
				this.orderQueryDTO.pageBuilder.pageNum = index;
				this.submitPage();
			},
			changePageSize(index) {
				this.orderQueryDTO.pageBuilder.pageSize = index;
				this.submitPage();
			},
			submitPage: function() {
				var url = "/order/get";
				var data = this.orderQueryDTO;

				this.$http.post(url, data, {
					headers: {
						'Content-Type': 'application/json'
					}
				}).then(response => {
					this.data6 = response.data.data.content;
					this.orderQueryDTO.pageBuilder.pageSize = response.data.data.pageable.pageSize;
					this.orderQueryDTO.pageBuilder.pageNum = response.data.data.pageable.pageNumber+1;
					this.total = response.data.data.totalElements;
				}).catch(error => {
					alert(error);
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
