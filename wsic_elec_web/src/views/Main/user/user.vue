<template>
  <div class="account">
    <!-- 账号管理 -->
    <!-- 头部搜索及新建按钮 -->
    <div class="header">
      <div class="Newly" @click="newly()">
        <el-button size="mini" type="primary" icon="el-icon-plus">新建</el-button>
      </div>
      <!-- <div class="search">
        <el-form size="mini" :inline="true" :model="search" class="demo-form-inline">
          <el-form-item label="账号名">
            <el-input v-model="search.name" placeholder="账号名"></el-input>
          </el-form-item>
          <el-form-item label="账号类型">
            <el-input v-model="search.address" placeholder="账号类型"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="onSubmit">查询</el-button>
          </el-form-item>
        </el-form>
      </div>-->
    </div>
    <el-table :data="tableData" border height="550" style="width: 100%">
      <el-table-column align="center" :show-overflow-tooltip="true" type="index"></el-table-column>
      <!-- <el-table-column prop="accession" label="账号" width="80"></el-table-column> -->
      <el-table-column
        align="center"
        :show-overflow-tooltip="true"
        prop="username"
        label="账号"
        width="80"
      >
        <!-- <template slot-scope="scope">{{scope.row.username==null?'空':scope.row.username}}</template> -->
      </el-table-column>
      <el-table-column
        align="center"
        :show-overflow-tooltip="true"
        prop="organizationname"
        label="组织机构名称"
      >
        <template slot-scope="scope">{{scope.row.organizationname==null?'空':scope.row.organizationname}}</template>
      </el-table-column>
      <el-table-column
        align="center"
        :show-overflow-tooltip="true"
        prop="usertype"
        label="账号类型"
        width="120"
      >
      <template slot-scope="scope">
        <span v-show="scope.row.usertype==1">前台账号</span>
        <span v-show="scope.row.usertype==0">后台账号</span>
      </template>
        <!-- <template slot-scope="scope">{{scope.row.usertype==null?'空':scope.row.usertype}}</template> -->
      </el-table-column>
      <!-- <el-table-column align="center" :show-overflow-tooltip='true' prop="state" label="角色"></el-table-column> -->
      <el-table-column
        align="center"
        :show-overflow-tooltip="true"
        prop="creatorname"
        label="创建人"
        width="100"
      >
        <!-- <template slot-scope="scope">{{scope.row.usertype == creatorname?'空':scope.row.creatorname}}</template> -->
      </el-table-column>
      <el-table-column
        align="center"
        :show-overflow-tooltip="true"
        prop="intime"
        label="创建时间"
        width="180"
      >
        <!-- <template slot-scope="scope">{{scope.row.usertype==intime?'空':scope.row.intime}}</template> -->
      </el-table-column>
      <el-table-column
        align="center"
        :show-overflow-tooltip="true"
        prop="remark"
        label="备注"
        width="120"
      >
        <template slot-scope="scope">{{scope.row.remark==null?'空':scope.row.remark}}</template>
      </el-table-column>
      <el-table-column align="center" label="操作" fixed="right">
        <template slot-scope="scope">
          <el-button size="mini" type="text" @click="configRole(scope.row)">编辑</el-button>
          <el-button size="mini" type="text" @click="delRole(scope.row)">删除</el-button>
          <el-button size="mini" type="text" @click="updatePwd(scope.row)">重置密码</el-button>
          <el-button size="mini" type="text" @click="upRole(scope.row)">配置角色</el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页 -->
    <div class="block" v-show="paging">
      <el-pagination
        :hide-on-single-page="true"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage"
        :page-sizes="pages"
        :page-size="pagesize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
      ></el-pagination>
    </div>
    <!-- 新建 -->
    <el-dialog title="新建账号" :visible.sync="NewAccount" width="30%">
      <div class="NewAccount" style="width:80%">
        <el-form label-position="right" :rules="rules" label-width="80px" :model="formLabel">
          <el-form-item 
          prop="username"
          label="用户名" 
          required>
            <el-input v-model="formLabel.username"></el-input>
          </el-form-item>
          <el-form-item label="账号类型" required>
            <el-select v-model="formLabel.usertype">
              <el-option label="后台账号" value="0"></el-option>
              <el-option label="前台账号" value="1"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="组织机构" required>
            <el-select v-model="formLabel.organizationcode" placeholder="请选择">
              <el-option
                v-for="item in org"
                :key="item.value"
                :label="item.organizationname"
                :value="item.organizationcode">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="备注">
            <el-input v-model="formLabel.remark"></el-input>
          </el-form-item>

        </el-form>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button @click="NewAccount = false">取 消</el-button>
        <el-button type="primary" @click="NewCreate()">确 定</el-button>
      </div>
    </el-dialog>
    <!-- 编辑 -->
    <el-dialog :title="title" :visible.sync="changeAut" width="30%">
      <div class="NewAccount" style="width:80%">
        <el-form label-position="right" label-width="80px" :model="formLabel">
          <el-form-item label="用户名" required>
            <el-input v-model="formLabel.username"></el-input>
          </el-form-item>
          <el-form-item label="账号类型" required>
            <el-select v-model="formLabel.usertype">
              <el-option label="后台账号" :value="0"></el-option>
              <el-option label="前台账号" :value="1"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="组织机构">
             <el-select v-model="formLabel.organizationcode" placeholder="请选择">
              <el-option
                v-for="item in org"
                :key="item.value"
                :label="item.organizationname"
                :value="item.organizationcode">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="备注">
            <el-input v-model="formLabel.remark"></el-input>
          </el-form-item>
        </el-form>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button @click="changeAut = false">取 消</el-button>
        <el-button type="primary" @click="change()">确 定</el-button>
      </div>
    </el-dialog>
    <!-- 配置角色 -->
    <el-dialog :title="title" :visible.sync="MaskDialog" width="40%">
      <el-checkbox-group v-model="checkList">
        <div class="list">
          <el-checkbox v-for="item in rolename" :key="item.id" :label="item.id">{{item.rolename}}</el-checkbox>
        </div>
      </el-checkbox-group>
      <div slot="footer" class="dialog-footer">
        <el-button @click="MaskDialog = false">取 消</el-button>
        <el-button type="primary" @click="updataRole()">确 定</el-button>
      </div>
    </el-dialog>
    <!-- 重置密码 -->
    <el-dialog title="重置密码" :visible.sync="outerVisible" width="30%">
      <el-form label-position="right" label-width="80px" :model="form">
        <el-form-item label="用户名" prop="username">
          <el-input v-model="form.username"></el-input>
        </el-form-item>
        <el-form-item label="密码" required>
          <el-input v-model="form.pwd"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button size="mini" @click="outerVisible = false">取 消</el-button>
        <el-button size="mini" type="primary" @click="updPwd()">确定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import {
  getOrganization,
  getUserPage,
  getCreate,
  getUpdate,
  getUpdatePwd,
  getDelete,
  getUpdateRole,
  getRoleList
} from "@/request/api"
export default {
  data() {
    var  user = (rule, value, callback) => {
      const reg = /^[_a-zA-Z0-9]+$/
      if (value == '' || value == undefined || value == null) {
        callback()
      } else {
        if (!reg.test(value)) {
          callback(new Error('只能输入英文字母，数字以及下划线'))
        } else {
          callback()
        }
      }
    }
    return {
      title: "",
      search:{
        name: "",
        address: ""
      },
      tableData: [],
      formLabel: {
        username: "",
        usertype: '0',
        userLevel: ""
      },
      org:[],
      form: {
        pwd: "",
        userId: ""
      },
      NewAccount: false,
      changeAut: false,
      MaskDialog: false,
      outerVisible: false,
      innerVisible: false,
      checkList: [],
      total: 0,
      currentPage: 1,
      paging: true,
      pages: [10, 20, 50, 100],
      pagesize: 10,
      page: "1",
      size: "10",
      rolename:[],
      // 验证用户名
      rules:{
        username:[
         { required:true, validator:user,trigger:'blur'}
        ]
      },
    }
  },
  created() {
    this.getList();
    this.getOrganizationList()
    let role = JSON.parse(localStorage.getItem('rolename'))
    if(role == null || role == ''){
      let data = {
        roleType : '0'
      }
      getRoleList(data).then(res=>{
        let list = res.data.data
        this.rolename = list
      })
    }else {
      this.rolename = role
    }
  },
  methods: {
    // 搜索查询的操作
    onSubmit() {
      // console.log("submit!");
      // 提示框
      if (this.search.name === "") {
        this.$message.warning("查询条件不能为空！");
      } else if (this.search.address === "") {
        this.$message.warning("查询条件不能为空！");
      }
      this.search.name = [];
      this.search.address = [];
    },
    // 获取列表数据
    getList() {
      let data = {
        userType: sessionStorage.getItem('usertype'),
        page: this.page,
        size: this.size
      };
      getUserPage(data).then(res => {
        // console.log("账号管理", res.data);
        if (res.data.code == 1) {
          this.tableData = res.data.data.list;
          this.total = res.data.data.total;
          if (res.data.data.total == 0) {
            this.pading = false;
          }
          if (res.data.data.total <= 10) {
            this.hideValue = false;
          }
        }
      });
    },
    getOrganizationList(){
      getOrganization().then(res=>{
        console.log(res.data)
        this.org = res.data.data
        console.log('this.org',this.org)
        // this.formLabel.organizationname = res.data.data
      })
    },
    // 新建
    newly() {
      this.NewAccount = true;
      this.formLabel = {},
      this.formLabel.usertype = '0'
    },
    NewCreate() {
      let data = this.formLabel;
      getCreate(data).then(res => {
        if (res.data.code == 1) {
          this.$message({
            message: "创建成功",
            type: "success"
          });
          // 创建成功对话框消失
          this.NewAccount = false;
          // 调用列表接口
          this.getList();
        } else{
          this.$message.error(res.data.msg);
        }
      });
    },
    // 编辑
    configRole(row) {
      this.title = "编辑" + row.username + "用户";
      this.formLabel = row;
      this.changeAut = true;
      
      console.log('this.formLabel',this.formLabel)
    },
    change() {
      let data ={
        id:this.formLabel.id,
        username:this.formLabel.username,
        usertype:this.formLabel.usertype,
        organizationcode:this.formLabel.organizationcode,
        remark:this.formLabel.remark,
      }
      // let data = this.formLabel
      getUpdate(data).then(res => {
        if (res.data.code == 1) {
          this.$message({
            message: "修改成功",
            type: "success"
          });
          // 创建成功对话框消失
          this.changeAut = false;
          // 调用列表接口
        }  else {
          this.$message.error(res.data.msg);
        }
        this.getList();
      });
    },
    // 修改密码
    updatePwd(row) {
      this.form = row;
      this.outerVisible = true;
    },
    updPwd() {
      this.$confirm(
        "此操作将修改 " + this.form.username + "用户的密码, 是否继续?",
        "提示",
        {
          type: "warning"
        }
      )
        .then(() => {
          let data = {
            pwd: this.form.pwd,
            userId: this.form.id
          };
          getUpdatePwd(data).then(res => {
            if (res.data.code == 1) {
              this.$message.success(
                "成功修改了" + this.form.username + "用户的密码!"
              );
              this.outerVisible = false;
              this.getList();
            }  else {
              this.$message.error(res.data.msg);
            }
          });
        })
        .catch(() => {
          this.$message.info("已取消操作!");
        });
    },
    // 删除
    delRole(row) {
      this.$confirm(
        "此操作将永久删除用户 " + row.username + ", 是否继续?",
        "提示",
        {
          type: "warning"
        }
      )
        .then(() => {
          let data = {
            userId: row.id
          };
          getDelete(data).then(res => {
            if (res.data.code == 1) {
              this.$message.success("成功删除了用户" + row.username + "!");
              this.getList();
            } else {
              this.$message.error(res.data.msg);
            }
          });
        })
        .catch(() => {
          this.$message.info("已取消操作!");
        });
    },
    // 配置账号角色
    upRole(row) {
      this.title = "配置" + row.username + "角色";
      this.MaskDialog = true;
      this.form = row;
    },
    updataRole() {
      let check = this.checkList.join();
      let data = {
        roleIdStr: check,
        userId: this.form.id
      };
      getUpdateRole(data).then(res => {
        if (res.data.code == 1) {
          this.$message({
            message: "配置成功",
            type: "success"
          });
          this.MaskDialog = false;
          this.getList();
        } else {
          this.$message.error(res.data.msg);
        } 
      });
    },
    // 分页
    handleSizeChange(val) {
      // 当前页
      this.page = val;
      this.getList();
    },
    handleCurrentChange(val) {
      // 跳转到当前页面
      this.page = val;
      this.getList();
    }
  }
};
</script>

<style lang="scss">
.account {
  width: 100%;
  .header {
    display: inline-block;
    vertical-align: middle;
    height: 50px;
    .search {
      display: inline-block;
      vertical-align: top;
    }
    .Newly {
      display: inline-block;
      margin-right: 100px;
    }
  }
  #mask-box {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.3);
    z-index: 99;
    .mask {
      width: 500px;
      height: 550px;
      margin: 0 auto;
      margin-top: 100px;
      background: #fff;
      .close {
        cursor: pointer;
        float: right;
        width: 20px;
        height: 20px;
        background: #999;
        color: #fff;
        font-size: 18px;
        i {
          margin-left: 1px;
        }
      }
    }
  }
  .btn {
    margin-left: 0;
  }
  .block {
    position: fixed;
    left: 300px;
    bottom: 30px;
  }
  .list {
    margin-bottom: 15px;
    .el-checkbox {
      margin-bottom: 10px;
    }
  }
}
</style>