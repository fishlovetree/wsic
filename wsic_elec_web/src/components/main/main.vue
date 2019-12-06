<template>
  <div class="main">
    <div class="left-box">
      <el-tabs
        v-model="editableTabsValue"
        type="card"
        closable
        @tab-remove="removeTab"
        @tab-click="handleClickTab($event.name)"
      >
        <el-tab-pane
          :key="item.name"
          v-for="item in editableTabs"
          :label="item.title"
          :name="item.name"
        ></el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      value: true,
      editableTabsValue: "",
      editableTabs: [
        {
          title: "首页",
          name: "/home"
        }
      ],
      tabIndex: 1,
      openedTab: ["/home"],
      // index:[],
    };
  },
  created() {
    // 刷新页面时（F11)
    // 因为<router-view>的<keep-alive>，会保留刷新时所在的router
    // 但是tab标签页因为刷新而被重构了，tab没有了
    // 因此需要将router回到首页
    this.$router.push("/home");
  },
  methods: {
    handleClickTab(route) {
      // console.log('changeTabRoute',route)
      this.$store.commit("changeTab", route);
      this.$router.push(route);
    },
    removeTab(targetName) {
      // targetName 为删除的标签页面的路由
      // 首页不允许被关闭（为了防止el-tabs栏中一个tab都没有）
      if (targetName === "/home") {
        return false;
      }
      let tabs = this.editableTabs;// tabs打开的所有标签页面的配置
      let activeName = this.editableTabsValue;// activeName为选中的标签页的路由
      if (activeName === targetName) {
        tabs.forEach((tab, index) => {
          if (tab.name === targetName) {
            let nextTab = tabs[index + 1] || tabs[index - 1];
            // nextTab删除之后的下一个或上一个的路由
            if (nextTab) {
              activeName = nextTab.name;
            }
          }
        });
      }
      this.$store.commit("deductTab", targetName);
      let deductIndex = this.openedTab.indexOf(targetName);
      this.openedTab.splice(deductIndex, 1);
      this.$router.push(activeName);
      this.editableTabsValue = activeName;
      this.editableTabs = tabs.filter(tab => tab.name !== targetName);
      if (this.openedTab.length === 0) {
        this.$store.commit("addTab", "/home");
        this.$router.push("/home");
      }
    }
  },
  computed: {
    getOpenedTab() {
      return this.$store.state.openedTab;
    },
    changeTab() {
      return this.$store.state.activeTab;
    }
  },
  watch: {
    getOpenedTab(val) {
      if (val.length > this.openedTab.length) {
        // 添加了新的tab页
        // 导致$store.state中的openedTab长度
        // 大于
        // 标签页中的openedTab长度
        // 因此需要新增标签页
        let newTab = val[val.length - 1]; // 新增的肯定在数组最后一个
        ++this.tabIndex;
        this.editableTabs.push({
          title: newTab.text,
          name: newTab.menuurl,
          content: ""
        });
        this.editableTabsValue = newTab.menuurl;
        this.openedTab.push({
          title: newTab.text,
          name: newTab.menuurl
        });
      }
    },
    changeTab(val) {
      // 监听activetab以实现点击左侧栏时激活已存在的标签
      if (val !== this.editableTabsValue) {
        this.editableTabsValue = val;
      }
    }
  }
};
</script>

<style scoped lang="scss">
.main {
  // height: 100%;
  .left-box {
    width: 100%;
  }
  .right-box {
    float: right;
    width: 15%;
  }
}
</style>