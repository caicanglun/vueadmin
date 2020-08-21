<template>
	<section>
		<!--工具条-->
		<el-col :span="24" class="toolbar" style="padding-bottom: 0px;">
			<el-form :inline="true" :model="filters">
				<el-form-item>
					<el-input v-model="filters.name" placeholder="留言"></el-input>
				</el-form-item>
				<el-form-item>
					<el-button type="primary" v-on:click="getUsers">查询</el-button>
				</el-form-item>
			<!-- 	<el-form-item>
					<el-button type="primary" @click="handleAdd">新增</el-button>
				</el-form-item> -->
			</el-form>
		</el-col>

		<!--列表-->
		<el-table :data="users" highlight-current-row v-loading="listLoading" @selection-change="selsChange" style="width: 100%;">
		
			<el-table-column prop="messageCode" label="编号" width="200" sortable>
			</el-table-column>
		
			<el-table-column prop="userCode" label="用户ID" width="100" sortable>
			</el-table-column>
				<el-table-column prop="userName" label="用户名" width="100" sortable>
			</el-table-column>
			<el-table-column prop="createTime" label="时间" width="200" sortable>
			</el-table-column>
			
			<!-- <el-table-column prop="sex" label="社区等级" width="100" :formatter="formatSex" sortable>
			</el-table-column> -->
			<el-table-column prop="userTitle" label="标题" width="150" sortable>
			</el-table-column>
		
			<el-table-column prop="userContent" label="留言内容" width="400" sortable>
			</el-table-column>
			<el-table-column prop="messageStatus" :formatter="formatSex" label="状态" width="100" sortable>
			</el-table-column>
			
			
			<el-table-column label="操作" width="150">
				<template scope="scope">
					<el-button type="danger" size="small" @click="handleEdit(scope.$index, scope.row)">查看回复</el-button>
					<!-- <el-button type="danger" size="small" @click="handleDel(scope.$index, scope.row)">删除</el-button> -->
				</template>
			</el-table-column>
		</el-table>

		<!--工具条-->
		<el-col :span="24" class="toolbar">
			
			<el-pagination layout="prev, pager, next" @current-change="handleCurrentChange" :page-size="20" :total="total" style="float:right;">
			</el-pagination>
		</el-col>

		<!--编辑界面-->
		<el-dialog title="回复" v-model="editFormVisible" :close-on-click-modal="false">
			
			<el-form :model="editForm" label-width="80px" :rules="editFormRules" ref="editForm">
				<el-row style="border:1px solid #999999;margin-top: 30px;">
					
					<el-col style="border-bottom:1px solid #999999;height:25px;line-height:1.7">
						会员留言标题：{{editForm.userTitle}}
					</el-col>
					<el-col>
						会员留言内容：{{editForm.userContent}}
					</el-col>
				</el-row>
				
				<el-row style="border:1px solid #999999;margin-top: 30px;">
					
					<el-col style="border-bottom:1px solid #999999;height:25px;line-height:1.7">
						系统回复标题：{{editForm.systemTitle}}
					</el-col>
					<el-col style="font-size:15px;">
					  系统回复内容：{{editForm.systemContent}}
					</el-col>
				</el-row>
				
				
				
				<!-- <el-form-item label="标题" prop="systemTitle">
					<el-input v-model="editForm.systemTitle" auto-complete="off"></el-input>
				</el-form-item>
				
				<el-form-item label="内容">
					<el-input type="textarea" v-model="editForm.systemContent"></el-input>
				</el-form-item> -->
			</el-form>
			<div slot="footer" class="dialog-footer">
				<el-button @click.native="editFormVisible = false">取消</el-button>
				<!-- <el-button type="primary" @click.native="editSubmit" :loading="editLoading">提交</el-button> -->
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
					systemTitle: [
						{ required: true, message: '请输入标题', trigger: 'blur' }
					]
				},
				//编辑界面数据
				editForm: {
					messageCode:'',
					systemTitle:'',
					systemContent:''
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
				pageSize:20

			}
		},
		methods: {
			//性别显示转换
			formatSex: function (row, column) {
				return row.messageStatus == 1 ? '未回复' : row.messageStatus == 2 ? '已回复' : '未知';
			},
			handleCurrentChange(val) {
				this.page = val;
				this.getUsers();
			},
			//获取用户列表
			getUsers: function () {
				let _this = this
				let params ={
				    params: {
				        messageStatus:2,
				        pageNum:_this.pageNum,
				        pageSize:_this.pageSize 
				    }
				}
				
				let url = this.baseUrl +'/cms_message/list'
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
				this.$confirm('确认删除该记录吗?', '提示', {
					type: 'warning'
				}).then(() => {
					this.listLoading = true;
					//NProgress.start();
					let para = { id: row.id };
					removeUser(para).then((res) => {
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
									   messageCode: _this.editForm.messageCode,
									   title: _this.editForm.systemTitle,		
									   content: _this.editForm.systemContent

								}
							}
							
							console.log(para)
							let url = this.baseUrl +'/cms_message/add'
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
		}
	}

</script>

<style scoped>

</style>
