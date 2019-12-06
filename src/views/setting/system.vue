<template>
	<el-form ref="form" :model="form" label-width="80px" @submit.prevent="onSubmit" style="margin:20px;width:60%;min-width:600px;">
		<el-form-item label="EOS钱包">
			<el-input v-model="form.name"></el-input>
		</el-form-item>
		
		
	
			<el-row>
			  <el-col :span="12">
				  <el-form-item label="充值开关">
				  	<el-switch on-text="" off-text="" v-model="form.delivery"></el-switch>
				  </el-form-item>
			  </el-col>
			  <el-col :span="12">
				  <el-form-item label="提币开关">
				  	<el-switch on-text="" off-text="" v-model="form.delivery"></el-switch>
				  </el-form-item>
			  </el-col>
			</el-row>
			
			
			<el-row>
			  <el-col :span="12">
				  <el-form-item label="上转下">
				  	<el-switch on-text="" off-text="" v-model="form.delivery"></el-switch>
				  </el-form-item>
			  </el-col>
			  <el-col :span="12">
				  <el-form-item label="下转上">
				  	<el-switch on-text="" off-text="" v-model="form.delivery"></el-switch>
				  </el-form-item>
			  </el-col>
			</el-row>
		
		
		
		<el-form-item label="左右互转">
			<el-switch on-text="" off-text="" v-model="form.delivery"></el-switch>
		</el-form-item>
		<el-form-item label="静态7/3">
			<el-input v-model="form.name"></el-input>
		</el-form-item>
		<el-form-item label="动态7/3">
			<el-input v-model="form.name"></el-input>
		</el-form-item>
		
		
		<el-form-item>
			<el-button type="primary">保存</el-button>
			<el-button @click.native.prevent>取消</el-button>
		</el-form-item>
	</el-form>
</template>

<script>
	export default {
		data() {
			return {
				form: {
					name: '',
					region: '',
					date1: '',
					date2: '',
					delivery: false,
					type: [],
					resource: '',
					desc: ''
				}
			}
		},
		methods: {
			onSubmit() {
				console.log('submit!');
			}
		}
	}

</script>
