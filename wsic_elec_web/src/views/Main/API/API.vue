<template>
  <div class="concentrator">
    <!-- 头部搜索及新建按钮 -->
    <div class="header">
      <div class="Newly">
        <el-button size="small" type="primary" @click="newly()" icon="el-icon-plus">新建</el-button>
      </div>
    </div>
    <div class="contant">
      <el-table id="table" :data="tableData" border style="width: 100%">
        <el-table-column align="center" type="index"></el-table-column>
        <el-table-column
          align="center"
          :show-overflow-tooltip="true"
          prop="apikey"
          label="Apikey"
        ></el-table-column>
        <el-table-column
          align="center"
          :show-overflow-tooltip="true"
          prop="url"
          label="接口链接"
        ></el-table-column>
        <el-table-column
          align="center"
          :show-overflow-tooltip="true"
          fixed="right"
          label="操作"
        >
          <template slot-scope="scope">
            <el-button @click="change(scope.row)" type="text" size="small">编辑</el-button>
            <el-button @click="deleteRow(scope.row)" type="text" size="small">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <!-- 新建对话框 -->
    <el-dialog :title="title" :visible.sync="NewSys" width="30%">
      <el-form ref="form" :model="form" size="small" label-width="100px">
        <!-- <el-form-item required label="Apikey">
          <el-col :span="12">
            <el-input v-model="form.apikey"></el-input>
          </el-col>
        </el-form-item> -->
        <el-form-item required label="ApiKey">
          <el-col :span="20">
            <el-input v-model="form.apikey"></el-input>
          </el-col>
        </el-form-item>
        <el-form-item required label="接口链接">
          <el-col :span="20">
            <el-input v-model="form.url"></el-input>
          </el-col>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="NewSys = false">取 消</el-button>
        <el-button type="primary" @click="newCon()">确 定</el-button>
      </span>
    </el-dialog>
    <!-- 编辑对话框 -->
    <el-dialog :title="title" :visible.sync="update" width="30%">
      <el-form ref="form" :model="form" size="small" label-width="100px">
        <el-form-item  label="Apikey">
          <el-col :span="12">
            <el-input disabled v-model="form.apikey"></el-input>
          </el-col>
        </el-form-item>
        <el-form-item required label="接口链接">
          <el-col :span="20">
            <el-input v-model="form.url"></el-input>
          </el-col>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="update = false">取 消</el-button>
        <el-button type="primary" @click="sureChange()">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>

// import axios from 'axios'
import { getApi, getdeleteApi, getaddApi, getupdateApi } from "@/request/api";


export default {
  data() {
    return {
      tableData: [],//数据列表
      form: {},
      search: {
        name: "",
        address: ""
      },//搜索
      options: [],
      props: {
        checkStrictly: true,
        value: "menuid",
        label: "text"
      },
      value: [],
      title:'',
      NewSys: false,//新建
      update: false,//修改
      // del:false
    };
  },
  created(){
    this.getList()
  },
  methods:{
    getList(){
      let data = {
        page:'1',
        size:'10'
      }
      getApi(data).then(res=>{
        this.tableData = res.data.data.list
      })
    },
    // 新建
    newly(){
      this.NewSys = true
      this.title = '新建API接口信息'
      this.form = {}
    },
    newCon(){
      let data= this.form
      console.log('API参数',data)
      getaddApi(data).then(res=>{
        if(res.data.code == 1){
          this.$message({
            message: "创建成功",
            type: "success"
          });
          this.NewSys = false
          this.getList()
        }else {
          this.$message.error(res.data.msg);
        }
      })
    },
    // 编辑
    change(row){
      this.form = row
      this.update = true
    },
    sureChange(){
      let data = this.form
      getupdateApi(data).then(res=>{
        if(res.data.code == 1){
          this.$message({
            message: "创建成功",
            type: "success"
          });
          this.update = false
          this.getList()
        }else {
          this.$message.error(res.data.msg);
        }
      })
    },
    // 删除
    deleteRow(row) {
      this.$confirm(
        "此操作将永久删除  " + row.name + "  此集中器, 是否继续?",
        "提示",
        {
          type: "warning"
        }
      )
        .then(() => {
          let data = {
            url: row.url
          };
          console.log("data", data);
          getdeleteApi(data).then(res => {
            if (res.data.code == 1) {
              this.$message.success("成功删除了" + row.name + "集中器!");
              this.getList();
            } else  {
              this.$message.error(res.data.msg);
            }
          });
        })
        .catch(() => {
          this.$message.info("已取消操作!");
        });
    }
  }
}
</script>
<style lang="scss">
.concentrator{
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
  }
}
</style>