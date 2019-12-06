<template>
  <div class="system">
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
    <div class="contant">
      <el-table
        height="550"
        :data="tableData"
        style="width: 100%;margin-bottom: 20px;"
        row-key="id"
        border
        default-expand-all
        :tree-props="{children: 'children', hasChildren: 'hasChildren'}"
      >
        <el-table-column
          align="center"
          :show-overflow-tooltip="true"
          prop="menuname"
          label="菜单名"
          width="180"
        ></el-table-column>
        <el-table-column
          align="center"
          :show-overflow-tooltip="true"
          prop="menuenname"
          label="英文名"
          width="180"
        ></el-table-column>
        <el-table-column align="center" :show-overflow-tooltip="true" prop="menuurl" label="菜单链接"></el-table-column>
        <el-table-column align="center" :show-overflow-tooltip="true" prop="menutype" label="菜单类型">
          <template slot-scope="scope">
            <span v-show="scope.row.menutype==1">前台菜单</span>
            <span v-show="scope.row.menutype==0">后台菜单</span>
          </template>
        </el-table-column>
        <el-table-column align="center" :show-overflow-tooltip="true" prop="menuorder" label="菜单序号"></el-table-column>
        <el-table-column
          align="center"
          :show-overflow-tooltip="true"
          fixed="right"
          label="操作"
          width="100"
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
      <el-form ref="form" :model="form" size="small" label-width="80px">
        <el-form-item required label="菜单名称">
          <el-col :span="11">
            <el-input v-model="form.menuname"></el-input>
          </el-col>
        </el-form-item>
        <el-form-item label="英文名称">
          <el-col :span="11">
            <el-input v-model="form.menuenname"></el-input>
          </el-col>
        </el-form-item>
        <el-form-item label="菜单链接">
          <el-col :span="11">
            <el-input v-model="form.menuurl"></el-input>
          </el-col>
        </el-form-item>
        <el-form-item label="上级菜单">
          <el-col :span="11">
            <div class="block">
              <el-cascader v-model="value" :options="options" :props="props" @change="handleChange"></el-cascader>
            </div>
          </el-col>
        </el-form-item>
        <el-form-item required label="菜单类型">
          <el-col :span="11">
            <el-select v-model="form.menutype" placeholder="前/后台菜单">
              <el-option label="前台菜单" value="1"></el-option>
              <el-option label="后台菜单" value="0"></el-option>
            </el-select>
          </el-col>
        </el-form-item>
        <el-form-item label="菜单排序">
          <el-col :span="11">
            <el-input v-model="form.menuorder"></el-input>
          </el-col>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="NewSys = false">取 消</el-button>
        <el-button type="primary" @click="newMenu()">确 定</el-button>
      </span>
    </el-dialog>
    <!-- 编辑对话框 -->
    <el-dialog :title="title" :visible.sync="update" width="30%">
      <el-form ref="form" :model="form" size="small" label-width="80px">
        <el-form-item required label="菜单名称">
          <el-col :span="11">
            <el-input v-model="form.menuname"></el-input>
          </el-col>
        </el-form-item>
        <el-form-item label="英文名称">
          <el-col :span="11">
            <el-input v-model="form.menuenname"></el-input>
          </el-col>
        </el-form-item>
        <el-form-item label="菜单链接">
          <el-col :span="11">
            <el-input v-model="form.menuurl"></el-input>
          </el-col>
        </el-form-item>
        <el-form-item label="上级菜单">
          <el-col :span="11">
            <el-select v-model="form.superid">
              <el-option :label="form.menuname" :value="form.superid"></el-option>
            </el-select>
          </el-col>
        </el-form-item>
        <el-form-item required label="菜单类型">
          <el-col :span="11">
            <el-select v-model="form.menutype" placeholder="前/后台菜单">
              <el-option label="前台菜单" :value="1"></el-option>
              <el-option label="后台菜单" :value="0"></el-option>
            </el-select>
          </el-col>
        </el-form-item>
        <el-form-item label="菜单序号">
          <el-col :span="11">
            <el-input v-model="form.menuorder"></el-input>
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
import { getMenuTree, createMenu, changeMenu, delMenu } from "@/request/api";
export default {
  data() {
    return {
      tableData: [],
      NewSys: false,
      form: {},
      search: {
        name: "",
        address: ""
      },
      options: [],
      props: {
        checkStrictly: true,
        value: "menuid",
        label: "text"
      },
      value: [],
      update: false,
      title:'',
      // del:false
    };
  },
  created() {
    this.getlist();
    let menu = JSON.parse(sessionStorage.getItem("tabData"));
    // 过滤掉子数组为空的选项
    menu.forEach(item => {
      if(item.children.length>0){
        item.children.forEach(list => {
          if (list.children.length > 0) {
            item.children(list.children);
          } else {
            delete list.children;
          }
        })
      }else{
        delete item.children
      }
    });
    this.options = menu;
  },
  methods: {
    // 获取菜单列表
    getlist() {
      let data = {
        menuType: "0"
      };
      getMenuTree(data).then(res => {
        this.tableData = res.data.data;
        sessionStorage.setItem("tabData", JSON.stringify(this.tableData));
      });
    },
    handleChange(value) {
      console.log(value);
      this.form.superid = value.join();
      this.value = this.form.superid;
      console.log('this.value',this.value)
    },
    // 新建
    newly() {
      this.NewSys = true;
      this.title = '新建菜单'
      this.form.superid = this.value
      console.log('this.form.superid',this.form.superid)
    },
    newMenu() {
      let data = this.form;
      console.log("data", data);
      createMenu(data).then(res => {
        // console.log(res)
        if (res.data.code == 1) {
          this.$message({
            message: "创建成功",
            type: "success"
          });
          this.getlist();
          this.NewSys = false;
        } else {
            this.$message.error(res.data.msg);
        }
      });
    },
    // 编辑
    change(row) {
      this.form = row;
      this.title = '编辑' + row.menuname 
      this.form.superid = this.options
      this.update = true;
    },
    sureChange() {
      let data = this.form;
      changeMenu(data).then(res => {
        if (res.data.code == 1) {
          this.$message({
            message: "创建成功",
            type: "success"
          });
          this.update = false;
          this.getlist();
        } else {
          this.$message.error(res.data.msg);
        }
      });
    },
    // 删除
    deleteRow(row) {
      this.$confirm(
        "此操作将永久删除用户  " + row.text + "  模块, 是否继续?",
        "提示",
        {
          type: "warning"
        }
      )
        .then(() => {
          let data = {
            menuId: row.menuid
          };
          console.log("data", data);
          delMenu(data).then(res => {
            if (res.data.code == 1) {
              this.$message.success("成功删除了用户" + row.text + "!");
              this.getlist();
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

<style lang="scss" scoped>
.system {
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