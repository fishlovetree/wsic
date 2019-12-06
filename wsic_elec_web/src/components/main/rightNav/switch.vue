<template>
  <div class="switch">
    <div class="open">
      <el-switch
        v-model="value"
      >
      </el-switch>
    </div>
      <rightNav v-show="value"></rightNav>
    </div>
</template>

<script>
import rightNav from './rightNav'
export default {
  components:{
    rightNav
  },
  data() {
    return {
      value:true
    }
  }
}
</script>

<style lang="scss">
.switch{
  .open{
      padding-left: 160px;
      margin-top: 16px;
      padding-bottom: 4px;
      border-bottom: 1px solid #E4E7ED;
  }
}
</style>