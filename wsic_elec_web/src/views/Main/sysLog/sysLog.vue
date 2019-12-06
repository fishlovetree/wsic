<template>
  <div class="syslog">
    <div class="contant">
      <el-table border height="560" :data="tableData" style="width: 100%">
        <el-table-column align="center" type="index" label="#" width="50"></el-table-column>
        <el-table-column align="center" :show-overflow-tooltip='true' prop="username" label="操作人" width="180"></el-table-column>
        <el-table-column align="center" :show-overflow-tooltip='true' prop="ip" label="ip" width="180"></el-table-column>
        <el-table-column align="center" :show-overflow-tooltip='true' prop="operatename" label="操作类型"></el-table-column>
        <el-table-column align="center" :show-overflow-tooltip='true' prop="title" label="标题"></el-table-column>
        <el-table-column align="center" :show-overflow-tooltip='true' prop="intime" label="时间"></el-table-column>
        <el-table-column align="center" :show-overflow-tooltip='true' prop="content" label="描述"></el-table-column>
        <!-- <el-table-column fixed="right" label="操作" width="100">
          <template slot-scope="scope">
            <el-button @click="handleClick(scope.row)" type="text" size="small">详细信息</el-button>
          </template>
        </el-table-column> -->
      </el-table>
    </div> 
    <!-- 分页 -->
    <div class="block" v-show="paging">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :hide-on-single-page="hideValue"
        :current-page="currentPage"
        :page-sizes="pages"
        :page-size="pagesize"
        layout="total, prev, pager, next, jumper"
        :total="this.total"
      ></el-pagination>
    </div>
    <!-- 详细信息 -->
    <el-dialog
      title="详细信息"
      :visible.sync="dialogVisible"
      width="30%">
      <el-form label-position="right" size="mini" label-width="80px" :model="formLabel">
        <el-form-item label="操作人">
          <el-input v-model="formLabel.username"></el-input>
        </el-form-item>
        <el-form-item label="操作人ip">
          <el-input v-model="formLabel.ip"></el-input>
        </el-form-item>
        <el-form-item label="操作类型">
          <el-input v-model="formLabel.operatename"></el-input>
        </el-form-item>
        <el-form-item label="标题">
          <el-input v-model="formLabel.title"></el-input>
        </el-form-item>
        <el-form-item label="描述">
          <el-input v-model="formLabel.content"></el-input>
        </el-form-item>
        <el-form-item label="时间">
          <el-input v-model="formLabel.intime"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button size="mini" @click="dialogVisible = false">取 消</el-button>
        <el-button size="mini" type="primary" @click="dialogVisible = false">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { getLogPage } from "@/request/api";

export default {
  data() {
    return {
      tableData: [],
      search: {
        username:'',
        tel:'',
        type:''
      },
      formLabel:{

      },
      dialogVisible:false,
      total: 0,
      currentPage: 1,
      hideValue:true,
      paging:true,
      pages:[10,20,50,100],
      pagesize:10,
      page:'1'
    };
  },
  created() {
    this.getlist();
  },
  methods: {
    getlist() {
      let data = {
        page: this.page,
        size: 10
      };
      getLogPage(data).then(res => {
        // console.log(res.data);
        this.tableData = res.data.data.list;
        this.total = res.data.data.total;
      });
    },
    handleClick(row) {
      // console.log(row);
      this.formLabel = row
      this.dialogVisible = true
    },
    // 分页
    handleSizeChange(val) {
      this.page = val
      this.getlist()
    },
    handleCurrentChange(val) {
      this.page = val
      this.getlist()
    }
  }
};
</script>

<style lang="scss">
.syslog {
  .header {
    .search {
      display: inline-block;
      vertical-align: top;
      .el-form-item {
        margin-bottom: 5px !important;
      }
    }
  }
  .block {
    margin-left: 400px;
  }
}
</style>