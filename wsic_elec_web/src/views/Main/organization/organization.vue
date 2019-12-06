<template>
  <div class="organization">
    <div class="header">
      <div class="Newly" @click="newly()">
        <el-button size="mini" type="primary"  icon="el-icon-plus">新建</el-button>
      </div>
    </div>
    <div class="contant">
      <el-table
        :data="tableData"
        style="width: 100%;margin-bottom: 20px;"
        row-key="id"
        border
        height="550"
        default-expand-all
        :tree-props="{children: 'children', hasChildren: 'hasChildren'}">
        <el-table-column
          prop="organizationname"
          label="组织机构名称">
        </el-table-column>
        <el-table-column
          prop="organizationcode"
          label="组织机构代码">
        </el-table-column>
        <el-table-column label="操作配置">
          <template slot-scope="scope">
            <el-button
              size="mini"
              type="info"
              @click="change(scope.row)">编辑</el-button>
            <el-button
              size="mini"
              type="danger"
              @click="handleDelete(scope.row)">删除</el-button>
            <!-- <el-button
              size="mini"
              type="warning"
              @click="handleClick(scope.row)">配置告警人员</el-button> -->
          </template>
        </el-table-column>
      </el-table>
    </div>
    <!-- 新建 -->
    <el-dialog
      title="新建"
      :visible.sync="newOrg"
      width="30%">
      <el-form ref="form" :model="form" label-width="120px">
        <el-form-item  label="上级组织机构">
          <div class="block">
            <el-cascader :show-all-levels="false" v-model="value" :options="orgin" :props="props" @change="handleChange"></el-cascader>
          </div>
        </el-form-item>
        <el-form-item required label="组织机构代码">
          <el-col :span="16">
            <el-input v-model="form.organizationcode"></el-input>
          </el-col>
        </el-form-item>
        <el-form-item required label="组织机构名称">
          <el-col :span="16">
            <el-input v-model="form.organizationname"></el-input>
          </el-col>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button size="mini" @click="newOrg = false">取 消</el-button>
        <el-button size="mini" type="primary" @click="newOrganzation()">确 定</el-button>
      </span>
    </el-dialog>
    <!-- 编辑 -->
    <el-dialog
      :title="title"
      :visible.sync="edit"
      width="30%">
      <el-form ref="form" :model="form" label-width="120px">
        <el-form-item label="上级组织机构">
           <el-cascader :show-all-levels="false" v-model="value" :options="orgin" :props="props" @change="handleChange"></el-cascader>
        </el-form-item>
        <el-form-item label="组织机构代码">
          <el-col :span="16">
            <el-input v-model="form.organizationcode"></el-input>
          </el-col>
        </el-form-item>
        <el-form-item label="组织机构名称">
          <el-col :span="16">
            <el-input v-model="form.organizationname"></el-input>
          </el-col>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="edit = false">取 消</el-button>
        <el-button type="primary" @click="handleEdit()">确 定</el-button>
      </span>
    </el-dialog>
    <!-- 配置告警人员 -->
    <el-dialog
      :title="title"
      :visible.sync="warnPerson"
      width="50%">
      <el-form  :model="formInline" class="demo-form-inline">
        <el-col :span="7">
          <el-form-item label="姓名">
            <el-col :span="18">
              <el-input size="mini" v-model="formInline.username"></el-input>
            </el-col>
          </el-form-item>
        </el-col>
        <el-col :span="7">
          <el-form-item label="电话">
            <el-col :span="18">
              <el-input size="mini" v-model="formInline.tel"></el-input>
            </el-col>
          </el-form-item>
        </el-col>
        <el-col :span="7">
        <el-form-item label="职责">
          <el-col :span="12">
            <el-select size="mini" v-model="formInline.type">
              <el-option label="管理人" value="0"></el-option>
              <el-option label="责任人" value="1"></el-option>
              <el-option label="法人" value="2"></el-option>
            </el-select>
          </el-col>
        </el-form-item>
        </el-col>
        <el-form-item>
          <!-- <el-button size="mini" type="primary" @click="onSubmit">添加</el-button> -->
        </el-form-item>
      </el-form>
      <el-table
        border
        :data="dialogTab"
        style="width: 100%">
        <el-table-column
          prop="name"
          label="姓名"
          width="180">
        </el-table-column>
        <el-table-column
          prop="tel"
          label="电话"
          width="180">
        </el-table-column>
        <el-table-column
          prop="type"
          label="类型">
        </el-table-column>
        <el-table-column label="操作配置">
          <template slot-scope="scope">
            <el-button
              size="mini"
              type="info"
              @click="change(scope.row)">编辑</el-button>
            <el-button
              size="mini"
              type="danger"
              @click="handleDelete(scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <span slot="footer" class="dialog-footer">
        <el-button @click="warnPerson = false">取 消</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { getOrganizationTree, updateOrg, deleteOrg, createOrg } from "@/request/api";

export default {
  data() {
    return {
      tableData: [],
      form: {
        organizationname: '',
        organizationcode: '',
        // Organization:this.$store.state.Organization
      },
      newOrg: false,
      edit:false,
      warnPerson:false,
      title:'',
      formInline:{
        username:'',
        tel:'',
        type:""
      },
      dialogTab:[],
      orgin:[],
      props: {
        checkStrictly: true,
        value: "parentid",
        // value: "organizationcode",
        label: "organizationname"
      },
      value:[],//传给后台的值
    }
  },
  created(){
    this.getTree()
    // console.log('Organization',this.$store.state.Organization)
  },
  methods: {
    getTree(){
      getOrganizationTree().then(res=>{
        this.tableData = res.data.data
        // 过滤子组件为空的数组
        let org = this.tableData
        org.forEach(item=>{
          if(item.children.length > 0){
            item.children.forEach(list => {
            // console.log('list',list)
            if (list.children.length > 0) {
              list.children.forEach(i=>{
                if(i.children.lenght > 0){
                  i.children(i.children)
                }else{
                  delete i.children
                }
              })
              // list.children(list.children);
            } else {
              delete list.children;
            }
          });
          }else{
            delete item.children
          }
        })
        // console.log('org',org)
        this.orgin = org
        // console.log('this.orgin',this.orgin)
        // this.$store.commit('Org',res.data.data)
      })
    },
    handleChange(value) {
      // console.log('value',value);
      // 逗号拼接字符串
      // this.value = value.join();
      this.value = value
      // console.log('this.value',this.value)
    },
    // 新建
    newly(){
      this.newOrg = true
      this.form.organizationname = ''
      this.form.organizationcode = ''
    },
    newOrganzation(){
      this.form.parentid = this.value.pop()
      let data = this.form
      console.log('组织机构参数data', data)
      createOrg(data).then(res=>{
        console.log(res.data)
        if(res.data.code == 1){
          this.$message({
            message: "创建成功",
            type: "success"
          });
          this.newOrg = false
          this.getTree()
        }else{
          this.$message.error(res.data.msg);
        }
      })
    },
    // 编辑
    change(row){
      this.form = row
      this.form.parentid = this.orgin
      this.title ='编辑' + row.organizationname 
      this.edit = true
    },
    handleEdit() {
      let data = {
        organizationid:this.form.organizationid,
        organizationname:this.form.organizationname,
        organizationcode:this.form.organizationcode,
      }
      updateOrg(data).then(res=>{
        if(res.data.code == 1){
          this.$message({
            message: res.data.msg,
            type: "success"
          });
          this.edit = false
          this.getTree()
        }else{
          this.$message.error(res.data.msg);
        }
      })
    },
    // 删除
    handleDelete(row) {
      this.$confirm('此操作将永久删除 ' + row.organizationname + ', 是否继续?', '提示', {
        type: 'warning'
      }).then(() => {
        let data = {
          id:row.id
        }
        deleteOrg(data).then(res => {
          if(res.data.code==1){
            this.$message.success('成功删除了' + row.organizationname + '!');
            this.getTree()
          } else {
            this.$message.error(res.data.msg);
          }
        })
      }).catch(() => {
        this.$message.info('已取消操作!');
      });
    },
    handleClick(row){
      console.log(row)
      this.warnPerson = true
      this.title = row.organizationname + '配置告警人员'
    }
  }
}
</script>

<style lang="scss">
  .organization{
    .header {
      display: inline-block;
      vertical-align: middle;
      margin-bottom: 10px;
      .search {
        display: inline-block;
        vertical-align: top;
      }
      .Newly {
        display: inline-block;
        margin-right: 100px;
      }
      .el-form{
        height: 50px !important;
      }
      .el-form-item{
        margin-bottom: 0!important;
      }
    }
  }
</style>