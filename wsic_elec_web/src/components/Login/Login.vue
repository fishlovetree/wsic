<template>
  <div class="login">
    <div class="bg">
      <!-- <p class="title">万 胜 水 务 云 平 台</p> -->
      <div class="drag"></div>
    </div>
    <div class="mask">
      <h1 class="f20 text">用户登录</h1>
      <div class="right">
        <el-form ref="form" :model="form" label-width="100px">
          <el-form-item required label="用户名">
            <el-input clearable v-model="form.username" placeholder="请输入用户名">
            </el-input>
          </el-form-item>
          <el-form-item required label="密码">
            <el-input clearable type="password" v-model="form.password" @keyup.enter.native="login" placeholder="请输入密码"></el-input>
          </el-form-item>
          <!-- <el-form-item label="验证码" label-width="80px">
            <div class="checkIpt">
              <el-input v-model="form.seccode"></el-input>
            </div>
            <div class="checkCode">
              <span>{{Code}}</span>
            </div>
          </el-form-item> -->
          <el-form-item>
            <el-button size="medium" v-on:keyup.13.native="submit" round  type="primary" @click="login()" style="margin-right:47px">登录</el-button>
            <!-- <el-checkbox v-model="checked" class="auto">7天内自动登录</el-checkbox> -->
          </el-form-item>
        </el-form>
      </div>
    </div>
  </div>
</template>

<script>
import { Login } from '@/request/api'
import cookie from 'js-cookie'

export default {
  data() {
    return{
      form:{
        username:'',
        password:''
      },
      Code:"",
      checked: false
    }
  },
  mounted () {
    // this.createCode();
    cookie.get()
  },
  created(){
    this.form.username = localStorage.getItem('user')
  },
  methods:{
    login(){
      let data = {
        username:this.form.username,
        password:this.form.password
      }
      console.log('data',data)
      if(this.checked == true){
        // 勾选7天免登录将信息存到cookie7天
        cookie.set('user',this.form.username,7)
        sessionStorage.setItem('user',this.form.username)
      }else{
        // 不勾选则清空cookie
        cookie.remove('user')
        // 在不勾选的情况下将数据存储到sessionStorage里面
        sessionStorage.setItem('user',this.form.username)
        localStorage.setItem('user',this.form.username)
        // // 清空登录信息
        // this.form.username = ''
        // this.form.password = ''
      }
      Login(data).then(res => {
        if(res.data.code == 1){
          this.$router.push('/home')
          this.data = res.data.data.menujson
          sessionStorage.setItem('aside',JSON.stringify(res.data.data.menujson))
          // 将菜单栏存储到vuex里面
          // this.$store.commit('menus',res.data.data.menujson)
          // 将token存储在storage里
          // console.log(res.data.data)
          // localStorage.setItem('token', res.data.data.sessionid)
        }else {
          this.$message.error(res.data.msg)
        }
      }).catch((error)=>{
        console.log(error)
      })
    },
    // 随机验证码
    createCode() {
      let code = "";
      let codeLength = 4; //验证码的长度  
      let random = new Array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R',
        'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'); //随机数  
      for(let i = 0; i < codeLength; i++) { //循环操作  
        let index = Math.floor(Math.random() * 36); //取得随机数的索引（0~35）  
        code += random[index]; //根据索引取得随机数加到code上  
      }
      // console.log(code)
      this.Code = code; //把code值赋给验证码  
      // console.log(this.Code)
    },
  }
}
</script>

<style lang="scss">
  @import './elec.scss';//电力
  // @import './water.scss';//水务
  // @import './fire.scss';//消防
</style>