<template>
	<section>
		<!--工具条-->
		<el-col :span="24" class="toolbar" style="padding-bottom: 0px;">
			<el-form :inline="true" :model="filters">
				<el-form-item>
					<el-input v-model="filters.name" placeholder="ID号"></el-input>
				</el-form-item>
				<el-form-item>
					<el-select v-model="status" placeholder="请选择">
					    <el-option
					      v-for="item in options"
					      :key="item.value"
					      :label="item.label"
					      :value="item.value">
					    </el-option>
					  </el-select>
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
			<el-table-column prop="dealCode" label="交易编号" width="120" >
			</el-table-column>
			<el-table-column prop="buyOrderCode" label="买单编号" width="140" sortable>
			</el-table-column>
			<el-table-column prop="sellOrderCode" label="卖单编号" width="120" >
			</el-table-column>
			<el-table-column prop="usde" label="交易额" width="120" >
			</el-table-column>
			<el-table-column prop="usdtUnitPrice" label="usdt单价" width="120" sortable>
			</el-table-column>
			<el-table-column prop="proofPicture" label="凭证图片" width="100" sortable>
			</el-table-column>
			<el-table-column prop="dealStatus" label="交易状态" width="100" sortable>
			</el-table-column>
			<!-- <el-table-column prop="sex" label="社区等级" width="100" :formatter="formatSex" sortable>
			</el-table-column> -->
			<el-table-column prop="buyUserCode" label="买家ID" width="100" sortable>
			</el-table-column>
			<el-table-column prop="sellUserCode" label="卖家ID" width="100" sortable>
			</el-table-column>
			<el-table-column prop="buyPhone" label="买家电话" width="120" sortable>
			</el-table-column>
			<el-table-column prop="sellPhone" label="卖家电话" width="100">
			</el-table-column>
			<el-table-column prop="dealTime" label="完成时间" width="100" sortable>
			</el-table-column>
			<el-table-column prop="createTime" label="创建时间" width="100">
			</el-table-column>

			<el-table-column label="操作" width="200">
				<template scope="scope">
					<el-button size="small" @click="handleEdit(scope.$index, scope.row)">強行交易</el-button> 
					<!-- <el-button type="danger" size="small" @click="handleDel(scope.$index, scope.row)">团队</el-button> -->
					<!-- <el-button type="warning" size="small" @click="handleJump(scope.$index, scope.row)">登录</el-button> -->
				</template>
			</el-table-column>
		</el-table>

		<!--工具条
		<el-col :span="24" class="toolbar">
			<!-- <el-button type="danger" @click="batchRemove" :disabled="this.sels.length===0">批量删除</el-button>
			<el-pagination layout="prev, pager, next" @current-change="handleCurrentChange" :page-size="20" :total="total" style="float:right;">
			</el-pagination>
		</el-col>

		<!--编辑界面
	

		<!--新增界面-->
		
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
                status:'',
				options: [
					{
					  value: '',
					  label: '全部'
					}, 
					{
					  value: '0',
					  label: '等待交易'
					}, 
					{
					  value: '1',
					  label: '已上传凭证'
					},
					{
					  value: '2',
					  label: '完成'
					},
					{
					  value: '3',
					  label: '取消'
					}	
					],
				
				
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
							status: _this.status,
					        pageNum:_this.pageNum,
					        pageSize:_this.pageSize 
					    }
					}
					let url = this.baseUrl +'/cms_udeal/udeal_list'
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
				let _this = this
				this.$confirm('确认强行交易该订单吗?', '提示', {
					type: 'warning'
				}).then(() => {
					
					let params ={
					    params: {
					      dealCode: row.dealCode 
					    }
					}
					
					let url = this.baseUrl +'/cms_udeal/finish'
					this.$http.get(url,params)
					.then((res)=>{
					       if (res.body.status==0){
					       	this.$message("交易成功")
					       }
						  _this.getUsers()
					    }).catch(function (error) {
					        console.log(error)
					    });
					
				}).catch(() => {
				
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
				let _this  = this
				this.$refs.editForm.validate((valid) => {
					if (valid) {
						this.$confirm('确认提交吗？', '提示', {}).then(() => {
							this.editLoading = true;
							//NProgress.start();
							let para = Object.assign({}, _this.editForm);
							let params ={
                                params: {
									   password: _this.editForm.password ||'',
									   secondaryPassword: _this.editForm.secondaryPassword||'',
									   eosWalletCode: _this.editForm.eosWalletCode ||'',
									   memoRemarkCode: _this.editForm. memoRemarkCode||'',
									   userCode:_this.editForm.userCode||'',
									   mail: _this.editForm.mail||'',					
									   userLevel:_this.editForm.userLevelCode||'',			    
									   teamLevel : _this.editForm.teamLevelCode||'',
									   isServiceCenter:_this.editForm.isServiceCenterCode ||'',			
									   nickname: _this.editForm.nickname||'',				 
									   isLock : _this.editForm.isLock==true?1:0	,
									   weekReceive: _this.editForm.weekReceive
							
								}
							}
							
							console.log(para)
							let url = this.baseUrl +'/member/memberUpdate'
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