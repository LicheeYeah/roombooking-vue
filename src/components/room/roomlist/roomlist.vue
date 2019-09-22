<template>
	<div id="roomlist" style="padding: 10px;background: #f8f8f9">
		<div><template v-for="room in data6">
				<Card key="item.id" title="Options" icon="ios-options" :padding="0" shadow bordered style="width: 350px; display: block;">
					<div slot="title" style="text-align:center; padding-bottom: 10px;">
						<img src="../../../assets/images/bg.png" alt="" width="300px" style="border-radius: 10px;">
						<b style="float: left;padding-left:110px;margin-bottom: 5px;letter-spacing: 3px;font-size: 16px;">{{room.name}}</b>
					</div>
					<CellGroup>
						<Cell title="Only show titles" style="text-align:center;height: 30px;">
							<div style="display: inline;margin-right: 30px;">
								<Icon type="md-people" color="#10cdea" size="23" /> <i style="color: darkgray;margin-left: 2px;">{{room.people}}&nbsp;</i>人
							</div>
							<Divider type="vertical" />
							<div style="display: inline;margin-left: 30px;">
								<Icon type="logo-yen" color="#10cdea" /> <i style="color: darkgray;">{{room.price}}&nbsp;</i>元
							</div>
						</Cell>
						<Cell title="预定" extra="点击" to="orderWrite" />

					</CellGroup>
				</Card>
			</template>
		</div>
		<div><Page class="page" :total="total" :page-size="roomQueryDTO.pageBuilder.pageSize" :current="roomQueryDTO.pageBuilder.pageNum"
		 :page-size-opts="size" show-elevator show-total show-sizer @on-change='changePageNum' @on-page-size-change='changePageSize' /></div>
	</div>
</template>

<script type="text/javascript">
	export default {
		name: 'roomlist',
		data() {
			return {
				size: [3, 5, 10],
				total: "",
				roomQueryDTO: {
					roomNo: "",
					prices: [""],
					peoples: [""],
					name: "",
					type: "",
					pageBuilder: {
						pageNum: 1,
						pageSize: 5,
					}
				},
				data6: []
			}
		},
		methods: {
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
				console.log(data);
				this.$http.post(url, data, {
					headers: {
						'Content-Type': 'application/json'
					}
				}).then(response => {
					this.data6 = response.data.data.content;
					this.roomQueryDTO.pageBuilder.pageSize = response.data.data.pageable.pageSize;
					this.roomQueryDTO.pageBuilder.pageNum = response.data.data.pageable.pageNumber + 1;
					console.log(response.data.data.totalElements);
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
</style>
