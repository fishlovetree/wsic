<template>
  <div class="index">
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  created(){
    // let  userSession = sessionStorage.getItem('user')
    // if(userSession == "" || userSession == 'undefind' || userSession == null ){
    //   console.log('未登录，跳转到登录页面')
    //   this.$router.push('/login')
    // }
  }
}
</script>

<style>

</style>