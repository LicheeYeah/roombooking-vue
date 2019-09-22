<template>
	<div>
		<Table border :columns="columns12" :data="data6">
			<template slot-scope="{ row, index }" slot="action">
				<Button type="primary" size="small" style="margin-right: 5px" @click="show(index)">View</Button>
				<Button type="error" size="small" @click="remove(index)">Delete</Button>
			</template>
		</Table>
		<Page class="page" :total="total" :page-size="roomQueryDTO.pageBuilder.pageSize" :current="roomQueryDTO.pageBuilder.pageNum"
		 :page-size-opts="size" show-elevator show-total show-sizer @on-change='changePageNum' @on-page-size-change='changePageSize' />
	</div>
</template>

<script>
	export default {
		data() {
			return {
				size: [3, 5, 10],
				total:"",
				roomQueryDTO: {
					roomNo:"",
					prices:[""],
					peoples:[""],
					name:"",
					type:"",
					pageBuilder: {
						pageNum: 1,
						pageSize: 5,
					}
				},
				columns12: [{
						title: '房间号',
						key: 'roomNo'
					},
					{
						title: '房间名',
						key: 'name'
					},
					{
						title: '入住人数',
						key: 'people'
					},
					{
						title: '价格/晚',
						key: 'price'
					},
					{
						title:'客房类型',
						key: 'type'
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
				this.roomQueryDTO.pageBuilder.pageNum = index;
				this.submitPage();
			},
			changePageSize(index) {
				this.roomQueryDTO.pageBuilder.pageSize = index;
				this.submitPage();
			},
			submitPage: function() {
				var url = "/room/get";
				var data = this.roomQueryDTO;
				
				this.$http.post(url, data, {
						headers: {'Content-Type': 'application/json'}
					}).then(response => {
						this.data6 = response.data.data.content;
						this.roomQueryDTO.pageBuilder.pageSize = response.data.data.pageable.pageSize;
						this.roomQueryDTO.pageBuilder.pageNum = response.data.data.pageable.pageNumber+1;
						console.log(response.data.data.totalElements);
						this.total = response.data.data.totalElements;
					}).catch(error=>{
						alert(error);
				})
			}


		},
		mounted(){
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
