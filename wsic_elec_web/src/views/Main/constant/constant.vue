<template>
  <div class="diction">
    <div class="contant">
      <el-tabs tab-position="left" type="card" style="height:600px" @tab-click="handleClick">
        <el-tab-pane>
          <span slot="label">
            <i class="el-icon-folder-opened"></i> 常量列表
          </span>
          <div class="header">
            <div class="Newly" @click="newly()">
              <el-button size="mini" type="primary" icon="el-icon-plus">新建</el-button>
            </div>
          </div>
          <el-table border height="540" :data="tableData" style="width: 100%">
            <el-table-column align="center" prop="coding" label="编码" width="120"></el-table-column>
            <el-table-column align="center" prop="name" label="常量名" width="180"></el-table-column>
            <el-table-column
              align="center"
              :show-overflow-tooltip="true"
              width="120"
              prop="enname"
              label="英文名"
            ></el-table-column>
            <el-table-column align="center" label="操作" width="100">
              <template slot-scope="scope">
                <el-button @click="change(scope.row)" type="text" size="small">编辑</el-button>
                <el-button @click="deleteRow(scope.row)" type="text" size="small">删除</el-button>
              </template>
            </el-table-column>
          </el-table>
        </el-tab-pane>
        <!-- 这里的name应为字符串 -->
        <el-tab-pane v-for="(item,index) in tableData" :key="index" :name="item.coding.toString()">
          <span slot="label">
            <i class="el-icon-document"></i>
            {{item.name}}
          </span>
          <div class="header">
            <div class="Newly" @click="NewChildren()">
              <el-button size="mini" type="primary" icon="el-icon-plus">新建</el-button>
            </div>
          </div>
          <el-table border height="540" :data="tableChildren" style="width: 100%">
            <el-table-column align="center" prop="coding" label="编码" width="120"></el-table-column>
            <el-table-column align="center" prop="detailname" label="子项名" width="180"></el-table-column>
            <el-table-column align="center" prop="detailvalue" label="子项值" width="180"></el-table-column>
            <el-table-column align="center" prop="parentname" label="上级常量" width="180"></el-table-column>
            <!-- <el-table-column align="center" prop="name" label="上级常量子项" width="180"></el-table-column> -->
            <el-table-column
              align="center"
              :show-overflow-tooltip="true"
              width="120"
              prop="enname"
              label="英文名"
            ></el-table-column>
            <el-table-column align="center" label="操作" width="100">
              <template slot-scope="scope">
                <el-button @click="changeDetail(scope.row)" type="text" size="small">编辑</el-button>
                <el-button @click="deleteDetail(scope.row)" type="text" size="small">删除</el-button>
              </template>
            </el-table-column>
          </el-table>
        </el-tab-pane>
      </el-tabs>
    </div>
    <!-- 新建常量对话框 -->
    <el-dialog title="新建常量" :visible.sync="NewData" width="30%">
      <el-form ref="form" :model="form" size="small" label-width="80px">
        <el-form-item label="英文名">
          <el-col :span="11">
            <el-input v-model="form.enname"></el-input>
          </el-col>
        </el-form-item>
        <el-form-item label="常量名" required>
          <el-col :span="11">
            <el-input v-model="form.name"></el-input>
          </el-col>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="NewData = false">取 消</el-button>
        <el-button type="primary" @click="newMenu()">确 定</el-button>
      </span>
    </el-dialog>
    <!-- 新建常量子项对话框 -->
    <el-dialog title="新建常量子项" :visible.sync="NewChild" width="30%">
      <el-form ref="form" :model="formChildren" size="small" label-width="80px">
        <el-form-item label="子项名" required>
          <el-col :span="11">
            <el-input v-model="formChildren.detailname"></el-input>
          </el-col>
        </el-form-item>
        <el-form-item label="子项值" required>
          <el-col :span="11">
            <el-input v-model="formChildren.detailvalue"></el-input>
          </el-col>
        </el-form-item>
        <el-form-item label="英文名">
          <el-col :span="11">
            <el-input v-model="formChildren.enname"></el-input>
          </el-col>
        </el-form-item>
        <el-form-item label="上级常量">
          <el-col :span="11">
            <el-select v-model="formChildren.status">
              <el-option
                v-for="(item,index) in tableData"
                :key="index"
                :label="item.name"
                :value="item.coding"
              ></el-option>
            </el-select>
          </el-col>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="NewChild = false">取 消</el-button>
        <el-button type="primary" @click="NewDetail()">确 定</el-button>
      </span>
    </el-dialog>
    <!--编辑常量对话框 -->
    <el-dialog title="编辑常量" :visible.sync="update" width="30%">
      <el-form ref="form" :model="form" size="small" label-width="80px">
        <!-- <el-form-item label="类别">
          <el-col :span="11">
            <el-select v-model="form.status">
              <el-option label="系统类" value="1"></el-option>
              <el-option label="业务类" value="0"></el-option>
            </el-select>
          </el-col>
        </el-form-item>-->
        <el-form-item label="英文名">
          <el-col :span="11">
            <el-input v-model="form.enname"></el-input>
          </el-col>
        </el-form-item>
        <el-form-item label="常量名">
          <el-col :span="11">
            <el-input v-model="form.name"></el-input>
          </el-col>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="update = false">取 消</el-button>
        <el-button type="primary" @click="sureChange()">确 定</el-button>
      </span>
    </el-dialog>
    <!-- 编辑常量子项对话框 -->
    <el-dialog title="编辑常量子项" :visible.sync="upChild" width="30%">
      <el-form ref="form" :model="formChildren" size="small" label-width="80px">
        <el-form-item label="子项名" required>
          <el-col :span="11">
            <el-input v-model="formChildren.detailname"></el-input>
          </el-col>
        </el-form-item>
        <el-form-item label="子项值" required>
          <el-col :span="11">
            <el-input v-model="formChildren.detailvalue"></el-input>
          </el-col>
        </el-form-item>
        <el-form-item label="英文名">
          <el-col :span="11">
            <el-input v-model="formChildren.enname"></el-input>
          </el-col>
        </el-form-item>
        <el-form-item label="上级常量">
          <el-col :span="11">
            <el-select v-model="formChildren.status">
              <el-option
                v-for="(item,index) in tableData"
                :key="index"
                :label="item.name"
                :value="item.coding"
              ></el-option>
            </el-select>
          </el-col>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="upChild = false">取 消</el-button>
        <el-button type="primary" @click="upDetail()">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import {
  getConstantList,
  getDetailList,
  getaddConstant,
  getaddConstantDetail,
  getdelConstant,
  getdelConstantDetail,
  getupdConstant,
  getupdateConstantDetail
} from "@/request/api";
export default {
  data() {
    return {
      // 存放常量
      tableData: [],
      // 存放常量的coding
      activated: "",
      // 存放常量子项
      tableChildren: [],
      form: {},
      formChildren: {
        coding: ""
      },
      NewData: false,
      NewChild: false,
      update: false,
      upChild: false
    };
  },
  created() {
    this.getlist();
  },
  methods: {
    // 常量列表
    getlist() {
      getConstantList().then(res => {
        // console.log(res);
        this.tableData = res.data.data;
      });
    },
    // 常量子项
    handleClick(tab) {
      this.activated = tab.name;
      this.getdata();
    },
    getdata() {
      let data = {
        coding: this.activated
      };
      getDetailList(data).then(res => {
        if (res.data.code == 1) {
          this.tableChildren = res.data.data;
        }
      });
    },
    // 新建常量
    newly() {
      this.NewData = true;
      this.form = {};
    },
    newMenu() {
      let data = this.form;
      getaddConstant(data).then(res => {
        if (res.data.code == 1) {
          this.$message({
            message: "创建常量成功",
            type: "success"
          });
          this.NewData = false;
          this.getlist();
        } else {
          this.$message.error(res.data.msg);
        }
      });
    },
    // 新建常量子项
    NewChildren() {
      this.NewChild = true;
      this.formChildren = {};
      this.formChildren.coding = this.activated;
    },
    NewDetail() {
      let data = this.formChildren;
      getaddConstantDetail(data).then(res => {
        if (res.data.code == 1) {
          this.$message({
            message: "创建常量子项成功",
            type: "success"
          });
          this.NewChild = false;
          this.getdata();
        } else {
          this.$message.error(res.data.msg);
        }
      });
    },
    // 编辑常量
    change(row) {
      this.form = row;
      this.update = true;
    },
    sureChange() {
      let data = this.form;
      getupdConstant(data).then(res => {
        if (res.data.code == 1) {
          this.$message({
            message: "编辑常量成功",
            type: "success"
          });
          this.update = false;
          this.getlist();
        } else {
          this.$message.error(res.data.msg);
        }
      });
    },
    // 编辑常量子项
    changeDetail(row) {
      this.formChildren = row;
      this.upChild = true;
    },
    upDetail() {
      let data = this.formChildren;
      getupdateConstantDetail(data).then(res => {
        if (res.data.code == 1) {
          this.$message({
            message: "编辑常量子项成功",
            type: "success"
          });
          this.upChild = false;
          this.getDetailList();
        } else {
          this.$message.error(res.data.msg);
        }
      });
    },
    // 删除常量
    deleteRow(row) {
      this.$confirm("此操作将永久删除, 是否继续?", "提示", {
        type: "warning"
      })
        .then(() => {
          console.log(row.coding);
          let data = {
            coding: row.coding
          };
          console.log("data", data);
          getdelConstant(data).then(res => {
            if (res.data.code == 1) {
              this.$message.success("删除成功!");
              this.getlist();
            } else {
              this.$message.error(res.data.msg);
            }
          });
        })
        .catch(() => {
          this.$message.info("已取消操作!");
        });
    },
    // 删除常量子项
    deleteDetail(row) {
      this.$confirm("此操作将永久删除, 是否继续?", "提示", {
        type: "warning"
      })
        .then(() => {
          let data = {
            detailId: row.detailid
          };
          console.log("data", data);
          getdelConstantDetail(data).then(res => {
            if (res.data.code == 1) {
              this.$message.success("删除成功!");
              this.getdata();
            } else {
              this.$message.error(res.data.msg);
            }
          });
        })
        .catch(() => {
          this.$message.info("已取消操作!");
        });
    }
  }
};
</script>
<style lang="scss">
.diction {
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