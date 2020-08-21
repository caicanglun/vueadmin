<template>
	<el-form ref="form" v-if="sysUserName =='admin'" :model="form" label-width="80px" @submit.prevent="onSubmit" style="margin:20px;width:60%;min-width:600px;">
		<el-form-item label="EOS钱包">
			<el-input v-model="form.eosWalletAddress"></el-input>
		</el-form-item>
		<el-form-item label="EOSMemo备注">
			<el-input v-model="form.memoRemarkCode"></el-input>
		</el-form-item>
		<el-form-item label="服务中心分红比例">
			<el-input v-model="form.centreMachineDividendRatio"></el-input>
		</el-form-item>
		<el-form-item label="提现手续费">
			<el-input v-model="form.withdrawDepositServiceCharge"></el-input>
		</el-form-item>
		
		
	
			<el-row>
			  <el-col :span="12">
				  <el-form-item label="充值开关">
				  	<el-switch on-text="" off-text="" v-model="form.rechargeSwitch" @change="rechargeChange('recharge',$event)"></el-switch>
				  </el-form-item>
			  </el-col>
			  <el-form-item label="左右互转">
			  	<el-switch on-text="" off-text="" v-model="form.leftRight" @change="rechargeChange('leftRight',$event)"></el-switch>
			  </el-form-item>
			</el-row>
			
			
			<el-row>
			  <el-col :span="12">
				  <el-form-item label="上转下">
				  	<el-switch on-text="" off-text="" v-model="form.upToDown"></el-switch>
				  </el-form-item>
			  </el-col>
			  <el-col :span="12">
				  <el-form-item label="下转上">
				  	<el-switch on-text="" off-text="" v-model="form.downToUp"></el-switch>
				  </el-form-item>
			  </el-col>
			</el-row>
			<el-row>
			  <el-col :span="12">
				 <el-form-item label="全网互转">
				 	<el-switch on-text="" off-text="" v-model="form.allTransfer" @change="rechargeChange('allTransfer',$event)"></el-switch>
				 </el-form-item>
			  </el-col>
			  <el-col :span="12">
				  <el-form-item label="网站开关">
				  	<el-switch on-text="" off-text="" v-model="form.appSwitch"></el-switch>
				  </el-form-item>
			  </el-col>
			</el-row>

		<el-form-item label="用户矿机收益">
			<el-input v-model="form.machineHarvest"></el-input>
		</el-form-item>
		<el-form-item label="6层静态矿机分红">
			<el-input v-model="form.sixMachineDividend"></el-input>
		</el-form-item>
		<el-form-item label="新增业绩6%级差分红">
			<el-input v-model="form.newPerformanceDividend"></el-input>
		</el-form-item>
		<el-form-item label="服务中心分红">
			<el-input v-model="form.serviceCenterDividend"></el-input>
		</el-form-item>
		<el-form-item label="6层分红比例">
			<el-input v-model="form.machineDividendRatio"></el-input>
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
                    eosWalletAddress:'',		//eos钱包
                  	memoRemarkCode:'',			//memo备注
                  	rechargeSwitch:'',			//充值开关
                  	upToDown:'',				//上转下
                  	downToUp:'',				//下转上
                  	leftRight:'',				//左右
                  	appSwitch:'',				//app开关
					allTransfer:'',             //全网互转
                  	machineHarvest:'',				//用户领取矿机收益
                  	sixMachineDividend:'',		//6层静态矿机分红
                  	newPerformanceDividend:'',	//新增业绩6%级差分红
                  	serviceCenterDividend:'',		//服务中心分红
                  	machineDividendRatio:'',	//6层分红比例
                  	centreMachineDividendRatio:'',	//服务中心分红比例
                    withdrawDepositServiceCharge:'',	//提现手续费百分
				}
			}
		},
		
		methods: {
			rechargeChange:function(label,event){
				console.log(this.form.rechargeSwitch)
				// switch(label){
				// 	case 'recharge':
				// 		_this.rechargeSwitch = event;
				// 		break;
				// 	case 'upToDown':
				// 		_this.upToDown = event;
				// 		break;
				// 	case 'DownToUp':
				// 		_this.DownToUp = event;
				// 		break;
				// 	case 'LeftRight':
				// 		_this.LeftRight = event;
				// 		break;
				// 	case 'appSwitch':
				// 		_this.appSwitch = event;
				// 		break;
				// }				
				
			},
			
			getUsers:function() {
				
					let _this = this
					let params ={
					    params: {
					       
					    }
					}
					let url = this.baseUrl +'/switch/list1'
					this.$http.get(url,params)
					.then((res)=>{
					        console.log(res.body)
							_this.form.eosWalletAddress= res.body.data.eosWalletAddress
							_this.form.memoRemarkCode= res.body.data.memoRemarkCode
							_this.form.machineHarvest= res.body.data.machineHarvest
							_this.form.sixMachineDividend= res.body.data.sixMachineDividend
							_this.form.newPerformanceDividend= res.body.data.newPerformanceDividend
							_this.form.machineDividendRatio= res.body.data.machineDividendRatio
							_this.form.centreMachineDividendRatio= res.body.data.centreMachineDividendRatio
							_this.form.serviceCenterDividend= res.body.data.serviceCenterDividend
							_this.form.withdrawDepositServiceCharge= res.body.data.withdrawDepositServiceCharge
							_this.form.upToDown= res.body.data.upToDown==1?true:false
							_this.form.leftRight= res.body.data.leftRight==1?true:false
							_this.form.appSwitch= res.body.data.appSwitch==1?true:false
							_this.form.downToUp= res.body.data.downToUp==1?true:false
							_this.form.allTransfer= res.body.data.allTransfer==1?true:false
							_this.form.rechargeSwitch= res.body.data.rechargeSwitch==1?true:false

					    }).catch(function (error) {
					        console.log(error)
					    });
			
			},
			submit:function(){
				
				let params ={
				    
				       eosWalletAddress:_this.form.eosWalletAddress,
				       memoRemarkCode:_this.form.memoRemarkCode,
				       machineHarvest:_this.form.machineHarvest,
				       sixMachineDividend:_this.form.sixMachineDividend,
				       newPerformanceDividend:_this.form.newPerformanceDividend,
				       machineDividendRatio:_this.form.machineDividendRatio,
				       centreMachineDividendRatio:_this.form.centreMachineDividendRatio,
				       serviceCenterDividend:_this.form.serviceCenterDividend,
				       withdrawDepositServiceCharge:_this.form.withdrawDepositServiceCharge,
				       upToDown:_this.form.upToDown?1:0,
				       leftRight:_this.form.leftRight?1:0,
				       appSwitch:_this.form.appSwitch?1:0,
				       downToUp:_this.form.downToUp?1:0,
				       allTransfer:_this.form.allTransfer?1:0,
				       rechargeSwitch:_this.form.rechargeSwitch?1:0
				   
				}
				console.log(params)
				let url = this.baseUrl +'/switch/update1'
				this.$http.post(url,params)
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
			this.getUsers();
			var user = sessionStorage.getItem('user');
			console.log(user)
			if (user) {
				user = JSON.parse(user);
				this.sysUserName = user|| '';
			}
		}
	}

</script>
