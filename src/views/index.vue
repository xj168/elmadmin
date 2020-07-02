<template>
  <div class="index">
    <el-container style="height: 100%; border: 1px solid #eee">
      <el-aside width="200px" style="background-color: #304156">
        <!-- 页头 -->
        <!-- 配置当前选项 -->
        <!-- :default-active="this.$route.path" -->
        <el-menu :default-active="this.$route.path" background-color="#304156" text-color="#fff" router>
          <img src="../assets/logo.jpg" alt="" style="width:200px;">
          <el-menu-item index="/index">
            <i class="el-icon-s-home ff"></i>
            <span>后台首页</span>
          </el-menu-item>
          <el-menu-item index="/index/management">
            <i class="el-icon-document ff"></i>
            <span>订单管理</span>
          </el-menu-item>
          <el-submenu index="/index/shopplist">
            <template slot="title">
              <i class="el-icon-goods ff"></i>
              <span>商品管理</span>
            </template>
            <el-menu-item-group>
              <el-menu-item index="/index/shopplist">商品列表</el-menu-item>
              <el-menu-item index="/index/add-shop">添加商品</el-menu-item>
            </el-menu-item-group>
          </el-submenu>
          <el-menu-item index="/index/store">
            <i class="el-icon-box ff"></i>
            <span>用户信息</span>
          </el-menu-item>
          <el-submenu index="/index/uesr_list">
            <template slot="title">
              <i class="el-icon-user ff"></i>
              <span>账号管理</span>
            </template>
            <el-menu-item-group style="">
              <el-menu-item index="/index/uesr_list">账号列表</el-menu-item>
              <el-menu-item index="/index/add_user">添加账号</el-menu-item>
              <el-menu-item index="/index/revise_pwd">修改密码</el-menu-item>
            </el-menu-item-group>
          </el-submenu>
          <el-submenu index="/index/shop_info">
            <template slot="title">
              <i class="el-icon-pie-chart ff"></i>
              <span>销售统计</span>
            </template>
            <el-menu-item-group>
              <el-menu-item index="/index/shop_info">商品统计</el-menu-item>
              <el-menu-item index="/index/order_info">订单统计</el-menu-item>
            </el-menu-item-group>
          </el-submenu>
        </el-menu>
      </el-aside>

      <el-container>
        <el-header style="text-align: right; font-size: 12px">
          <!-- 面包屑导航 -->
          <el-breadcrumb separator-class="el-icon-arrow-right" class="el-breadcrumb">
            <el-breadcrumb-item :to="{ path: '/index' }" class="el-breadcrumb-item">首页</el-breadcrumb-item>
            <el-breadcrumb-item class="el-breadcrumb-item" v-for="(v,i) in this.$route.meta" :key="i">{{v}}</el-breadcrumb-item>
          </el-breadcrumb>
          <!-- 下拉菜单 -->
          <el-dropdown>
            <span class="el-dropdown-link">
              欢迎你 {{name}}
              <el-avatar :size="45" :src="circleUrl"></el-avatar>
            </span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item>
                <a href="#/index/store">个人信息</a>
              </el-dropdown-item>
              <el-dropdown-item>
                <a href="#/">退出登录</a>
              </el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </el-header>

        <el-main>
          <router-view/>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>
<script>
// 引入ajax
export default {
  async created() {
    //    接收传过来的参数
    let id = sessionStorage.getItem("id");
    let token = sessionStorage.getItem("token");
    // console.log(id);
    // get调用方式
    var res = await this.axios.get("/users.php?a=chklogin", {
      params: {
        id: id,
        token: token
      }
    });
    // console.log(res);
    if (res.data.code > 0) {
      this.$message.error("请登录后操作");
      this.$router.push("/");
    }
    // 获取登录的信息并转换为json格式
    let userinfo = JSON.parse(sessionStorage.getItem("userinfo"));
    this.name=userinfo.data.account;
    this.circleUrl=userinfo.data.imgUrl;
  },
  data() {
    return {
      circleUrl: "",
      name: ""
    };
  },
  methods: {}
};
</script>

<style scoped>
.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 200px;
  min-height: 400px;
}
.ff {
  color: #ffffff;
}
.index {
  height: 100%;
  width: 100%;
  background: rgb(238, 241, 246);
}
.index .el-menu {
  border: none;
}
/* 头部css */
.index .el-header {
  background: #ffffff;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.index .el-avatar {
  vertical-align: middle;
}
/* 侧边 */
.index .a {
  color: #ffffff;
  text-decoration: none;
}
</style>

