<template>
  <div class="stor">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>用户信息</span>
      </div>
      <template>
        <div>
          <span>管理员id：</span>{{id}}
          <el-divider></el-divider>
          <span>账号：</span>{{account}}
          <el-divider></el-divider>
          <span>用户组：</span>{{userGroup}}
          <el-divider></el-divider>
          <span>创建时间：</span>{{ctime}}
          <el-divider></el-divider>
          <template>
            <div class="demo-type">
              <span>上传图片：</span>
              <el-upload class="avatar-uploader"
              action="http://work.08321.org/sell/goods.php?a=uploadImg" 
              :show-file-list="false" 
              :on-success="handleAvatarSuccess" 
              :before-upload="beforeAvatarUpload">
                <img v-if="imgUrl" :src="imgUrl" class="avatar">
                <i v-else class="el-icon-plus avatar-uploader-icon"></i>
              </el-upload>
            </div>
          </template>
          <el-divider></el-divider>
        </div>
      </template>
    </el-card>
  </div>
</template>

<script>
// 引入ajax
export default {
  created() {
    // //获取储存在本地的id
    // let id = sessionStorage.getItem("id");
    // console.log(id);
    // var that = this;
    // // get调用方式
    // var res=await this.axios.get("/users.php?a=readOne", {
    //     params: {
    //       id: id
    //     }
    //   })
    //     // console.log(res.data);
    //     // 遍历循环对象
    //     for (const key in res.data.data) {
    //       // 动态用[]来获取
    //       that[key] = res.data.data[key];
    //     }
        let userinfo = JSON.parse(sessionStorage.getItem("userinfo"));
      for(const key in userinfo.data){
      this[key]=userinfo.data[key]
      }
  },
  data() {
    return {
      account: "",
      id: "",
      userGroup: "",
      ctime: "",
      imgUrl: ""
    };
  },
  methods: {
    // 上传成功后
    async handleAvatarSuccess(res) {
      console.log(res);
      // 上传图片拼接地址
      this.imgUrl = "http://work.08321.org"+res.data;
      // 调用接口
      let d=await this.axios.post("/users.php?a=chgImg",`id=${this.id}&imgUrl=${this.imgUrl}`)
      console.log(d);
      if(d.data.code===0){
        this.$message({
          message: "上传成功",
          type: "success"
        });
        // this.$router.push('/');
      }else{
        this.$message.error(d.data.msg);
      }
    },
    // 上传前
    beforeAvatarUpload(file) {
      const isJPG = file.type === "image/jpeg";
      const isLt1M = file.size / 1024 / 1024 < 2;

      if (!isJPG) {
        this.$message.error("上传头像图片只能是 JPG 格式!");
      }
      if (!isLt1M) {
        this.$message.error("上传头像图片大小不能超过 2MB!");
      }
      return isJPG && isLt1M;
    }
  }
};
</script>
<style>
.stor {
  /* height: 100%; */
  background: #ffffff;
  text-align: left;
}
.stor .demo-type span {
  vertical-align: 89px;
}
.stor .el-card__body span {
  display: inline-block;
  width: 100px;
  text-align: right;
}
.stor .avatar-uploader {
  display: inline-block;
}
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}
.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>