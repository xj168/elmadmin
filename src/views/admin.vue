<template>
  <div class="admin">
    <div class="box">
      <el-form ref="form" :model="form" :rules="rules" style="width:400px;">
        <h2>系统登录</h2>
        <el-form-item prop="account">
          <el-input v-model="form.account">
            <i slot="prefix" class="el-icon-user-solid"></i>
          </el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input v-model="form.password" show-password>
            <i slot="prefix" class="el-icon-lock"></i>
          </el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm('form')" class="btn">立即登录</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
export default {
  created() {
    // 先清除本地缓存
      sessionStorage.clear();
  },
  data() {
    return {
      form: {
        account: "",
        password: ""
      },
      // 声明验证规则
      rules: {
        account: [
          { required: true, message: "请输入用户名", trigger: "blur" },
          { min: 2, max: 10, message: "长度在 2 到 10 个字符", trigger: "blur" }
        ],
        password: [
          { required: true, message: "请输入密码", trigger: "blur" },
          { min: 6, max: 10, message: "长度在 2 到 10 个字符", trigger: "blur" }
          // 密码自定义验证
          // { validator: checkAge, trigger: "blur" }
        ]
      }
    };
  },
  methods: {
    // 提交按钮同意验证
    submitForm(formName) {
      this.$refs[formName].validate(async valid => {
        if (valid) {
          // 改变this指向
          var that = this;
          // 调用ajax请求es6用qs拼接
          var res = await this.axios.post(
            "/users.php?a=login",
            this.qs.stringify(this.form)
          );
          console.log(res.data);

          if (res.data.code == 0) {
            // 成功就跳转
            // 提示框
            that.$message({
              message: "恭喜你登录成功",
              type: "success"
            });
            console.log(res.data);
            // 跳转到首页
            this.$router.push("/index");
            // 储存id
            var id = res.data.data.id;
            sessionStorage.setItem("id", id);
            // 储存令牌
            var token = res.data.token;
            sessionStorage.setItem("token", token);
            var userinfo = JSON.stringify(res.data);
            sessionStorage.setItem("userinfo", userinfo);
          } else {
            that.$message.error(res.data.msg);
            return false;
          }
        }
      });
    }
  }
};
</script>
<style>
.admin {
  width: 100%;
  height: 100%;
  background: #2d3a4b;
  /* 剧中 */
  display: flex;
  justify-content: center;
  align-items: center;
}
.box h2 {
  color: aliceblue;
  margin-bottom: 50px;
}
/* .box {
  display: flex;
  justify-content: center;
  align-items: center;
} */
.el-icon-user-solid,
.el-icon-lock {
  font-size: 20px;
}
.box input {
  border: 1px solid #c0c4cc;
  background: #2d3a4b;
}
.box .btn {
  width: 100%;
}
.admin .el-input__inner{
  color: rgb(253, 253, 253);
}
</style>

