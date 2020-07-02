<template>
  <div class="user_list">
    <!-- 账号列表 -->
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>账号列表</span>
      </div>
      <div class="text item">
        <template>
          <el-table ref="list" :data="tableData" tooltip-effect="dark" style="width: 100%" @selection-change="handleSelectionChange">
            <el-table-column type="selection" width="55">
            </el-table-column>
            <el-table-column label="账号" width="120">
              <template slot-scope="scope">{{ scope.row.id }}</template>
            </el-table-column>
            <el-table-column label="头像" width="120">
              <template slot-scope="scope">
                <el-avatar :src="scope.row.imgUrl"></el-avatar>
              </template>
            </el-table-column>
            <el-table-column label="姓名" width="180">
              <template slot-scope="scope">
                <el-popover trigger="hover" placement="top">
                  <p>姓名: {{ scope.row.account }}</p>
                  <p>权限: {{ scope.row.userGroup }}</p>
                  <div slot="reference" class="name-wrapper">
                    <el-tag size="medium">{{ scope.row.account }}</el-tag>
                  </div>
                </el-popover>
              </template>
            </el-table-column>
            <el-table-column label="用户组" width="200">
              <template slot-scope="scope">{{ scope.row.userGroup }}</template>
            </el-table-column>
            <el-table-column label="操作">
              <template slot-scope="scope">
                <el-button size="mini" @click="edit(scope.row)">修改</el-button>
                <!-- 删除 -->
                <el-button size="mini" type="danger" @click="del(scope.$index, tableData)">删除</el-button>
              </template>
            </el-table-column>
          </el-table>
        </template>
        <div class="page">
          <el-pagination @size-change="sizeChange" @current-change="handleCurrentChange" layout="total, sizes, prev, pager, next, jumper" :page-size='pageSize' :page-sizes=[5,10,15] :current-page='currentPage' :total="total">
          </el-pagination>
        </div>
        <div class="btn">
          <el-button type="danger" @click="alldel">批量删除</el-button>
          <el-button type="primary" @click="cancel">取消选择</el-button>
        </div>
      </div>
      <!-- 修改账号 -->
      <el-dialog title="提示" :visible.sync="dialogVisible" width="30%">
        <el-form ref="form" :model="form" style="width:400px;" class="demo-ruleForm" label-width="100px" hide-required-asterisk>
          <el-form-item prop="account" label="用户名">
            <el-input v-model="form.account" :placeholder="form.account">
            </el-input>
          </el-form-item>
          <el-form-item label="用户名" prop="userGroup">
            <el-select v-model="form.userGroup" :placeholder="form.userGroup">
              <el-option label="管理员" value="管理员"></el-option>
              <el-option label="部门管理员" value="部门管理员"></el-option>
              <el-option label="超级管理员" value="超级管理员"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="submitForm('form')" class="btn">立即修改</el-button>
            <el-button @click="dialogVisible = false">取消</el-button>
          </el-form-item>
        </el-form>
      </el-dialog>
    </el-card>
  </div>
</template>

<script>
// 引入ajax
export default {
  // 改成同步异步处理
  created() {
    // 调用ajax
    this.getdata();
  },
  data() {
    return {
      list: [],
      tableData: [
        {
          id: "",
          account: "",
          userGroup: "",
          imgUrl: ""
        }
      ],
      // 分页数据
      total: 50, //总共多少页
      currentPage: 1, //当前页,
      pageSize: 5,
      dialogVisible: false,
      form: {
        account: "",
        userGroup: "超级管理员"
      }
    };
  },
  methods: {
    handleSelectionChange(val) {
      this.list = val;
    },
    // 编辑
    async edit(row) {
      // 跳到另外一个页面
      // this.$router.push("/index/modify_user/" + row.id);
      // 打开弹窗
      this.dialogVisible = true;
      // 获取传入的值的信息双向绑定
      this.form = row;
    },
    // 删除
    async del(index) {
      var that = this;
      // 调用ajax等待
      var res = await this.axios.get("/users.php?a=delete", {
        params: {
          // 找到表中对用的数组中对应的id
          id: that.tableData[index].id
        }
      });
      if (res.data.code === 0) {
        this.$message({
          message: "删除成功",
          type: "success"
        });
      } else {
        this.$message.error(res.data.msg);
      }
      // 找到对应的索引删除
      // row.splice(index, 1);
      console.log(index);
    },
    sizeChange(val) {
      this.pageSize = val;
      // 调用ajax
      this.getdata();
    },
    handleCurrentChange(val) {
      this.currentPage = val;
      // console.log(`当前页: ${val}`);调用ajax
      this.getdata();
    },
    //全部删除
    alldel() {
      // 获取要删除的数据
      this.$refs.list.selection.forEach(async (v) => {
        console.log(v);
        var res = await this.axios.get("/users.php?a=delete", {
        params: {
          // 找到表中对用的数组中对应的id
          id: v.id
        }
        });
        if (res.data.code === 0) {
        this.$message({
          message: "删除成功",
          type: "success"
        });
      } else {
        this.$message.error(res.data.msg);
      }
      });
    },
    // 取消全选
    cancel() {
      // 于多选表格，清空用户的选择
      this.$refs.list.clearSelection();
    },
    // 封装一个ajax函数
    async getdata() {
      // 调用ajax 等待他的返回
      var res = await this.axios.get("/users.php?a=list", {
        params: {
          currentPage: this.currentPage,
          pageSize: this.pageSize
        }
      });
      // 获取所有列表并赋值进去
      this.tableData = res.data.data;
      // 总页数 转换为数字
      this.total = parseInt(res.data.total);
    },
    // 确认修改
    async submitForm() {
      var res = await this.axios.post(
        "/users.php?a=edit",
        this.qs.stringify(this.form)
      );
      if (res.data.code === 0) {
        // 提示信息
        this.$message({
          message: "恭喜你修改成功",
          type: "success"
        });
        this.dialogVisible = false;
      } else {
        this.$message.error(res.data.msg);
        return false;
      }
    }
  }
};
</script>
<style>
.user_list {
  background: #ffffff;
  text-align: left;
}
.user_list .page {
  margin: 30px 20px;
}
.user_list .btn {
  margin-left: 20px;
}
.user_list .el-divider--horizontal {
  margin: 15px 0;
}
</style>