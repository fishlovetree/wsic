<template>
  <div id="app">
    <!-- 登录页面 -->
    <router-view v-if="!$route.meta.keepAlive"></router-view>
    <el-container v-if="$route.meta.keepAlive">
      <el-header>
        <!-- <keep-alive> -->
          <adminheader></adminheader>
        <!-- </keep-alive> -->
      </el-header>
      <el-container class="cont">
        <el-aside width="200px" class="aside">
          <!-- <keep-alive> -->
            <navAside></navAside>
          <!-- </keep-alive> -->
        </el-aside>
        <el-main class="main">
            <!-- <keep-alive> -->
              <adminMain></adminMain>
              <router-view></router-view>
            <!-- </keep-alive> -->
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import adminheader from "@/components/Header/header.vue";
import navAside from "@/components/aside/aside.vue";
import adminMain from "@/components/main/main.vue";

export default {
  name: "app",
  components: {
    adminheader,
    navAside,
    adminMain
  },
  created(){ 
    // let session = sessionStorage.getItem('username')
    // if(session ==null || session == undefined){
    //   if(this.$router.path !== '/login'){
    //       this.$router.replace('/login')
    //   }
    // }else{
      // if(this.$router.path !== '/home'){
      //     this.$router.replace('/home')
      // }
    // }
    
  }
};
</script>

<style lang="scss">
.el-container.is-vertical{
  height: 100%;
}
html,body,#app{
  height: 100%;
  .cont{
    height: 100%;
    .aside{
      background-color: rgb(84, 92, 100);
    }
    .el-main{
      padding: 20px 20px 0 20px;
    }
  }
}
.el-header{
  padding:0 !important;
}
.main{
  width: 100%;
  background: #fff;
  .left-box{
    width: 85%;
    display: inline-block;
    vertical-align: top;
  }
  .right-box {
    width: 15%;
    display: inline-block;
    .open{
      position: fixed;
      right: 15px;
      top: 80px;
      margin-top: 16px;
      padding-bottom: 4px;
    }
  }
}
</style>
