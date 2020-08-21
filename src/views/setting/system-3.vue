<template>
	<el-form ref="form" v-if="sysUserName =='admin'" :model="form" label-width="80px" @submit.prevent="onSubmit" style="margin:20px;width:60%;min-width:600px;">
		<el-form-item label="转币能量比例">
			<el-input v-model="form.transferServiceCharge"></el-input>
		</el-form-item>
		
		
		<el-form-item>
			<el-button type="primary" @click="submit">保存</el-button>
			<el-button @click.native.prevent>取消</el-button>
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
                   // energyMultiple:'',
                   // levelUpCount:'',
                   // levelUpPerformance:'', 
                   // mailUserCount:'', 
                   // maxUserMachine:'',
                   // outMultiple:'',
                   // startingNumber:'', 
                   // weekReceive: '',
                   // withdrawDepositSwitch:''
				}
			}
		},
		
		methods: {
			
			
			getUsers:function() {
				    
					let _this = this
					// let params ={
					//     params: {
					       
					//     }
					// }
					let url = this.baseUrl +'/switch/list3'
					
					this.$http.get(url,_this.form)
					.then((res)=>{
					        
							_this.form = res.body.data
							// _this.form.withdrawDepositSwitch= res.body.data.withdrawDepositSwitch==1?true:false
							console.log(_this.form)

					    }).catch(function (error) {
					        console.log(error)
					    });
			
			},
			submit:function(){
				
				
				_this.form.withdrawDepositSwitch = _this.form.withdrawDepositSwitch?1:0
				console.log(_this.form)
				let url = this.baseUrl +'/switch/update3'
				this.$http.post(url,_this.form)
				.then((res)=>{
					if (res.body.status==0){
						this.$message("保存成功")
					}
				   console.log(res)
				   this.getUsers()
			
				    }).catch(function (error) {
				        console.log(error)
				    });
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
			this.getUsers();
		}
	}

</script>
