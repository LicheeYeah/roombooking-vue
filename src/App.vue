<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App',
	data(){
		return{
			isReload: true
		}
	},
	provide(){
		 return {
			 reload:this.reload
		 }
	},
	methods: { //组件的中的方法，可以在组件中使用，包括在标签中
			reload() {
				this.isReload = false;
				this.$nextTick(function() {
					return this.isReload = true;
				})
			}
		
		}
}
</script>

<style>

</style>
