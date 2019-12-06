<template>
  <div class="concentrator">
    <!-- 头部搜索及新建按钮 -->
    <div class="header">
      <div class="Newly">
        <el-button size="small" type="primary" @click="newly()" icon="el-icon-plus">新建</el-button>
        <!-- <template slot-scope="scope"> -->
            <!-- <el-button @click="change()" type="primary" icon="el-icon-edit" size="small">编辑</el-button>
            <el-button @click="deleteRow()" type="primary" icon="el-icon-delete" size="small">删除</el-button> -->
          <!-- </template> -->
        <el-button
            style="margin-left:10px"
            size="small"
            type="primary"
            @click="clickExcel()"
            icon="el-icon-download"
          >导出excel文档</el-button>
        <el-upload 
          style="display:inline-block; margin-left:10px" 
          class="upload-demo"
          :limit="1"
          :action="url"
          accept=".xlsx"
          name="file"
          :before-upload="beforeUploadFile"
          :on-change="fileChange"
          :on-success="handleSuccess"
          :on-error="handleError"
          :on-exceed="exceedFile"
          :file-list="fileList"
          :with-credentials="true">
          <el-button icon="el-icon-upload" size="small" type="primary">导入excel文档</el-button>
        </el-upload>
      </div>
      <!-- <div class="search">
        <el-form size="mini" :inline="true" :model="search" class="demo-form-inline">
          <el-form-item label="集中器名称">
            <el-input v-model="search.name" placeholder="集中器名称"></el-input>
          </el-form-item>
          <el-form-item label="集中器编号">
            <el-input v-model="search.address" placeholder="集中器编号"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="onSubmit">查询</el-button>
          </el-form-item>
        </el-form>
      </div>-->
    </div>
    <div class="contant">
      <el-table id="table" 
      :data="tableData" 
      border 
      height="550" 
      style="width: 70%,background: #efefef;">
        <el-table-column align="center" type="index"></el-table-column>
        <el-table-column align="center" :show-overflow-tooltip="true" prop="name" label="集中器名称"></el-table-column>
        <el-table-column align="center" :show-overflow-tooltip="true" prop="code" label="集中器编号"></el-table-column>
        <el-table-column align="center" :show-overflow-tooltip="true" prop="sim" label="SIM卡号">
          <template slot-scope="scope">{{scope.row.sim === null?'空':scope.row.sim}}</template>
        </el-table-column>
        <el-table-column align="center" :show-overflow-tooltip="true" fixed="right" label="操作">
          <template slot-scope="scope">
            <el-button @click="change(scope.row)" type="text" size="small">编辑</el-button>
            <el-button @click="deleteRow(scope.row)" type="text" size="small">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <!-- 分页 -->
    <div class="block" v-show="paging">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :hide-on-single-page="true"
        :current-page="currentPage"
        layout="total, prev, pager, next, jumper"
        :total="total"
      ></el-pagination>
    </div>
    <!-- 新建对话框 -->
    <el-dialog :title="title" :visible.sync="NewSys" width="30%">
      <el-form ref="form" :model="form" size="small" label-width="100px">
        <el-form-item required label="集中器名称">
          <el-col :span="12">
            <el-input v-model="form.name"></el-input>
          </el-col>
        </el-form-item>
        <el-form-item required label="集中器编号">
          <el-col :span="12">
            <el-input v-model="form.code"></el-input>
          </el-col>
        </el-form-item>
        <el-form-item label="SIM卡号">
          <el-col :span="12">
            <el-input v-model="form.sim"></el-input>
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
        <el-form-item required label="集中器名称">
          <el-col :span="12">
            <el-input v-model="form.name"></el-input>
          </el-col>
        </el-form-item>
        <el-form-item required label="集中器编号">
          <el-col :span="12">
            <el-input v-model="form.code"></el-input>
          </el-col>
        </el-form-item>
        <el-form-item label="SIM卡号">
          <el-col :span="12">
            <el-input v-model="form.sim"></el-input>
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
import {
  getConcentrator,
  getdeleteConcentrator,
  getaddConcentrator,
  getupdateConcentrator,
  getExportExcel,
  // getImportExcel
} from "@/request/api";

export default {
  data() {
    return {
      url:'http://193.168.1.114:11020/bus/concentrator/importExcel',
      fileList:[],
      forms:{
        file:''
      },
      tableData: [], //数据列表
      form: {},
      search: {
        name: "",
        address: ""
      }, //搜索
      options: [],
      props: {
        checkStrictly: true,
        value: "menuid",
        label: "text"
      },
      value: [],
      title: "",
      NewSys: false, //新建
      update: false, //修改
      //分页
      total: 0,
      currentPage: 1,
      paging:true,
      dialogVisible:false,
      page:'1',
      // del:false
    };
  },
  created() {
      this.getList();
  },
  methods: {
    // 文件超出个数限制时的钩子
    exceedFile(files, fileList) {
      this.$message.warning("只能选择 "+this.limitNum+"个文件，当前共选择了"+ files.length + fileList.length+"个");
    },
    // 上传文件之前的钩子, 参数为上传的文件,若返回 false 或者返回 Promise 且被 reject，则停止上传
    beforeUploadFile(file) {
      console.log('before upload4');
      console.log('file5',file);
      let extension = file.name.substring(file.name.lastIndexOf('.')+1);
      console.log('extension6',extension)
      let size = file.size / 1024 / 1024;
      if(extension !== 'xlsx') {
        this.$message.warning('只能上传后缀是.xlsx的文件');
      }
      if(size > 10) {
        this.$message.warning('文件大小不得超过10M');
      }
    },
    // 文件上传成功时的钩子
    handleSuccess(res,file,fileList) {
      console.log('res7',res)
      console.log('file8',file)
      console.log('fileList9',fileList)
      this.$message.success('文件上传成功');
      if(res == 'success'){
        console.log('导入成功')
        this.getList()
      }
    },
    // 文件上传失败时的钩子
    handleError(err,file,fileList) {
      console.log('err',err)
      console.log('file',file)
      console.log('fileList',fileList)
      this.$message.error('文件上传失败');
    },
    // 文件状态改变时的钩子
    fileChange(file) {
      console.log('file1',file)
      console.log('file.raw2',file.raw);
      this.fileList.push(file.raw) ;
      console.log('this.fileList3',this.fileList);
      this.forms.file = this.fileList
      console.log('this.forms.file(10)',this.forms.file)
    },
    getList() {
      let data = {
        page: this.page,
        size: "10"
      };
      getConcentrator(data).then(res => {
        this.tableData = res.data.data.list;
        this.total = res.data.data.total;
        // console.log("集中器管理列表", res.data);
      });
    },
    // 分页
    handleSizeChange(val) {
      this.page = val
      this.getlist()
    },
    handleCurrentChange(val) {
      this.page = val
      this.getlist()
    },
    // 新建
    newly() {
      this.NewSys = true;
      this.title = "新建集中器";
      this.form = {};
    },
    newCon() {
      let data = this.form;
      console.log("新建集中器data", data);
      getaddConcentrator(data).then(res => {
        if (res.data.code == 1) {
          this.$message({
            message: "创建成功",
            type: "success"
          });
          this.NewSys = false;
          this.getList();
        } else {
          this.$message.error(res.data.msg);
        }
      });
    },
    // 编辑
    change(row) {
      // if(this.form.name===undefined){
      //   this.$message.error('请选择需要编辑的集中器');
      // }else {
        
        this.form = row;
        this.title = "编辑" + this.form.name + "集中器";
        this.update = true;
      // }
    },
    sureChange() {
      let data = this.form;
      console.log("编辑data", data);
      getupdateConcentrator(data).then(res => {
        if (res.data.code == 1) {
          this.$message({
            message: "创建成功",
            type: "success"
          });
          this.update = false;
          this.getList();
        } else {
          this.$message.error(res.data.msg);
        }
      });
    },
    // 删除
    deleteRow(row) {
      // if(this.form.name === undefined){
      //   this.$message.error('请选择需要删除的集中器');
      // }else {

     
      this.$confirm(
        "此操作将永久删除  " + row.name + "  此集中器, 是否继续?",
        "提示",
        {
          type: "warning"
        }
      )
        .then(() => {
          let data = {
            id: row.id
          };
          console.log("data", data);
          getdeleteConcentrator(data).then(res => {
            if (res.data.code == 1) {
              this.$message.success("成功删除了" + row.name + "集中器!");
              this.getList();
            } else {
              this.$message.error(res.data.msg);
            }
          });
        })
        .catch(() => {
          this.$message.info("已取消操作!");
        });
      // }
    },
    // 导出excel文档
    clickExcel() {
      getExportExcel().then(res=>{
        console.log('res--',res)
        const content = res.data
        const blob = new Blob([content]) // 构造一个blob对象来处理数据
        const fileName = 'concentrator.xlsx' // 导出文件名
        // 对于<a>标签，只有 Firefox 和 Chrome（内核） 支持 download 属性
        // IE10以上支持blob但是依然不支持download
        if ('download' in document.createElement('a')) { // 支持a标签download的浏览器
          const link = document.createElement('a') // 创建a标签
          link.download = fileName // a标签添加属性
          link.style.display = 'none'
          link.href = URL.createObjectURL(blob)
          document.body.appendChild(link)
          link.click() // 执行下载
          URL.revokeObjectURL(link.href) // 释放url
          document.body.removeChild(link) // 释放标签
        } else { // 其他浏览器
          navigator.msSaveBlob(blob, fileName)
        }
        this.btnSendTem = false
      })
    },
  }
};
</script>
<style lang="scss">
.concentrator {
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
  .block{
    margin-left: 400px;
  }
}
.el-upload-list{
  display: inline-block;
  vertical-align: top;
}
</style>