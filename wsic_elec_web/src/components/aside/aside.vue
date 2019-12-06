<template>
  <div class="aside">
    <el-row class="tac">
      <el-col :span="24">
        <el-menu 
          class="el-menu-vertical-demo"
          background-color="#545c64"
          text-color="#fff"
          :default-active="isActive"
          unique-opened
          router
          active-text-color="#ffd04b"
        >
          <el-menu-item 
            index="/home"
            @click="clickMenu('/home')">
            <i class="el-icon-s-home"></i>
            <span slot="title">首页</span>
          </el-menu-item>
          <el-menu-item 
            v-for="item of menus" 
            :index="item.menuurl" 
            :key="item.menuurl"
            @click="clickMenu(item)">
            <i class="el-icon-s-operation"></i>
            <span slot="title">{{item.text}}</span>
          </el-menu-item>
        </el-menu>
      </el-col>
    </el-row>
  </div>
</template>

<script>
// import localStorage from '@/assets/js/ls.js'
export default {
  data() {
    return {
      menus:[],
      openedTab: [],
      isActive:'/home'
    };
  },
  created(){
    //在页面加载时读取sessionStorage里的状态信息
    // if (sessionStorage.getItem("menu") ) { 
      let menu = sessionStorage.getItem('aside')
      this.menus = JSON.parse(menu)
    // }
  },
  methods: {
    clickMenu(item) {
      // console.log('item',item)
      this.openedTab = this.$store.state.openedTab;
      // tabNum 为当前点击的列表项在openedTab中的index，若不存在则为-1
      let tabNum = this.openedTab.indexOf(item);
      if (tabNum === -1) {
        // 该标签当前没有打开
        // 将componentName加入到已打开标签页state.openedTab数组中
        this.$store.commit("addTab",item);
      } else {
        // 该标签是已经打开过的，需要激活此标签页
        // console.log('changeTab',item.menuurl)
        if(item === '/home'){
          this.$store.commit("changeTab", item);
        }else{
          this.$store.commit("changeTab", item.menuurl);
        }
      }
    }
  },
  watch:{
    // 监听路由的变化侧边栏与标签页对应
    $route(to){
      this.isActive = to.path
    }
  },
}

</script>

<style lang="scss">
.aside {
  background-color: rgb(84, 92, 100);
  height: 100%;
  .over-hide {
    overflow-x: hidden;
  }
  .el-submenu__title {
    border-bottom: 1px solid #8d98a2;
  }
}
.el-menu{
  border-right:0.1px solid transparent!important;
}
</style>