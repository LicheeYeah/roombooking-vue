<template>
	<Form :model="orderDTO" :label-width="80">
		<FormItem label="房间号">
			<Input v-model="orderDTO.roomNos" ></Input>
		</FormItem>
		<FormItem label="房间名">
			<Input v-model="orderDTO.name" ></Input>
		</FormItem>
		<FormItem label="姓名">
			<Input v-model="orderDTO.userName"></Input>
		</FormItem>
		<FormItem label="时间">
            <Row>
                <Col span="11">
                    <DatePicker type="date" placeholder="入住日期" v-model="orderDTO.checkInTime"></DatePicker>
                </Col>
                <Col span="2" style="text-align: center">-</Col>
                <Col span="11">
                    <DatePicker type="date" placeholder="离开日期" v-model="orderDTO.checkOutTime"></DatePicker>
                </Col>
            </Row>
        </FormItem>
		<FormItem>
            <Button type="primary" @click="submitPage()">Submit</Button>
            <Button style="margin-left: 8px" to="managerMain">Cancel</Button>
        </FormItem>
	</Form>
</template>
<script>
	export default {
		data() {
			return {
				orderDTO: {
					roomNos:'',
					code: '',
					managerName: '',
					checkInTime: '',
					checkOutTime: '',
					rate: '',
					remark: '',
					userName: ''
				},
				roomDTO:{
					roomNos: '',
					price: '',
					people: '',
					name: ''
				}

			}
		},
		methods:{
			submitPage:function (){
				var url = "order/insert";
				var data = this.orderDTO;
				// this.$http.post(url, data, {
				// 	headers: {
				// 		'Content-Type': 'application/json'
				// 	}
				// }).then(response=>{
				// 	alert("您已增加新订单");
				// 	this.$router.push("managerMain");
				// })
				alert("您已增加新订单");
				this.$router.push("managerMain");
			}
		}
		
	}
</script>
