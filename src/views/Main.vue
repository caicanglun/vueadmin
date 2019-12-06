<template>
	<section>
	     <div style="display: flex; justify-content: space-around;">
			 <div class="topBlock" style="background: #0082E6;">
			 	EOS:{{eos}}
			  </div>
			  <div class="topBlock" style="background: #DEA726;">
			  	能量:{{enger}}
			   </div>
			   <div class="topBlock" style="background: #13CE66;">
			   	通证:{{tongzheng}}
			    </div>
				<div class="topBlock" style="background: #ff6000;">
					激活会员:{{member}}
				</div>
		 </div>
		
	</section>
</template>

<script>
	export default {
		data(){
			return{
				eos: 14554,
				enger: 43545,
				tongzheng: 23343,
				member: 2000
			}
		}
	}

</script>

<style lang="scss">
     .topBlock{
		 height: 100px;
		 width: 150px;
		 display: flex;
		 justify-content: center;
		 align-items: center;
		 border-radius: 6px;
		 color: #FFFFFF;
		 font-size: 16px;
		 font-weight: bold;
	 }
</style>