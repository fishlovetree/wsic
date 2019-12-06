<template>
  <div class="right">
    <div class="content">
      <div class="title">电表告警</div>
      <el-card class="box-card">
        <div slot="header" class="clearfix">
          <span>01电表</span>
          <el-button style="float: right; padding: 0;color:#e6a23c" type="text">告警</el-button>
        </div>
        <div class="text item">温度过高</div>
      </el-card>
    </div>
  </div>
</template>

<script>
// import bus from '@/bus.js'
export default {
  data() {
    return {
      // value:true
    };
  },
  methods: {
    collapse(){
      this.collapsed=!this.collapsed;
      var menuWidth = document.getElementById('menuClass');
      if(menuWidth.offsetWidth===0){
        menuWidth.style.width = "200px"
      }
    }
  }
};
</script>

<style lang="scss" scoped>
  .right{
    width: 100%;
    height: 90%;
    margin-top: 40px;
    border-top: 1px solid #E4E7ED;
    .content{
      height: 600px;
      margin-top: 15px;
      border-left: 1px solid #999;
      .title{
        font-size: 16px;
        padding: 5px 10px; 
      }
      .box-card{
        margin: 10px;
      }
    }
  }
</style>