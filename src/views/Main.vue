<template>
	<section>
	     <div style="display: flex; justify-content: space-around;">
			 <div class="topBlock" style="background: #0082E6;">
			 	   <div>总认购数</div>
				   <div style="margin-top: 5px;font-size:16px;">{{item.subscribe}}</div>
				   
			  </div>
			  <div class="topBlock" style="background: #DEA726;">
			  	  <div>总抛售数</div>
			  	  <div style="margin-top: 5px;font-size:16px;">{{item.undersell}}</div>
			   </div>
			   <div class="topBlock" style="background: #13CE66;">
			   	   <div>总配股数</div>
			   	   <div style="margin-top: 5px;font-size:16px;">{{item.rationedShares}}</div>
			    </div>
				<div class="topBlock" style="background: #ff6000;">
					<div>总账户奖金数</div>
					<div style="margin-top: 5px;font-size:16px;">{{item.bonus}}</div> 
				</div>
				<div class="topBlock" style="background: #b17575;">
					<div>总账户资产数</div>
					<div style="margin-top: 5px;font-size:16px;">{{item.asset}}</div> 
				</div>
		 </div>
		
	</section>
</template>

<script>
	let _this
	export default {
		data(){
			return{
				item:''
			}
		},
		
		methods:{
			fetch(){
				let params ={
					params: {
					
					}
				}
				this.listLoading = true;
				let url = this.baseUrl +'/cms_deal/data'
				this.$http.get(url,params)
				.then((res)=>{
					    
						if (res.body.status ==0){
							console.log(res.body)
							_this.item = res.body.data
							
						}else{
							_this.$message(res.body.message)
							return
						}
						
					}).catch(function (error) {
						_this.$message(error)
					});
			}
			
		},
		mounted() {
			_this = this
			this.fetch()
		},
	}

</script>

<style lang="scss">
     .topBlock{
		 height: 100px;
		 width: 150px;
		 display: flex;
		 flex-direction: column;
		 justify-content: center;
		 align-items: center;
		 border-radius: 6px;
		 color: #FFFFFF;
		 font-size: 16px;
		 font-weight: bold;
	 }
</style>