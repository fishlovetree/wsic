<template>
  <div class="CustomerMenu">
    <!-- 角色管理 -->
    <div class="header">
      <div class="Newly" @click="newly()">
        <el-button size="mini" type="primary" icon="el-icon-plus">新建</el-button>
      </div>
      <!-- <div class="search">
        <el-form size="mini" :inline="true" :model="search" class="demo-form-inline">
          <el-form-item label="客户名">
            <el-input v-model="search.name" placeholder="客户名"></el-input>
          </el-form-item>
          <el-form-item label="地址">
            <el-select v-model="search.address" placeholder="地址">
              <el-option label="区域一" value="shanghai"></el-option>
              <el-option label="区域二" value="beijing"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="onSubmit">查询</el-button>
          </el-form-item>
        </el-form>
      </div> -->
    </div>
    <div class="contant">
      <el-table :data="tableData" border height="550" style="width: 100%">
        <el-table-column type="index"></el-table-column>
        <el-table-column align="center" :show-overflow-tooltip="true" prop="rolename" label="角色名" width="120"></el-table-column>
        <el-table-column align="center" :show-overflow-tooltip="true" prop="remark" label="描述">
          <template slot-scope="scope">{{scope.row.remark == null ? '暂无描述' : scope.row.remark}}</template>
        </el-table-column>
        <el-table-column align="center" :show-overflow-tooltip="true" prop="roletype" label="菜单类型">
          <template slot-scope="scope">
            <span v-show="scope.row.roletype==1">前台菜单</span>
            <span v-show="scope.row.roletype==0">后台菜单</span>
          </template>
        </el-table-column>
        <el-table-column align="center" :show-overflow-tooltip="true" prop="creatorname" label="创建人" width="120"></el-table-column>
        <el-table-column align="center" :show-overflow-tooltip="true" prop="intime" label="创建时间"></el-table-column>
        <!-- <el-table-column prop="roletype" label="">{{msg}}</el-table-column> -->
        <el-table-column align="center" :show-overflow-tooltip="true" label="操作" fixed="right">
          <template slot-scope="scope">
          <el-button
            size="mini"
            type="text"
            @click="handleEdit(scope.row)">编辑</el-button>
          <el-button
            size="mini"
            type="text"
            @click="handleDel(scope.row)">删除</el-button>
          <!-- <el-button
            size="mini"
            type="text"
            @click="handleSetting(scope.$index, scope.row)">配置账号</el-button> -->
          <el-button
            size="mini"
            type="text"
            @click="RoleMenu(scope.row)">配置菜单</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <!-- 新建 -->
    <el-dialog :title="title" :visible.sync="Newly" width="40%">
      <div class="NewAccount" style="width:80%">
        <el-form label-position="right" label-width="80px" :model="formLabel">
          <el-form-item label="角色名" required>
            <el-input v-model="formLabel.rolename"></el-input>
          </el-form-item>
          <el-form-item label="账号类型" required>
            <el-select v-model="formLabel.roletype" placeholder="前台/后台账号">
              <el-option label="后台账号" value="0"></el-option>
              <el-option label="前台账号" value="1"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="备注">
            <el-input v-model="formLabel.remark"></el-input>
          </el-form-item>
        </el-form>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button @click="Newly = false">取 消</el-button>
        <el-button type="primary" @click="newCreated()">确 定</el-button>
      </div>
    </el-dialog>
    <!-- 编辑 -->
    <el-dialog :title="title" :visible.sync="edit" width="40%">
      <div class="NewAccount" style="width:80%">
        <el-form label-position="right" label-width="80px" :model="formLabel">
          <el-form-item label="角色名" required>
            <el-input v-model="formLabel.rolename"></el-input>
          </el-form-item>
          <el-form-item label="账号类型" required>
            <el-select v-model="formLabel.roletype" placeholder="前台/后台账号">
              <el-option label="后台账号" :value="0"></el-option>
              <el-option label="前台账号" :value="1"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="备注">
            <el-input v-model="formLabel.remark"></el-input>
          </el-form-item>
        </el-form>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button @click="edit = false">取 消</el-button>
        <el-button type="primary" @click="SureEdit()">确 定</el-button>
      </div>
    </el-dialog>
    <!-- 配置角色 -->
    <!-- <el-dialog title="配置角色" :visible.sync="deploy" width="40%">
      <div style="text-align: center">
        <el-transfer
          style="text-align: left; display: inline-block"
          v-model="value"
          :titles="['未添加的账号', '已添加的账号']"
          :data="data">
        </el-transfer>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button @click="deploy = false">取 消</el-button>
        <el-button type="primary" @click="sureDeploy()">确 定</el-button>
      </div>
    </el-dialog> -->
    <!-- 配置菜单-->
    <el-dialog title="配置菜单" :visible.sync="deploy" width="30%">
      <div style="text-align: center">
        <el-tree
          :data="options"
          :props="props"
          show-checkbox
          @check-change="handleCheckChange">
        </el-tree>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button @click="deploy = false">取 消</el-button>
        <el-button type="primary" @click="sureDeploy()">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import {getRoleList,getRoleMenu,getCreated, updateRole, deleteRole} from '@/request/api'
export default {
  data() {
    return {
      title:'',
      Newly: false,
      edit:false,
      deploy:false,
      search: {
        name: "",
        address: ""
      },
      tableData: [],
      msg:"",
      formLabel: {
        rolename: '',
        roletype: '0',
        status: ''
      },
      options:[],
      props:{
        label:'text',
        value:'menuid'
      },
      data:[],
      value: [],
    };
  },
  created(){
    this.getRoleList()
    this.options = JSON.parse(sessionStorage.getItem('aside'))
    // console.log('options',this.options)
  },
  methods:{
    // 获取角色列表
    getRoleList(){
      let data = {
        roleType : '0'
      }
      getRoleList(data).then(res => {
        this.tableData = res.data.data
        localStorage.setItem('rolename',JSON.stringify(this.tableData))
      })
    },
    // 新建
    newly() {
      this.Newly = true;
      this.title = "新建角色"
      this.formLabel = {}
      this.formLabel.roletype = '0'
    },
    newCreated(){
      let data = this.formLabel
      getCreated(data).then(res=>{
        if(res.data.code==1){
          this.$message({
            message: '创建成功',
            type: 'success'
          });
          this.getRoleList()
          this.Newly = false
        } else {
          this.$message.error(res.data.msg);
        }
      })
    },
    // 编辑
    handleEdit(row){
      this.edit = true
      this.formLabel = row
      this.title = "编辑" +row.rolename + "角色"
    },
    SureEdit(){
      let data = {
        id:this.formLabel.id,
        rolename:this.formLabel.rolename,
        roletype:this.formLabel.roletype,
        status:this.formLabel.status
      }
      updateRole(data).then(res=>{
        if(res.data.code == 1){
          this.$message({
            message: '修改成功',
            type: 'success'
          });
          this.getRoleList()
          this.edit = false
        } else {
          this.$message.error(res.data.msg);
        }
      })
    },
    // 删除
    handleDel(row){
       this.$confirm('此操作将永久删除用户 ' + row.rolename + ', 是否继续?', '提示', {
          type: 'warning'
        }).then(() => {
          let data = {
            roleId:row.id
          }
          deleteRole(data).then(res => {
            if(res.data.code==1){
              this.$message.success('成功删除了用户' + row.rolename + '!');
              this.getRoleList();
            } else {
              this.$message.error(res.data.msg);
            }
          })
      }).catch(() => {
          this.$message.info('已取消操作!');
      });
    },
    // // 设置功能
    // handleSetting(index,row){
    //   console.log(index)
    //   console.log(row)
    // },
    // 配置角色
    RoleMenu(row){
      console.log(row)
      this.deploy = true
      this.formLabel = row
    },
    handleCheckChange(data) {
      this.value.push(data.menuid)
      // console.log('data',data.menuid);
      // console.log(checked,indeterminate);
    },
    sureDeploy(){
      let id = this.value.join()
      let data = {
        menuIdStr:id,
        roleId:this.formLabel.id
      }
      console.log('配置菜单参数data',data)
      getRoleMenu(data).then(res=>{
        if(res.data.code ==1){
          this.$message({
            message: '设置菜单成功，请前往账号管理配置角色',
            type: 'success'
          });
          this.deploy = false
          // this.getRoleList()
        } else {
          this.$message.error(res.data.msg);
        }
      })
    },
  }
}
</script>

<style lang="scss" scoped>
  .CustomerMenu{
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
    .btn{
      margin-left: 0;
    }
  }
</style>