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
         <el-tabs v-model="activeName" @tab-click="handleClick">
             <el-tab-pane label="已取消" name="0"></el-tab-pane>
             <el-tab-pane label="待审核" name="1"></el-tab-pane>
             <el-tab-pane label="成功" name="2"></el-tab-pane>
             <el-tab-pane label="失败" name="3"></el-tab-pane>
         </el-tabs>
		<!--列表-->
		<el-table :data="users" highlight-current-row v-loading="listLoading" @selection-change="selsChange" style="width: 100%;">
			<el-table-column prop="applyCode" label="编号" width="150" >
			</el-table-column>
			<el-table-column prop="createTime" label="申请时间" width="120" sortable>
			</el-table-column>
			
			<el-table-column prop="userName" label="用户名" width="150" sortable>
			</el-table-column>
			<el-table-column prop="paymentTerm" label="收款方式" width="200" >
			</el-table-column>
			<el-table-column prop="money" label="到账金额" width="100" sortable>
				<template slot-scope="scope">
				            ¥{{scope.row.money}}
				</template>
			</el-table-column>
			<el-table-column prop="serviceCenter" label="所属服务中心" width="200" >
			</el-table-column>
			<el-table-column prop="referrerUserName" label="推荐人" width="200" >
			</el-table-column>
			<el-table-column prop="causeOfFailure" label="失败原因" width="200" >
			</el-table-column>
			<!-- <el-table-column prop="sex" label="社区等级" width="100" :formatter="formatSex" sortable>
			</el-table-column> -->
			<el-table-column prop="applyStatus" label="状态" width="100" >
			</el-table-column>

			<el-table-column prop="serviceCharge" label="手续费" width="100" >
			</el-table-column>

			<el-table-column label="操作" width="150">
				<template scope="scope" v-if="sysUserName =='admin'">
					<el-button size="small" @click="handleEdit(scope.$index, scope.row)">到账</el-button>
					<el-button type="danger" size="small" @click="handleDel(scope.$index, scope.row)">撤销</el-button>
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
				<el-form-item label="实际到账金额" prop="payMoney">
					<el-input v-model="editForm.payMoney" auto-complete="off"></el-input>
				</el-form-item>
				
			</el-form>
			<div slot="footer" class="dialog-footer">
				<el-button @click.native="editFormVisible = false">取消</el-button>
				<el-button type="primary" @click.native="editSubmit" :loading="editLoading">提交</el-button>
			</div>
		</el-dialog>
		
		<!--取消界面-->
		<el-dialog title="编辑" v-model="cancelFormVisible" :close-on-click-modal="false">
			<el-form :model="cancelForm" label-width="80px"  ref="cancelForm">
				<el-form-item label="提现失败原因" prop="causeOfFailure">
					<el-input v-model="cancelForm.causeOfFailure" auto-complete="off"></el-input>
				</el-form-item>
				
			</el-form>
			<div slot="footer" class="dialog-footer">
				<el-button @click.native="cancelFormVisible = false">取消</el-button>
				<el-button type="primary" @click.native="cancelSubmit" :loading="editLoading">提交</el-button>
			</div>
		</el-dialog>

		<!--新增界面-->
		<el-dialog title="新增" v-model="addFormVisible" :close-on-click-modal="false">
			<el-form :model="addForm" label-width="80px" :rules="addFormRules" ref="addForm">
				<el-form-item label="姓名" prop="name">
					<el-input v-model="addForm.name" auto-complete="off"></el-input>
				</el-form-item>
				<el-form-item label="性别">
					<el-radio-group v-model="addForm.sex">
						<el-radio class="radio" :label="1">男</el-radio>
						<el-radio class="radio" :label="0">女</el-radio>
					</el-radio-group>
				</el-form-item>
				<el-form-item label="年龄">
					<el-input-number v-model="addForm.age" :min="0" :max="200"></el-input-number>
				</el-form-item>
				<el-form-item label="生日">
					<el-date-picker type="date" placeholder="选择日期" v-model="addForm.birth"></el-date-picker>
				</el-form-item>
				<el-form-item label="地址">
					<el-input type="textarea" v-model="addForm.addr"></el-input>
				</el-form-item>
			</el-form>
			<div slot="footer" class="dialog-footer">
				<el-button @click.native="addFormVisible = false">取消</el-button>
				<el-button type="primary" @click.native="addSubmit" :loading="addLoading">提交</el-button>
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
				activeName:"1",
				applyStatus:1,
				filters: {
					name: ''
				},
				users: [],
				total: 0,
				page: 1,
				listLoading: false,
				sels: [],//列表选中列
				
                cancelFormVisible:false,
				editFormVisible: false,//编辑界面是否显示
				editLoading: false,
				editFormRules: {
					// payMoney: [
					// 	{ required: true, message: '请输入到账金额', trigger: 'blur' }
					// ]
				},
				cancelForm:{
					causeOfFailure:''
				},
				//编辑界面数据
				editForm: {
					payMoney:''
					
				},
                applyCode:'',
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
				pageSize:20

			}
		},
		methods: {
			handleClick:function(tab, event) {
			        console.log(tab.index);
					this.applyStatus = parseInt(tab.index)
					this.getUsers()
			      },
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
					        userName:_this.filters.name,
							applyStatus: _this.applyStatus,
					        pageNum:_this.pageNum,
					        pageSize:_this.pageSize 
					    }
					}
					let url = this.baseUrl +'/member/withdrawDepositList'
					this.$http.get(url,params)
					.then((res)=>{
					        console.log(res.body)
							_this.users= res.body.data.list
							_this.total = res.body.data.totalCount
					    }).catch(function (error) {
					        console.log(error)
					    });

			},
			//确认提币
			handleEdit:function(index, row){
				// this.editFormVisible = true;
				// this.editForm = Object.assign({}, row);
				//this.applyCode = row.applyCode
				this.$confirm('确认提交吗？', '提示', {}).then(() => {
					this.editLoading = true;
					//NProgress.start();
					let _params = Object.assign({}, this.editForm);
					
					let params ={
					    params: {
						  applyCode: row.applyCode,
					      payMoney:  row.money  
					    }
					}
					let url = this.baseUrl +'/member/withdrawDepositPass'
					const loading = this.$loading({
					            lock: true,//lock的修改符--默认是false
					            text: 'Loading',//显示在加载图标下方的加载文案
					            
					            background: 'rgba(0, 0, 0, 0.7)',//遮罩层颜色
					          
					    });
					this.$http.get(url,params)
					.then((res) => {
						this.editFormVisible = false;
						this.editLoading = false;
						loading.close()
						this.$message({
							message: '提交成功',
							type: 'success'
						});
						
						this.getUsers();
					});
				
				});
			},
			//删除
			handleDel: function (index, row) {
				this.cancelFormVisible = true;
				this.cancelForm = Object.assign({}, row);
				this.applyCode = row.applyCode
				
			},
			cancelSubmit:function(){
				// this.editFormVisible = true;
				// this.editForm = Object.assign({}, row);
				let _this = this
				this.$confirm('确认取消吗？', '提示', {}).then(() => {
					
					let params ={
						    params: {
							    applyCode: _this.applyCode, 
								causeOfFailure: _this.cancelForm.causeOfFailure
						    }
						}
						let url = this.baseUrl +'/member/withdrawDepositFailure'
						const loading = this.$loading({
						            lock: true,//lock的修改符--默认是false
						            text: 'Loading',//显示在加载图标下方的加载文案
						            
						            background: 'rgba(0, 0, 0, 0.7)',//遮罩层颜色
						          
						    });
	
						this.$http.get(url,params)
						.then((res) => {
							console.log(res)
							
                            loading.close()

							this.$message({
								message: '取消成功',
								type: 'success'
							});
				            this.cancelFormVisible = false;
							this.getUsers();
						});
					});
				
					
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
			//编辑--旧版
			editSubmit: function () {
				let _this = this
				this.$refs.editForm.validate((valid) => {
					if (valid) {
						this.$confirm('确认提交吗？', '提示', {}).then(() => {
							this.editLoading = true;
							//NProgress.start();
							let _params = Object.assign({}, this.editForm);
							
							let params ={
							    params: {
								  applyCode: this.applyCode,
							      payMoney: this.editForm.payMoney  
							    }
							}
							let url = this.baseUrl +'/member/withdrawDepositPass'
							const loading = this.$loading({
							            lock: true,//lock的修改符--默认是false
							            text: 'Loading',//显示在加载图标下方的加载文案
							            
							            background: 'rgba(0, 0, 0, 0.7)',//遮罩层颜色
							          
							    });
							this.$http.get(url,params)
							.then((res) => {
								this.editFormVisible = false;
								this.editLoading = false;
								loading.close()
								this.$message({
									message: '提交成功',
									type: 'success'
								});
								
								this.getUsers();
							});
						});
					}
				});
			},
			cancel:function(){
				this.$refs.cancelForm.validate((valid) => {
					if (valid) {
						this.$confirm('确认提交吗？', '提示', {}).then(() => {
							
								
						    let params ={
								    params: {
									  applyCode: this.applyCode,
								      causeOfFailure: this.cancelForm.causeOfFailure  
								    }
								}
								let url = this.baseUrl +'/member/withdrawDepositFailure'
								this.$http.get(url,params)
								.then((res) => {
								
									this.$message({
										message: '提交成功',
										type: 'success'
									});
									
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