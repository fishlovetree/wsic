<template>
  <div class="header">
    <span class="title el-icon-menu">
      <span class="text">万胜电力云平台</span>
      <!-- <span class="text">万胜水务云平台</span> -->
      <!-- <span class="text">万胜消防云平台</span> -->
    </span>
    <span class="right pull-right">
      <i class="icon el-icon-user-solid"><span class="use f14">{{username}}</span></i>
      <i class="icon el-icon-circle-close" style="cursor: pointer" title="注销" @click="loginOut()"></i>
    </span>
  </div>
</template>

<script>
import {Logout} from '@/request/api'
import cookie from 'js-cookie'
export default {
  data (){
    return {
      username:''
    }
  },
  created(){
    let userCookie = cookie.get('user'), userSession = sessionStorage.getItem('user')
    if(userCookie != 'undefind' || userCookie != null  ){
      this.username = userSession
    }else if(userSession != 'undefind' || userSession != null ){
      this.username = userCookie
    }
  },
  methods:{
    loginOut(){
      Logout().then(res=>{
        if(res.data.code == 1){
          this.$router.push('/login')
          sessionStorage.removeItem('user')
          sessionStorage.removeItem('aside')
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.header{
  color: #fff;
  font-size: 20px;
  background: rgb(84,92,100);
  height: 60px;
  width: 100%;
  .title{
    line-height: 60px;
    margin-left: 20px;
    .text{
      margin-left: 20px;
    }
  }
  .right{
    line-height: 60px;
    margin-right: 50px;
    .icon{
      margin:0 10px;
      
    }
    .use{
      margin-left: 5px;
    }
  }
  
}
</style>