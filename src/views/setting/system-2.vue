<template>
	<el-form ref="form" v-if="sysUserName =='admin'" :model="form" label-width="80px" @submit.prevent="onSubmit" style="margin:20px;width:60%;min-width:600px;">
		<el-form-item label="起提币提币数量">
			<el-input v-model="form.startingNumber"></el-input>
		</el-form-item>
		<!-- <el-form-item label="默认用户每周提币量">
			<el-input v-model="form.weekReceive"></el-input>
		</el-form-item> -->
		<el-form-item label="买矿机送能量倍数">
			<el-input v-model="form.energyMultiple"></el-input>
		</el-form-item>
		<el-form-item label="社区等级提升所需人数">
			<el-input v-model="form.levelUpCount"></el-input>
		</el-form-item>
        <el-form-item label="等级提升所需直推业绩">
        	<el-input v-model="form.levelUpCount"></el-input>
        </el-form-item>
		<el-form-item label="出局倍数">
			<el-input v-model="form.outMultiple"></el-input>
		</el-form-item>
		<el-form-item label="用户生产中最高矿机数量">
			<el-input v-model="form.maxUserMachine"></el-input>
		</el-form-item>
		<el-form-item label="邮箱最高注册用户数">
			<el-input v-model="form.mailUserCount"></el-input>
		</el-form-item>
		<el-form-item label="提币时间段">
			<el-input v-model="form.withdrawDepositTime"></el-input>
		</el-form-item>
		<el-form-item label="每天提币数">
			<el-input v-model="form.dayReceive"></el-input>
		</el-form-item>
		<el-form-item label="每天提币次数">
			<el-input v-model="form.dayReceiveTime"></el-input>
		</el-form-item>
		<el-form-item label="每个钱包地址每天提币数">
			<el-input v-model="form.oneWalletDayReceive"></el-input>
		</el-form-item>
        
	  <el-form-item label="提币开关">
		<el-switch on-text="" off-text="" v-model="form.withdrawDepositSwitch"></el-switch>
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
                   energyMultiple:'',
                   levelUpCount:'',
                   levelUpPerformance:'', 
                   mailUserCount:'', 
                   maxUserMachine:'',
                   outMultiple:'',
                   startingNumber:'', 
                   weekReceive: '',
                   withdrawDepositSwitch:'',
				   withdrawDepositTime:'',
				   dayReceive:'',
				   dayReceiveTime:'',
				   oneWalletDayReceive:''
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
					let url = this.baseUrl +'/switch/list2'
					
					this.$http.get(url,_this.form)
					.then((res)=>{
					        console.log(res.body.data.withdrawDepositSwitch)
							_this.form = res.body.data
							_this.form.withdrawDepositSwitch= res.body.data.withdrawDepositSwitch==1?true:false
							console.log(_this.form)

					    }).catch(function (error) {
					        console.log(error)
					    });
			
			},
			submit:function(){
				
				//开关需要把true转化成1或者0
				_this.form.withdrawDepositSwitch = _this.form.withdrawDepositSwitch?1:0
				console.log(_this.form)
				let url = this.baseUrl +'/switch/update2'
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
