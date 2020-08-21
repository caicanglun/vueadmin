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
				<el-form-item v-if="isShow">
					<el-button type="primary" @click="handleAdd">添加矿机</el-button>
				</el-form-item>
			</el-form>
		</el-col>

		<!--列表-->
		<el-table :data="users" highlight-current-row v-loading="listLoading" @selection-change="selsChange" style="width: 100%;">
			<el-table-column prop="userMachineCode" label="编号" width="200" sortable>
		</el-table-column>
		<el-table-column prop="userName" label="用户名" width="120" sortable>
		</el-table-column>
		
		<el-table-column prop="machineLevel" label="类型" width="120" sortable>
		</el-table-column>
		<el-table-column prop="machineCapacity" label="产量/小时" width="100" sortable>
		</el-table-column>
		<el-table-column prop="runTime" label="运行小时" width="100" sortable>
		</el-table-column>
		<el-table-column prop="alreadyReceived" label="已领取" width="100" sortable>
		</el-table-column>
		<el-table-column prop="machineStatus" label="状态" width="100" sortable>
		</el-table-column>
		
		<el-table-column label="操作" width="150">
			<template scope="scope">
				
				<el-button type="danger" size="small" @click="handleDel(scope.$index, scope.row)">删除</el-button>
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
				<el-form-item label="姓名" prop="name">
					<el-input v-model="editForm.name" auto-complete="off"></el-input>
				</el-form-item>
				<el-form-item label="性别">
					<el-radio-group v-model="editForm.sex">
						<el-radio class="radio" :label="1">男</el-radio>
						<el-radio class="radio" :label="0">女</el-radio>
					</el-radio-group>
				</el-form-item>
				<el-form-item label="年龄">
					<el-input-number v-model="editForm.age" :min="0" :max="200"></el-input-number>
				</el-form-item>
				<el-form-item label="生日">
					<el-date-picker type="date" placeholder="选择日期" v-model="editForm.birth"></el-date-picker>
				</el-form-item>
				<el-form-item label="地址">
					<el-input type="textarea" v-model="editForm.addr"></el-input>
				</el-form-item>
			</el-form>
			<div slot="footer" class="dialog-footer">
				<el-button @click.native="editFormVisible = false">取消</el-button>
				<el-button type="primary" @click.native="editSubmit" :loading="editLoading">提交</el-button>
			</div>
		</el-dialog>

		<!--新增界面-->
		<el-dialog title="新增" v-model="addFormVisible" :close-on-click-modal="false">
			<el-form :model="addForm" label-width="80px" :rules="addFormRules" ref="addForm">
				<el-form-item label="会员编号" prop="userCode">
					<el-input v-model="addForm.userCode" auto-complete="off"></el-input>
				</el-form-item>
				
			<el-form-item label="矿机级别">
				<el-select v-model="addForm.machineCode" placeholder="请选择">
				    <el-option
				      v-for="item in options"
				      :key="item.id"
				      :label="item.label"
				      :value="item.id">
				    </el-option>
				  </el-select>
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
				isShow:false,
				sysUserName:"",
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
					id: 0,
					name: '',
					sex: -1,
					age: 0,
					birth: '',
					addr: ''
				},

				addFormVisible: false,//新增界面是否显示
				addLoading: false,
				addFormRules: {
					
				},
				//新增界面数据
				addForm: {
					userCode:''	,		//用户编码
					machineCode:''		//矿机编码

				},
				pageNum: 1,
				pageSize:20

			}
		},
		methods: {
		
			mineMachineList:function(){
				let _this = this
				let params ={
				    params: {
				       
				    }
				}
				let url = this.baseUrl +'/member/mineMachineList'
				this.$http.get(url,params)
				.then((res)=>{
				        console.log(res.body)
						_this.options= res.body.data.list
						
				    }).catch(function (error) {
				        console.log(error)
				    });
				
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
					        pageNum:_this.pageNum,
					        pageSize:_this.pageSize 
					    }
					}
					let url = this.baseUrl +'/member/machineList'
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
				let _this = this
				console.log(index,row)
				this.$confirm('确认删除该矿机吗?', '提示', {
						type: 'warning'
					}).then(() => {
						this.listLoading = true;

						let params ={
						    params: {
						        userMachineCode:row.userMachineCode
						    }
						}
						let url = this.baseUrl +'/member/machineClose'
						const loading = this.$loading({
								lock: true,//lock的修改符--默认是false
								text: 'Loading',//显示在加载图标下方的加载文案
								background: 'rgba(0, 0, 0, 0.7)',//遮罩层颜色
						          
						    });
						this.$http.get(url,params)
						.then((res)=>{
							loading.close()
							this.listLoading = false
						    _this.getUsers()
						    }).catch(function (error) {
						        console.log(error)
						    });
						});
					
			},
			//显示编辑界面
			handleEdit: function (index, row) {
				this.editFormVisible = true;
				this.editForm = Object.assign({}, row);
			},
			//显示新增界面
			handleAdd: function () {
				this.addFormVisible = true;
				this.addForm = {
					userCode:'',		//用户编码
					machineCode:''		//矿机编码

				};
			},
			//编辑
			editSubmit: function () {
				this.$refs.editForm.validate((valid) => {
					if (valid) {
						this.$confirm('确认提交吗？', '提示', {}).then(() => {
							this.editLoading = true;
							//NProgress.start();
							let para = Object.assign({}, this.editForm);
							para.birth = (!para.birth || para.birth == '') ? '' : util.formatDate.format(new Date(para.birth), 'yyyy-MM-dd');
							editUser(para).then((res) => {
								this.editLoading = false;
								//NProgress.done();
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
				let _this = this
				this.$refs.addForm.validate((valid) => {
					if (valid) {

						this.$confirm('确认添加矿机吗?', '提示', {
								type: 'warning'
							}).then(() => {
								this.listLoading = true;
						        let para = Object.assign({}, this.addForm);
								const loading = this.$loading({
								            lock: true,//lock的修改符--默认是false
								            text: 'Loading',//显示在加载图标下方的加载文案
								            
								            background: 'rgba(0, 0, 0, 0.7)',//遮罩层颜色
								          
								    });
								let params ={
								    params: {
										userCode: _this.addForm.userCode,
								        machineCode: _this.addForm.machineCode
								    }
								}
								let url = this.baseUrl +'/member/machineGive'
								
								this.$http.get(url,params)
								.then((res)=>{
									this.listLoading = false;
									loading.close()
									if (res.data.status == 0){
										this.$refs['addForm'].resetFields();
										this.addFormVisible = false;
										this.$message({
											message: '提交成功',
											type: 'success'
										});
									}
									console.log(res)
									
								    _this.getUsers()
								    }).catch(function (error) {
								        console.log(error)
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
			this.mineMachineList()
			var user = sessionStorage.getItem('user');
			// console.log(user)
			if (user) {
				user = JSON.parse(user);
				if (user=='admin'){
					this.isShow = true
				}
				this.sysUserName = user|| '';
				console.log(this.sysUserName)
				console.log(this.isShow)
			}
		}
	}

</script>

<style scoped>

</style>