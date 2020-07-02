<template>
  <div class="add_user">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>修改用户</span>
      </div>
      <div class="text item">
        <el-form ref="form" :model="form" :rules="rules" style="width:400px;" class="demo-ruleForm" label-width="100px" hide-required-asterisk>
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
  async created() {
    //    接收传过来的参数
    let id = this.$route.params.id;
    this.form.id=id;
    console.log(id);
     //获取储存在本地的id
    console.log(id);
    // get调用方式
    var res=await this.axios.get("/users.php?a=readOne", {
        params: {
          id: id
        }
      })
        console.log(res.data);
        this.form.account= res.data.data.account
        this.form.userGroup= res.data.data.userGroup
  },
  data() {
    // 自定义验证用户名是否存在
    var checkAge = (rule, value, callback) => {
      if (!value) {
        return callback(new Error("用户名不能为空"));
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
        userGroup: "超级管理员",
        id:'',
      },
      // 声明验证规则
      rules: {
        account: [{ validator: checkAge, trigger: "blur" }]
      }
    };
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate(async valid => {
        if (valid) {
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