<template>
	<Form :model="roomDTO" :label-width="80">
		<FormItem label="房间号">
			<Input v-model="roomDTO.roomNo" placeholder="A108"></Input>
		</FormItem>
		<FormItem label="房间名">
			<Input v-model="roomDTO.name" placeholder="豪华"></Input>
		</FormItem>
		<FormItem label="类型">
			<Select v-model="roomDTO.type">
				<Option value="SINGLE">单人房</Option>
				<Option value="DOUBLE">双人房</Option>
				<Option value="LUXURIOUS">豪华房</Option>
				<Option value="suit">套房</Option>
			</Select>
		</FormItem>
		<FormItem label="最大人数">
			<Input v-model="roomDTO.people"></Input>
		</FormItem>
		
		<FormItem label="价格">
			<Input v-model="roomDTO.price"></Input>
		</FormItem>
		
		<FormItem label="上传图片">
			<Upload multiple action="//jsonplaceholder.typicode.com/posts/">
				<Button icon="ios-cloud-upload-outline">Upload files</Button>
			</Upload>
		</FormItem>
		<FormItem label="介绍">
			<Input v-model="roomDTO.introduction" type="textarea" :autosize="{minRows: 2,maxRows: 5}" placeholder="Enter something..."></Input>
		</FormItem>
		<FormItem>
			<Button type="primary" @click="submit()">Submit</Button>
			<Button style="margin-left: 8px" to="managerMain">Cancel</Button>
		</FormItem>
	</Form>
</template>
<script>
	export default {
		data() {
			return {
				roomDTO: {
					roomNo: '',
					price: '',
					people: '',
					name: '',
					roomImgUrl: [],
					introduction: '',
					type: ''
				}

			}
		},
		methods:{
			submit:function(){
				var url = "/room/insert";
				var data = this.roomDTO;
				this.$http.post(url, data, {
						headers: {'Content-Type': 'application/json'}
					}).then(response=>{
						if(response.data.code == 1){
							alert("添加成功！");
							this.$router.push("/managerMain")
						}else
							alert(response.data.info);
					}).catch(error=>{
						alert(error);
					})
			}
		}
		
	}
</script>
