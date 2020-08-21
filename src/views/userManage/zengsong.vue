<template>
	<el-form  v-if="sysUserName =='admin'" ref="form" :model="form" label-width="80px" @submit.prevent="onSubmit" style="margin:20px;width:60%;min-width:600px;">
		
		<el-form-item label="会员ID">
			<el-input v-model="form.userCode" placeholder="会员账号"></el-input>
		</el-form-item>
		<el-form-item label="数量">
			<el-input v-model="form.usde" placeholder="不填表示不加"></el-input>
		</el-form-item>
		<el-form-item label="类型">
			<el-select v-model="form.usdeType" placeholder="请选择">
			    <el-option
			      v-for="item in options"
			      :key="item.value"
			      :label="item.label"
			      :value="item.value">
			    </el-option>
			  </el-select>
		</el-form-item>
		
		<el-form-item>
		    <el-button type="primary" @click="onSubmit">确认保存</el-button>
		 </el-form-item>
	</el-form>
	
</template>

<script>
	export default {
		data() {
			return {
				sysUserName:"",
				form: {
					userCode:'', 		//用户id
					usde:'',		//	赠送金额
					usdeType:''		//1资产，2奖金

				},
				options: [{
				          value: 1,
				          label: '资产'
				        }, {
				          value: 2,
				          label: '奖金'
				        }
				        ],
				        value: ''
			}
		},
		mounted() {
			
			var user = sessionStorage.getItem('user');
			console.log(user)
			if (user) {
				user = JSON.parse(user);
				this.sysUserName = user|| '';
			}
		},
		methods: {
			reset:function(){
				this.$refs['form'].resetFields()
			},
			onSubmit() {
				let _this = this
				this.$confirm('确认提交吗？', '提示', {}).then(() => {
					let params ={
						params: {
							userCode:_this.form.userCode,   //	用户名
							usde: _this.form.usde	,       //  增加数量，负数为减
							usdeType: _this.form.usdeType    // 类型 
						}
					}
					this.listLoading = true;
					let url = this.baseUrl +'/cms_app_user/add_usde'
					this.$http.get(url,params)
					.then((res)=>{
						    _this.form.usde = ""
							if (res.body.status ==0){
								console.log(res.body)
								_this.$message("赠送成功！")
								_this.form.userCode = ""
								_this.form.usde = ""
								_this.form.usdeType = ""
								
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
