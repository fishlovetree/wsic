<template>
  <div class="errorlog">
    <div class="contant">
      <el-table border height="580" :data="tableData" style="width: 100%">
        <el-table-column align="center" type="index" label="#" width="50"></el-table-column>
        <el-table-column align="center" prop="user.username" label="操作人" width="100">
          <template slot-scope="scope">{{scope.row.user.username === null?'空':scope.row.user.username}}</template>
        </el-table-column>
        <el-table-column align="center" prop="ip" label="客户端ip" width="140">
          <template slot-scope="scope">{{scope.row.ip === null?'空':scope.row.ip}}</template>
        </el-table-column>
        <el-table-column align="center" :show-overflow-tooltip='true' prop="message" label="异常方法">
          <template slot-scope="scope">{{scope.row.message === null?'空':scope.row.message}}</template>
        </el-table-column>
        <el-table-column align="center" :show-overflow-tooltip='true' prop="errorclass" label="异常类">
          <template slot-scope="scope">{{scope.row.errorclass === null?'空':scope.row.errorclass}}</template>
        </el-table-column>
        <el-table-column align="center" :show-overflow-tooltip='true' prop="intime" label="异常时间" width="160">
          <template slot-scope="scope">{{scope.row.intime === null?'空':scope.row.intime}}</template>
        </el-table-column>
        <el-table-column align="center" :show-overflow-tooltip='true' prop="browser" label="客户端浏览器" width="110">
          <template slot-scope="scope">{{scope.row.browser === null?'空':scope.row.browser}}</template>
        </el-table-column>
        <el-table-column align="center" :show-overflow-tooltip='true' prop="stacktrace" label="异常堆栈">
          <template slot-scope="scope">
            <el-button @click="drawerStck(scope.row)" type="text" size="small">点击查看</el-button>
          </template>
          <!-- <template slot-scope="scope">{{scope.row.message === null?'空':scope.row.message}}</template> -->
        </el-table-column>
      </el-table>
      <!-- 异常堆栈详情抽屉弹框 -->
      <el-drawer
        title="异常堆栈详情"
        direction="ltr"
        :visible.sync="drawer">
        <span class="stacktrace-text">
          {{stacktrace==""?'空':stacktrace}}
        </span>
      </el-drawer>
      <!-- 分页 -->
      <div class="block" v-show="paging">
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :hide-on-single-page="true"
          :current-page="currentPage"
          :page-sizes="pages"
          layout="total, prev, pager, next, jumper"
          :total="total"
        ></el-pagination>
      </div>
    </div>
    <!-- 详细信息 -->
    <el-dialog
      title="详细信息"
      :visible.sync="dialogVisible"
      width="50%">
        <!--  -->
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { getError } from "@/request/api";

export default {
  data() {
    return {
      tableData: [],
      //分页
      total: 0,
      currentPage: 1,
      paging:true,
      pages:[10,20,50,100],
      dialogVisible:false,
      from:{},
      page:'1',
      drawer: false,//异常堆栈
      stacktrace:""
    };
  },
  created() {
    this.getlist();
  },
  methods: {
    getlist() {
      let data = {
        page: this.page,
        size: '10'
      };
      getError(data).then(res => {
        // console.log(res.data);
        this.tableData = res.data.data.list;
        this.total = res.data.data.total;
      });
    },
    handleClick(row) {
      // console.log(row);
      this.dialogVisible = true
      this.from = row
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
    // 异常堆栈详情
    drawerStck(row){
      this.drawer = true
      this.stacktrace = row.stacktrace
    }
  }
};
</script>

<style lang="scss">
.errorlog {
  .header {
    .search {
      display: inline-block;
      vertical-align: top;
      .el-form-item {
        margin-bottom: 5px !important;
      }
    }
  }
  .block{
    margin-left: 400px;
  }
}
.el-drawer__body{
  margin: 20px;
  height: 500px;
  overflow-y: scroll;
  .stacktrace-text{
    white-space: pre-wrap;
    word-break: break-all;
  }
}
::-webkit-scrollbar {
  display: none;
}

</style>