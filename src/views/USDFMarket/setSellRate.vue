<template>
	<el-form  v-if="sysUserName =='admin'" ref="form" :model="form" label-width="80px" @submit.prevent="onSubmit" style="margin:20px;width:60%;min-width:600px;">
		
		
		<el-form-item label="挂单手续费">
			<el-input v-model="form.count" placeholder="当前数量" ></el-input>
		</el-form-item>
	
		
		<el-form-item>
		    <el-button type="primary" @click="onSubmit">确认保存</el-button>
		 </el-form-item>
	</el-form>
	
</template>

<script>
	let _this
	export default {
		data() {
			return {
				sysUserName:"",
				form: {
					count:'', 		//股票数量
				},
				
			}
		},
		mounted() {
			_this = this
			var user = sessionStorage.getItem('user');
			console.log(user)
			if (user) {
				user = JSON.parse(user);
				this.sysUserName = user|| '';
			}
			this.getCurrentPrice()
		},
		methods: {
			getCurrentPrice(){
				let params ={
					params: {
					
					}
				}
				this.listLoading = true;
				let url = this.baseUrl +'/cms_base/udeal_service_charge'
				this.$http.get(url,params)
				.then((res)=>{
					    
						if (res.body.status ==0){
							console.log(res.body)
							_this.form.count = res.body.data.msg
							
						}else{
							_this.$message(res.body.message)
							return
						}
						
					}).catch(function (error) {
						_this.$message(error)
					});
			},
			reset:function(){
				this.$refs['form'].resetFields()
			},
			onSubmit() {
				let _this = this
				this.$confirm('确认提交吗？', '提示', {}).then(() => {
					let params ={
						params: {
							udealServiceCharge: _this.form.count    // 类型 
						}
					}
					this.listLoading = true;
					let url = this.baseUrl +'/cms_base/update_udeal_service_charge'
					this.$http.get(url,params)
					.then((res)=>{
						    
							if (res.body.status ==0){
								console.log(res.body)
								_this.$message("设置成功！")
							
								_this.getCurrentPrice()
							}else{
								_this.$message(res.body.message)
								return
							}
							
						}).catch(function (error) {
							_this.$message(error)
						});
				});	
			}
		}
	}

</script>
