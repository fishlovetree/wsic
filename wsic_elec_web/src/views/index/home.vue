<template>
  <div class="home">
    <div class="content">
      <el-card class="box-card" shadow="always">
        <el-col :span="8">
          <div class="user">
            <p class="text">{{user}}</p>
            <el-button type="text" @click="changePwd()">修改密码</el-button>
            <el-button type="text" @click="UserMsg()">账号详情</el-button>
          </div>
        </el-col>
        <el-col :span="6">
          <div class="userid">
            <div class="box">
              <p class="f16">用户ID</p>
              <p class="f20 main">{{userid}}</p>
            </div>
          </div>
        </el-col>
        <el-col :span="8">
          <div class="api">
            <p class="f16">APIKEY</p>
            <div class="f20 main">{{apikey}}</div>
          </div>
        </el-col>
      </el-card>
      <el-col :span="8">
        <el-card class="box-card f20 list" shadow="hover" @click.native="MeterView">
          <el-col :span="12">
            <div class="left-box">
              <!-- <i class="iconfont font">&#xec67;</i>
              <h1>水表</h1> -->
              <i class="iconfont font">&#xe600;</i>
              <h1>电表</h1>
              <!-- <i class="iconfont font">&#xe641;</i>
              <h1>消防设备</h1> -->
            </div>
          </el-col>
          <el-col :span="12">
            <div class="right-box">
              <p class="f18">总数</p>
              <span class="f12" v-show="meter==''">暂无数据</span>
              <p class="f20 text">{{meter}}</p>
              <!-- <p class="f20 text">{{equipment}}</p> -->
            </div>
          </el-col>
        </el-card>
      </el-col>
      <el-col :span="8">
        <el-card class="box-card f20 list" shadow="hover" @click.native="ConcentView">
          <el-col :span="12">
            <div class="left-box">
              <i class="iconfont font">&#xe61a;</i>
              <h1>集中器数量</h1>
            </div>
          </el-col>
          <el-col :span="12">
            <div class="right-box">
              <p class="f18">总数</p>
              <span class="f12" v-show="concentrator==''">暂无数据</span>
              <p class="f16 text">{{concentrator}}</p>
            </div>
          </el-col>
        </el-card>
      </el-col>
    </div>
    <!-- 修改密码抽屉弹框 -->
    <el-drawer
      title="修改密码"
      direction="rtl"
      :visible.sync="drawer">
      <el-form :model="formPwd" :rules="rules" label-width="100px">
        <el-form-item label="用户名:">
          <el-col :span="11">
            <el-input v-model="formPwd.username" disabled></el-input>
          </el-col>
        </el-form-item>
        <el-form-item label="原密码" required>
          <el-col :span="11">
            <el-input type="password" v-model="formPwd.password" @blur ="checkPwd(formPwd.password)" autocomplete="off"></el-input>
            <span v-show="oldPwd" class="f12 oldText">{{msg}}</span>
          </el-col>
        </el-form-item>
        <el-form-item label="新密码" prop="pass" required>
          <el-col :span="11">
            <el-input type="password" v-model="formPwd.pass" autocomplete="off"></el-input>
          </el-col>
        </el-form-item>
        <el-form-item label="确认新密码" prop="checkPass" required>
          <el-col :span="11">
            <el-input type="password" v-model="formPwd.checkPass" autocomplete="off"></el-input>
          </el-col>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" style="margin-left:120px" size="mini" @click="submitForm()">提交</el-button>
        </el-form-item>
      </el-form>
    </el-drawer>
    <!-- 账号详情抽屉弹框 -->
    <el-drawer
      title="账号详情"
      direction="rtl"
      :visible.sync="drawerUser">
      <el-form :model="form" :rules="rules" label-width="100px">
        <el-form-item label="用户名:">
          <el-col :span="18">
            <el-input v-model="form.username" disabled></el-input>
          </el-col>
        </el-form-item>
        <el-form-item label="用户Id:">
          <el-col :span="18">
            <el-input v-model="form.id" disabled></el-input>
          </el-col>
        </el-form-item>
        <el-form-item label="ApiKey:">
          <el-col :span="18">
            <el-input v-model="form.apikey" disabled></el-input>
          </el-col>
        </el-form-item>
        <el-form-item label="创建时间:">
          <el-col :span="18">
            <el-input v-model="form.intime" disabled></el-input>
          </el-col>
        </el-form-item>
        <el-form-item label="账号类型:">
          <el-col :span="18">
            <el-select v-model="form.usertype" disabled>
              <el-option label="后台账号" :value="0"></el-option>
              <el-option label="前台账号" :value="1"></el-option>
            </el-select>
          </el-col>
        </el-form-item>
        <el-form-item label="账号级别:">
          <el-col :span="18">
            <el-select v-model="form.userLevel" disabled>
              <el-option label="超级账号" :value="0"></el-option>
              <el-option label="普通账号" :value="1"></el-option>
            </el-select>
          </el-col>
        </el-form-item>
        <el-form-item label="备注:">
          <el-col :span="18">
            <el-input v-model="form.remark" disabled></el-input>
          </el-col>
        </el-form-item>
      </el-form>
    </el-drawer>
  </div>
</template>

<script>
import {getUserByName,checkPassword, getDeviceCount, getUpdatePwd} from '@/request/api'
export default {
  data(){
    var validatePass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入新密码'));
      } else {
        console.log('this.formPwd.pasword',this.form.password)
        console.log('value',value)
        if(value === this.formPwd.password){
          callback(new Error('输入的密码与原密码相同，请重新输入'));
        }
        // if (this.formPwd.checkPass !== '') {
        //   this.$refs.formPwd.validateField('checkPass');
        // }
        callback();
      }
    };
    var validatePass2 = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请再次输入新密码'));
      } else if (value !== this.formPwd.pass) {
        console.log('value',value)
        console.log('this.formPwd.pass',this.formPwd.pass)
        callback(new Error('两次输入密码不一致!'));
      } else {
        callback();
      }
    };
    return {
      form:{
        username:'',
        id:'',
        userLevel:'',
        intime:'',
        apikey:'',
        remark:'',
      },
      formPwd:{},
      user:'',
      userid:'',
      oldPwd:false,
      msg:'',
      drawer: false,
      drawerUser:false,
      apikey:'',
      concentrator:'',
      meter:'',
      equipment:'',
      rules:{
        pass: [
          { validator: validatePass, trigger: 'blur' }
        ],
        checkPass: [
          { validator: validatePass2, trigger: 'blur' }
        ],
      },
    }
  },
  created(){
    let  userSession = sessionStorage.getItem('user')
    this.user = userSession
    this.formPwd.username = userSession
    if(userSession == "" || userSession == 'undefind' || userSession == null ){
      console.log('未登录，跳转到登录页面')
      this.$router.push('/login')
    }
    this.getuser()
  },
  methods:{
    // 修改密码
    checkPwd(event){
      let data = {
        userId:this.userid,
        pwd:event
      }
      checkPassword(data).then(res=>{
        if(res.data.code != 1){
          this.oldPwd = true
          if(event == undefined){
            this.msg = '请输入原密码'
          }else{
            this.msg = '输入的原密码有误,请核对！'
          }
        }else {
          this.oldPwd = false
        }
      })
    },
    changePwd(){
      this.drawer = true
      // this.formPwd.password = ''
    },
    submitForm() {
      if(this.formPwd.password===undefined||this.formPwd.pass===undefined){
        this.$message.error('请检查原密码或新密码是否输入')
      }else{
        let data = {
          userId:this.userid,
          confirmPwd:this.formPwd.checkPass,
          newPwd:this.formPwd.pass,
          oldPwd:this.formPwd.password
        }
        getUpdatePwd(data).then(res=>{
          if(res.data.code == 1){
            this.$message.success('修改成功')
            this.drawer = false
            this.$router.push('/login')
            sessionStorage.removeItem('user')
          }else {
            this.$message.error('修改失败')
          }
        })
      }
    },
    // 账号详情
    UserMsg(){
      this.drawerUser = true
      this.getuser()
    },
    // 电表调转
    MeterView(){
      let route = {
        text:'电表管理',
        menuurl:'/meter/view'
      }
      this.$router.push(route.menuurl)
      this.$store.commit("addTab",route);
    },
    // 集中器跳转
    ConcentView(){
      let route = {
        text:'集中器管理',
        menuurl:'/concentrator/view'
      }
      this.$router.push(route.menuurl)
      this.$store.commit("addTab",route);
    },
    getuser(){
      let data = {
        userName:this.user
      }
      getUserByName(data).then(res=>{
        this.form = res.data.data
        sessionStorage.setItem('usertype',res.data.data.usertype)
        // if(res.data.data.remark==null){
        //   res.data.data.remark = '暂无数据'
        // }
        if(res.data.code == 1){
          this.userid = res.data.data.id
          this.apikey = res.data.data.apikey
          this.totalNum()
        }
      })
    },
    totalNum(){
      let data ={
        apikey:this.apikey
      }
      getDeviceCount(data).then(res=>{
        this.concentrator = res.data.data.concentrator
        this.meter = res.data.data.meter
        this.equipment = res.data.data.equipment
      })
    }
  }
}
</script>

<style lang="scss">
.oldText{
  color: #F56C6C;
  line-height: 1;
  padding-top: 4px;
  position: absolute;
  top: 100%;
  left: 0;
}
.home{
  .content{
    // height: 550px;
    margin-top: 15px;
    height: 100%;
    .title{
      font-size: 16px;
      padding: 5px 10px; 
    }
    .list{
      background-color: #F2F6FC;
    }
    .box-card{
      margin:10px;
      .item{
        font-size: 20px;
        color: orange
      }
      .user{
        display: inline-block;
        margin-right: 50px;
        // width: 240px;
        // border: 1px solid #000;
        vertical-align:top;
        .text{
          font-size: 30px;
        }
      }
      .main{
        margin-top: 13px;
        // text-align: center;
      }
      .userid{
        // border: 1px solid #000;
        display: inline-block;
        // width: 180px;
        margin-top: 10px;
        margin-right: 50px;
        text-align: center;
      }
      .api{
        display: inline-block;
        text-align: center;
        // width: 300px;
        margin-right: 50px;
        // border: 1px solid #000;
      }
      .left-box{
        width: 100px;
        margin: 20px 0 20px 30px;
        .font{
          font-size: 100px;
          color: #4880b9;
        }
        h1{
          text-align: center;
          margin-top: 20px;
        }
      }
      .right-box{
        width: 100px;
        margin: 50px 0 0 100px;
        .text{
          margin: 10px;
        }
      }
    }
  }
}
</style>