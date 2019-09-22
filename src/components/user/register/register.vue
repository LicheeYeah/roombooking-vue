<style lang="less">
	@import './register.less';
</style>
<style>
	body{
		background-image: url('../../../assets/images/login-bg.jpg');
	}
</style>
<template>
	<div class="register">
		<div class="login-con">
			<Card icon="log-in" title="注册" :bordered="false">
				<div class="form-con">
					<div>
						<Form ref="formInline" :model="formInline" :rules="ruleInline">
							<FormItem prop="user">
								<Input type="text" v-model="formInline.userName" placeholder="Username">
								<Icon type="ios-person-outline" slot="prepend"></Icon>
								</Input>
							</FormItem>
							<FormItem prop="password">
								<Input type="password" v-model="formInline.password" placeholder="Password">
								<Icon type="ios-lock-outline" slot="prepend"></Icon>
								</Input>
							</FormItem>
							<FormItem prop="email">
								<Input type="text" v-model="formInline.email" placeholder="Email">
								<Icon type="ios-mail-outline" slot="prepend"></Icon>
								</Input>
							</FormItem>
							<FormItem>
								<Button type="primary" @click="register()">注册</Button>
							</FormItem>
						</Form>
					</div>
				</div>
			</Card>
		</div>
	</div>
</template>
<script>
	export default {
		data() {
			return {
				formInline: {
					userName: '',
					password: '',
					email: ''
				},
				ruleInline: {
					user: [{
						message: 'Please fill in the user name',
						trigger: 'blur'
					}],
					password: [{
							required: true,
							message: 'Please fill in the password.',
							trigger: 'blur'
						},
						{
							type: 'string',
							min: 6,
							message: 'The password length cannot be less than 6 bits',
							trigger: 'blur'
						}
					],
					email: [{
						required: true,
						message: 'Please fill in the email',
						trigger: 'blur'
					}]
				}
			}
		},
		methods: {
			register: function() {
				var data = this.formInline;
				var url = "/user/insert"
				console.log(data);
				this.$http.post(url, data,{
					headers: {
						'Content-Type': 'application/json'
					}
				}).then(response=>{
					if(response.data.code == 1){
						alert("添加成功！");
						this.$router.push("/login");
					}
				}).catch(error=>{
					alert(error);
				})
			}
		}

	}
</script>

<style>
</style>
