<template>
	<el-form  v-if="sysUserName =='admin'" ref="form" :model="form" label-width="80px" @submit.prevent="onSubmit" style="margin:20px;width:60%;min-width:600px;">
		<el-form-item label="标题">
			<el-input v-model="form.title" placeholder="请输入标题" ></el-input>
		</el-form-item>
		<el-form-item label="内容">
			<quill-editor ref="text" v-model="form.content" class="myQuillEditor" :options="editorOption" />
		</el-form-item>
		
	
		<el-form-item>
		    <el-button type="primary" @click="onSubmit">确认保存</el-button>
		 </el-form-item>
	</el-form>
	
</template>

<script>
	import { quillEditor } from 'vue-quill-editor'
	let _this
	export default {
		components:{
			quillEditor
		},
		data() {
			return {
				sysUserName:"",
				form: {
					title: '',
					content:'', 		//股票数量
				},
				editorOption: {}
				
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
			this.getCurrentPrice()
		},
		methods: {
			getCurrentPrice(){
				let params ={
					params: {
					
					}
				}
				this.listLoading = true;
				let url = this.baseUrl +'/cms_base/increase'
				this.$http.get(url,params)
				.then((res)=>{
					    
						if (res.body.status ==0){
							console.log(res.body)
							_this.form.count = res.body.data.msg
							
						}else{
							_this.$message(res.body.message)
							return
						}
						
					}).catch(function (error) {
						_this.$message(error)
					});
			},
			reset:function(){
				this.$refs['form'].resetFields()
			},
			onSubmit() {
				let _this = this
				this.$confirm('确认提交吗？', '提示', {}).then(() => {
					let params ={
						params: {
							title: this.form.title,
							content: this.form.content

						}
					}
					this.listLoading = true;
					let url = this.baseUrl +'/cms_base/ann_add'
					this.$http.get(url,params)
					.then((res)=>{
						    
							if (res.body.status ==0){
								console.log(res.body)
								_this.$message("提交成功！")

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
