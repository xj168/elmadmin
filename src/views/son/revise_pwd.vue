<template>
  <div class="revise">
    <!-- 账号修改 -->
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>修改密码</span>
      </div>
      <div class="text item">
        <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
          <el-form-item label="原密码" prop="oldPassword">
            <el-input type="password" v-model="ruleForm.oldPassword"></el-input>
          </el-form-item>
          <el-form-item label="密码" prop="newPassword">
            <el-input type="password" v-model="ruleForm.newPassword"></el-input>
          </el-form-item>
          <el-form-item label="确认密码" prop="checkPass">
            <el-input type="password" v-model="ruleForm.checkPass"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="submitForm('ruleForm')">提交</el-button>
            <el-button @click="resetForm('ruleForm')">重置</el-button>
          </el-form-item>
        </el-form>
      </div>
    </el-card>
  </div>
</template>

<script>
export default {
  data() {
    //密码强度正则，最少6位，包括至少，1个小写字母，1个数字
    var pPattern = /^.*(?=.{6,})(?=.*\d)(?=.*[a-z]).*$/;
    var validatePass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入密码"));
      } else if (!pPattern.test(value)) {
        callback(new Error("最少6位，1个小写字母，1个数字"));
      } else {
        if (this.ruleForm.checkPass !== "") {
          this.$refs.ruleForm.validateField("checkPass");
        }
        callback();
      }
    };
    // 验证是否重复
    var validatePass2 = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请再次输入密码"));
      } else if (value !== this.ruleForm.newPassword) {
        callback(new Error("两次输入密码不一致!"));
      } else {
        callback();
      }
    };
    // 验证原密码是否正确
    var validatePass1 = async (rule, value, callback) => {
      let id = sessionStorage.getItem("id");      
      var res=await this.axios.get(`/users.php?a=readOne&id=${id}`)
      console.log(res.data);
      if (value !== res.data.data.password) {
        callback(new Error("原密码不正确"));
      } else {
        callback();
      }
    };
    return {
      ruleForm: {
        // 新密码
        newPassword: "",
        // 确认密码
        checkPass: "",
        // 旧密码
        oldPassword: ""
      },
      rules: {
        newPassword: [{ validator: validatePass, trigger: "blur" }],
        checkPass: [{ validator: validatePass2, trigger: "blur" }],
        oldPassword: [{ validator: validatePass1, trigger: "blur" }]
      }
    };
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate(async valid => {
        if (valid) {
          var that = this;
          // 获取id
          let id = sessionStorage.getItem("id");
          // // 获取令牌
          let token = sessionStorage.getItem("token");
          console.log(id);
          var res = await this.axios.post(
            "/users.php?a=chgpwd",
            // this.qs.stringify(this.ruleForm)+`&id=${id}&token=${token}`
            `oldPassword=${this.ruleForm.oldPassword}&newPassword=${this.ruleForm.newPassword}&id=${id}&token=${token}`
          );
          console.log(res.data);

          if (res.data.code === 0) {
            // 提示信息
            that.$message({
              message: "恭喜你，添加成功",
              type: "success"
            });
            this.$router.push("/");
          } else {
            that.$message.error(res.data.msg);
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
.revise {
  background: #ffffff;
  text-align: left;
}
.revise .demo-ruleForm {
  width: 400px;
}
/* 清楚前面*号样式 */
.el-form-item.is-required:not(.is-no-asterisk)
  .el-form-item__label-wrap
  .el-form-item__label:before,
.el-form-item.is-required:not(.is-no-asterisk) .el-form-item__label:before {
  content: "";
}
</style>