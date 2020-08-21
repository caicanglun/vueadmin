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
				<el-form-item>
					<el-button type="primary" v-if="sysUserName =='admin'" @click="handleAdd">新增</el-button>
				</el-form-item>
				
				
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
			<el-table-column prop="applyCode" label="编号" width="180" sortable>
			</el-table-column>
			<el-table-column prop="userName" label="用户名" width="120" sortable>
			</el-table-column>
			<!-- <el-table-column prop="sex" label="社区等级" width="100" :formatter="formatSex" sortable>
			</el-table-column> -->
			<el-table-column prop="createTime" label="申请时间" width="120" sortable>
			</el-table-column>
			<el-table-column prop="money" label="充值数量" width="100" sortable>
			</el-table-column>
			<el-table-column prop="payMoney" label="支付数量" width="150" sortable>
			</el-table-column>
			<el-table-column prop="remark" label="备注信息" width="150" sortable>
			</el-table-column>
			<el-table-column prop="payWay" label="支付方式" width="100" sortable>
			</el-table-column>
			<el-table-column prop="payTime" label="支付时间" width="100" sortable>
			</el-table-column>
			<!-- <el-table-column prop="provePicture" label="支付证明" width="100" sortable>
			</el-table-column> -->
			<!-- <el-table-column>
				<template scope="scope">
				　　　　<img :src="scope.row.provePicture" width="40" height="40"/>
				</template>
			</el-table-column> -->
			<el-table-column prop="provePicture" label="支付证明" width="100">
				<template scope="scope">
					<div>
						<img :src="scope.row.provePicture" @click="showPreview(scope.row.provePicture)"  width="40px" height="80px"/>
					</div>
					
					
				</template>
				
			</el-table-column>
			
			<el-table-column prop="causeOfFailure" label="失败原因" width="100" sortable>
			</el-table-column>
			<el-table-column prop="applyStatus" label="状态" width="100" sortable>
			</el-table-column>
			
			
			<el-table-column label="操作" width="150" v-if="activeName==1">
				<template scope="scope" v-if="sysUserName =='admin'">
					<el-button size="small"  @click="handleEdit(scope.$index, scope.row)">到账</el-button>
					<!-- <el-button type="danger"  size="small" @click="handleDel(scope.$index, scope.row)">撤销</el-button> -->
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
				<el-form-item label="失败原因" prop="causeOfFailure">
					<el-input v-model="editForm.causeOfFailure" auto-complete="off"></el-input>
				</el-form-item>
				
			</el-form>
			<div slot="footer" class="dialog-footer">
				<el-button @click.native="editFormVisible = false">取消</el-button>
				<el-button type="primary" @click.native="editSubmit" :loading="editLoading">提交</el-button>
			</div>
		</el-dialog>
		<!--图片预览界面-->
		<el-dialog title="大图" v-model="showPreviewVisible" :close-on-click-modal="false">
			<img :src="url" width="300px" height="500px"/>
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
                showPreviewVisible:false, //显示预览图
				editFormVisible: false,//编辑界面是否显示
				editLoading: false,
				editFormRules: {
					// payMoney: [
					// 	{ required: true, message: '请输入到账金额', trigger: 'blur' }
					// ]
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
				pageSize:20,
				causeOfFailure:'',
				imageViewerFlag: false,
				currentIndex: 1,
				url:''

			}
		},
		methods: {
			   showPreview:function(url){
				   this.showPreviewVisible = true
				   this.url = url
			   },
			   
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
					let url = this.baseUrl +'/cms_topup/rechargeList'
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
				this.editFormVisible = true;
				this.editForm = Object.assign({}, row);
					
			},
			//显示编辑界面
			// handleEdit: function (index, row) {
			// 	console.log(row)
			// 	this.editFormVisible = true;
			// 	this.editForm = Object.assign({}, row);
			// 	this.editForm.payMoney = row.money
			// 	this.applyCode = row.applyCode
			// },
			handleEdit: function (index, row) {
				let _this = this
				console.log(row)
				this.applyCode = row.applyCode
				this.$confirm('确认提交吗？', '提示', {}).then(() => {
					this.editLoading = true;

					let params ={
					    params: {
						  applyCode: _this.applyCode,
					      payMoney:   row.money
					    }
					}
					let url = this.baseUrl +'/cms_topup/rechargePass'
					const loading = this.$loading({
					            lock: true,//lock的修改符--默认是false
					            text: 'Loading',//显示在加载图标下方的加载文案
					            background: 'rgba(0, 0, 0, 0.7)',//遮罩层颜色
					          
					    });
						
					this.$http.get(url,params)
					.then((res) => {
						this.editLoading = false;
						loading.close()
						this.$message({
							message: '提交成功',
							type: 'success'
						});
						this.$refs['editForm'].resetFields();
						this.editFormVisible = false;
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
			//编辑
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
								  applyCode: _this.editForm.applyCode,
							      causeOfFailure: _this.editForm.causeOfFailure  
							    }
							}
							let url = this.baseUrl +'/member/rechargeNoPass'
							const loading = this.$loading({
							            lock: true,//lock的修改符--默认是false
							            text: 'Loading',//显示在加载图标下方的加载文案
							            
							            background: 'rgba(0, 0, 0, 0.7)',//遮罩层颜色
							          
							    });
								
							this.$http.get(url,params)
							.then((res) => {
								this.editLoading = false;
								loading.close()
								console.log(res)
								this.$message({
									message: '撤销成功',
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