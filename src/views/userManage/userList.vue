<template>
	<section>
		<!--工具条-->
		<el-col :span="24" class="toolbar" style="padding-bottom: 0px;">
			<el-form :inline="true" :model="filters">
				<el-form-item>
					<el-input v-model="filters.name" placeholder="姓名"></el-input>
				</el-form-item>
				<el-form-item>
					<el-button type="primary" v-on:click="search">查询</el-button>
				</el-form-item>
			<!-- 	<el-form-item>
					<el-button type="primary" @click="handleAdd">新增</el-button>
				</el-form-item> -->
			</el-form>
		</el-col>

		<!--列表-->
		<el-table :data="users" highlight-current-row v-loading="listLoading" @selection-change="selsChange" style="width: 100%;">
			<!-- <el-table-column type="selection" width="55">
			</el-table-column> -->
			<!-- <el-table-column type="index" width="60">
			</el-table-column> -->
			<el-table-column prop="userCode" label="编号" width="120" >
			</el-table-column>
			<el-table-column prop="userName" label="会员" width="140" sortable>
			</el-table-column>
			<el-table-column prop="userLevel" label="动态等级" width="120" >
			</el-table-column>
			<el-table-column prop="staticUserLevel" label="静态等级" width="120">
			</el-table-column>
			
			<el-table-column prop="usde" label="奖金" width="120" sortable>
			</el-table-column>
			<el-table-column prop="signinUsde" label="注册币" width="100" sortable>
			</el-table-column>
			<el-table-column prop="superiorUserCode" label="推荐人" width="100" sortable>
			</el-table-column>
			<!-- <el-table-column prop="sex" label="社区等级" width="100" :formatter="formatSex" sortable>
			</el-table-column> -->
			<el-table-column prop="energyPool" label="储能池" width="100" sortable>
			</el-table-column>
			<el-table-column prop="shuntPool" label="助力源" width="100" sortable>
			</el-table-column>
			<el-table-column prop="creditToken" label="授信码" width="120" sortable>
			</el-table-column>
			<el-table-column prop="userStatus" label="动态状态" width="120" >
			</el-table-column>
			<el-table-column prop="staticUserStatus" label="静态状态" width="100">
			</el-table-column>
			
			<el-table-column prop="isMain" label="主账号" width="100">
			</el-table-column>
			<el-table-column prop="leftPerformance" label="熵增业绩" width="100">
			</el-table-column>
			<el-table-column prop="rightPerformance" label="熵减业绩" width="100" sortable>
			</el-table-column>
			<el-table-column prop="usdtAddress" label="usdt地址" width="100" sortable>
			</el-table-column>
			

			<el-table-column prop="createTime" label="注册时间" width="120" sortable>
			</el-table-column>
			
			<el-table-column label="操作" width="200">
				<template scope="scope" v-if="sysUserName =='admin'">
					<el-button size="small" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
					<!-- <el-button type="danger" size="small" @click="handleDel(scope.$index, scope.row)">团队</el-button> -->
					<!-- <el-button type="warning" size="small" @click="handleJump(scope.$index, scope.row)">登录</el-button> -->
				</template>
			</el-table-column>
		</el-table>

		<!--工具条-->
		<el-col :span="24" class="toolbar">
			<!-- <el-button type="danger" @click="batchRemove" :disabled="this.sels.length===0">批量删除</el-button> -->
			<el-pagination layout="prev, pager, next" @current-change="handleCurrentChange" :page-size="20" :total="total" style="float:right;">
			</el-pagination>
		</el-col>

		<!--编辑界面-->
		<el-dialog title="编辑" v-model="editFormVisible" :close-on-click-modal="false">
			<el-form :model="editForm" label-width="80px" :rules="editFormRules" ref="editForm">
				<el-form-item label="钱包密码">
					<el-input v-model="editForm.walletPassword" auto-complete="off"></el-input>
				</el-form-item>

				<el-form-item label="支付密码">
					<el-input v-model="editForm.payPassword"></el-input>
				</el-form-item>
				<el-form-item label="邮箱地址">
					<el-input v-model="editForm.mail"></el-input>
				</el-form-item>
				<el-form-item label="手机号码">
					<el-input v-model="editForm.phone"></el-input>
				</el-form-item>
				
				<el-form-item label="信用等级">
					<el-input v-model="editForm.creditLevel"></el-input>
				</el-form-item>
				
				
				
				<!-- <el-form-item label="是否服务中心">
					<el-input v-model="editForm.isServiceCenterCode"></el-input>
				</el-form-item> -->
				
				
			</el-form>
			<div slot="footer" class="dialog-footer">
				<el-button @click.native="editFormVisible = false">取消</el-button>
				<el-button type="primary" @click.native="editSubmit" :loading="editLoading">提交</el-button>
			</div>
		</el-dialog>

		
	</section>
</template>

<script>
	import util from '../../common/js/util'
	//import NProgress from 'nprogress'
	import { getUserListPage, removeUser, batchRemoveUser, editUser, addUser } from '../../api/api';
   
	export default {
		data() {
			return {
				sysUserName:"",
				value:'',
				
				filters: {
					name: ''
				},
				users: [],
				total: 0,
				page: 1,
				listLoading: false,
				sels: [],//列表选中列

				editFormVisible: false,//编辑界面是否显示
				editLoading: false,
				editFormRules: {
					name: [
						{ required: true, message: '请输入姓名', trigger: 'blur' }
					]
				},
				//编辑界面数据
				editForm: {
					userCode:'',         //用户编码
					walletPassword:''	,        //密码
					payPassword:'',//	二级密码
					mail:'',			//		邮箱
					phone:'',		//	手机。
					creditLevel:'',		//	信用等级
				},

				addFormVisible: false,//新增界面是否显示
				addLoading: false,
				addFormRules: {
					name: [
						{ required: true, message: '请输入姓名', trigger: 'blur' }
					]
				},
				//新增界面数据
				addForm: {
					name: '',
					sex: -1,
					age: 0,
					birth: '',
					addr: ''
				},
				pageNum: 1,
				pageSize:20,
				userCode: '',
				keepUrl:''

			}
		},
		methods: {
			
			search:function(){
				this.pageNum =1
				this.getUsers()
			},
			//性别显示转换
			formatSex: function (row, column) {
				return row.sex == 1 ? '男' : row.sex == 0 ? '女' : '未知';
			},
			handleCurrentChange(val) {
				this.pageNum = val;
				this.getUsers();
			},
			//获取用户列表
			getUsers:function() {
				
					let _this = this
					let params ={
					    params: {
					        keyword:_this.filters.name,
					        pageNum:_this.pageNum,
					        pageSize:_this.pageSize 
					    }
					}
					let url = this.baseUrl +'/cms_app_user/list'
					this.$http.get(url,params)
					.then((res)=>{
					        console.log(res.body)
							_this.users= res.body.data.list
							_this.total = res.body.data.totalCount
					    }).catch(function (error) {
					        console.log(error)
					    });

			},
			//删除
			handleDel: function (index, row) {
			    console.log(index,row)
				this.$router.push({path: '/team',query:{userName: row.userName}})
				
			},
			//跳转到前台
			handleJump:function(index,row){
				let _this = this
				let userCode = row.userCode
				let params ={
				    params: {
						  userCode: userCode 
						},
					}
				let jumpUrl = 'http://eosalliances.com:8082/#/pages/user/user?mytoken='
				let url = 'http://backsxveof.eosalliances.com:8082/hleos/user/adminLogin'
				this.$http.get(url,params)
				.then((res) => {
					console.log(res)
					_this.keepUrl= res.body.data.msg
					//console.log(res.body.data.msg)	
				});
				setTimeout(function() {
					window.open(jumpUrl+_this.keepUrl,'ykeos') 
				}, 2000);
				
			},
			//显示编辑界面
			handleEdit: function (index, row) {
				this.editFormVisible = true;
				this.editForm = Object.assign({}, row);
				this.editForm.walletPassword = ''
				this.editForm.payPassword = ''
				// this.editForm.isLock = this.editForm.isLock==1?true:false
				console.log(this.editForm)
				this.userCode =  row.userCode
			},
			//显示新增界面
			handleAdd: function () {
				this.addFormVisible = true;
				this.addForm = {
					name: '',
					sex: -1,
					age: 0,
					birth: '',
					addr: ''
				};
			},
			//编辑
			editSubmit: function () {
				let _this  = this
				this.$refs.editForm.validate((valid) => {
					if (valid) {
						this.$confirm('确认提交吗？', '提示', {}).then(() => {
							this.editLoading = true;
							//NProgress.start();
							let para = Object.assign({}, _this.editForm);
							let params ={
                                params: {
									userCode:_this.editForm.userCode,         //用户编码
									walletPassword:_this.editForm.walletPassword||'',        //密码
									payPassword:_this.editForm.payPassword||'',//	二级密码
									mail:_this.editForm.mail,			//_this.editForm.邮箱
									phone:_this.editForm.phone,		//	手机。
									creditLevel:_this.editForm.creditLevel		//	信用等级   
							
								}
							}
							
							console.log(para)
							let url = this.baseUrl +'/cms_app_user/update_user'
							this.$http.get(url,params)
							.then((res) => {
								console.log(res)
								this.editLoading = false;
								
								this.$message({
									message: '提交成功',
									type: 'success'
								});
								this.$refs['editForm'].resetFields();
								this.editFormVisible = false;
								this.getUsers();
							});
						});
					}
				});
			},
			//新增
			addSubmit: function () {
				this.$refs.addForm.validate((valid) => {
					if (valid) {
						this.$confirm('确认提交吗？', '提示', {}).then(() => {
							this.addLoading = true;
							//NProgress.start();
							let para = Object.assign({}, this.addForm);
							para.birth = (!para.birth || para.birth == '') ? '' : util.formatDate.format(new Date(para.birth), 'yyyy-MM-dd');
							addUser(para).then((res) => {
								this.addLoading = false;
								//NProgress.done();
								this.$message({
									message: '提交成功',
									type: 'success'
								});
								this.$refs['addForm'].resetFields();
								this.addFormVisible = false;
								this.getUsers();
							});
						});
					}
				});
			},
			selsChange: function (sels) {
				this.sels = sels;
			},
			//批量删除
			batchRemove: function () {
				var ids = this.sels.map(item => item.id).toString();
				this.$confirm('确认删除选中记录吗？', '提示', {
					type: 'warning'
				}).then(() => {
					this.listLoading = true;
					//NProgress.start();
					let para = { ids: ids };
					batchRemoveUser(para).then((res) => {
						this.listLoading = false;
						//NProgress.done();
						this.$message({
							message: '删除成功',
							type: 'success'
						});
						this.getUsers();
					});
				}).catch(() => {

				});
			}
		},
		mounted() {
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

<style scoped>

</style>