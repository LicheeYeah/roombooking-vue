<style lang="less">
  @import './login.less';
</style>
<style>
	body{
		background-image: url('../../../assets/images/login-bg.jpg');
	}
</style>
<template>
	<div class="login">
		<div class="login-con">
			<Card icon="log-in" title="欢迎登录" :bordered="false">
				<div class="form-con">
					<div>
						<Form ref="formInline" :model="formInline" :rules="ruleInline" >
							<FormItem prop="user">
								<Input type="text" v-model="formInline.userName"  placeholder="UserName">
								<Icon type="ios-person-outline" slot="prepend"></Icon>
								</Input>
							</FormItem>
							<FormItem prop="password">
								<Input type="password" v-model="formInline.password" placeholder="Password">
								<Icon type="ios-lock-outline" slot="prepend"></Icon>
								</Input>
							</FormItem>
							<FormItem>
								<Button type="primary" @click="handleSubmit('formInline')">登陆</Button>
								<Button  style="margin-left: 130px;" to="register">注册</Button>
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
		name:'login',
		inject:['reload'],
		data() {
			return {
				formInline: {
					userName: '',
					password: ''
				},
				ruleInline: {
					userName: [{
						required: true,
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
					]
				}
			}
		},
		methods: {
			handleSubmit(name) {
				var data = this.Qs.stringify(this.formInline);
				console.log(data);
				var url = '/user/login?'+data; 
				//利用axios发出ajax的post请求
				this.$http.post(url,data,
				     {headers:{'Content-Type':'application/json'}})  
				    .then(response =>{
				        // 响应成功回调
						console.log(response.data.data);
				        if(response.data.code===1){
							this.$store.commit('setUser', response.data.data);
							this.$router.push('managerMain');
				        }
				        else//登录失败                      
				            alert("fail");                                
				    }).catch(error => {
				        console.log(error);
				    }
				);
			}
		}
	}
</script>
