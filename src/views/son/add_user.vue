<template>
  <div class="add_user">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>添加账号</span>
      </div>
      <div class="text item">
        <el-form ref="form" :model="form" :rules="rules" style="width:400px;" class="demo-ruleForm" label-width="100px" hide-required-asterisk>
          <el-form-item prop="account" label="用户名">
            <el-input v-model="form.account">
            </el-input>
          </el-form-item>
          <el-form-item prop="password" label="密码">
            <el-input type="password" v-model="form.password" autocomplete="off">
            </el-input>
          </el-form-item>
          <el-form-item label="用户名" prop="userGroup">
            <el-select v-model="form.userGroup" placeholder="请选择">
              <el-option label="管理员" value="管理员"></el-option>
              <el-option label="部门管理员" value="部门管理员"></el-option>
              <el-option label="超级管理员" value="超级管理员"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="submitForm('form')" class="btn">立即添加</el-button>
            <el-button @click="resetForm('form')">重置</el-button>
          </el-form-item>
        </el-form>
      </div>
    </el-card>
  </div>
</template>

<script>
// 引入ajax
export default {
  created() {},
  data() {
    // 自定义验证用户名是否存在
    var checkAge = (rule, value, callback) => {
      if (!value) {
        return callback(new Error("密码不能为空"));
      }
      setTimeout(async () => {
        var res = await this.axios.get("/users.php?a=userExists", {
          params: {
            account: value
          }
        });
        if (res.data.code === 0) {
          callback();
        } else {
          callback(new Error(res.data.msg));
        }
      }, 100);
    };
    return {
      form: {
        account: "",
        password: "",
        userGroup: "超级管理员"
      },
      // 声明验证规则
      rules: {
        account: [{ validator: checkAge, trigger: "blur" }],
        password: [
          // 密码自定义验证
          // { validator: checkAge, trigger: "blur" }
          { required: true, message: "请输入用户名", trigger: "blur" },
          { min: 6, max: 10, message: "长度在 6 到 10 个字符", trigger: "blur" }
        ]
      }
    };
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate(async valid => {
        if (valid) {
          var res = await this.axios.post(
            "http://work.08321.org/sell/users.php?a=add",
            this.qs.stringify(this.form)
          );
          if (res.data.code === 0) {
            // 提示信息
            this.$message({
              message: "恭喜你，添加成功",
              type: "success"
            });
          } else {
            this.$message.error(res.data.msg);
            return false;
          }
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    }
  }
};
</script>
<style>
.add_user {
  background: #ffffff;
  text-align: left;
}
</style>