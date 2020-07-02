<template>
    <div class="add_shop">
        <el-card class="box-card">
            <div slot="header" class="clearfix">
                <span>添加商品</span>
            </div>
            <div class="text item">
                <el-form ref="form" :model="form" label-width="80px">
                    <el-form-item label="商品名称">
                        <el-input v-model="form.goodsname"></el-input>
                    </el-form-item>
                    <el-form-item label="商品区域">
                        <el-select v-model="form.goodscategory" placeholder="请选择商品">
                            <el-option label="电子产品" value="电子产品"></el-option>
                            <el-option label="服饰鞋帽" value="服饰鞋帽"></el-option>
                            <el-option label="食品" value="食品"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="商品特色">
                        <el-checkbox-group v-model="form.goodsfeature">
                            <el-checkbox label="新品上市" name="type"></el-checkbox>
                            <el-checkbox label="第二杯半价" name="type"></el-checkbox>
                            <el-checkbox label="主打产品" name="type"></el-checkbox>
                            <el-checkbox label="火爆产品" name="type"></el-checkbox>
                            <el-checkbox label="祖传手艺" name="type"></el-checkbox>
                            <el-checkbox label="源自四川" name="type"></el-checkbox>
                        </el-checkbox-group>
                    </el-form-item>
                    <el-form-item label="上传图片">
                        <el-upload action="http://work.08321.org/sell/goods.php?a=uploadImg" list-type="picture-card"
                         :on-success="upSuccess">
                            <i class="el-icon-plus"></i>
                        </el-upload>
                        <el-dialog :visible.sync="dialogVisible">
                            <img width="100%" :src="this.form.imgUrl" alt="">
                        </el-dialog>
                    </el-form-item>
                    <el-form-item label="是否促销">
                        <el-radio-group v-model="form.isPromotion">
                            <el-radio label="促销"></el-radio>
                            <el-radio label="不促销"></el-radio>
                        </el-radio-group>
                    </el-form-item>
                    <el-form-item label="食品规格">
                        <el-radio-group v-model="form.standard">
                            <el-radio label="单规格"></el-radio>
                            <el-radio label="多规格"></el-radio>
                        </el-radio-group>
                    </el-form-item>
                    <el-form-item label="包装费">
                        <template>
                            <el-input-number v-model="form.packprice" :min='0'></el-input-number>
                        </template>
                    </el-form-item>
                    <el-form-item label="价格">
                        <template>
                            <el-input-number v-model="form.price" :min='0'></el-input-number>
                        </template>
                    </el-form-item>
                    <el-form-item label="商品描述">
                        <el-input type="textarea" v-model="form.goodsdesc"></el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" @click="onSubmit">立即创建</el-button>
                        <el-button>取消</el-button>
                    </el-form-item>
                </el-form>
            </div>
        </el-card>
    </div>
</template>

<script>
export default {
  data() {
    return {
      form: {
        goodsname: "",
        goodscategory: "电子产品",
        goodsfeature: ["新品上市"],
        imgUrl: "",
        isPromotion: "促销",
        standard: "单规格",
        packprice: "",
        price: "",
        goodsdesc: ""
      },
      dialogVisible: false
    };
  },
  methods: {
    async onSubmit() {
      // 修改this指向
      var that = this;
      //   保存在obj里面  用qs一起提交
      let obj = {
        goodsname: this.form.goodsname,
        goodscategory: this.form.goodscategory,
        goodsfeature: this.form.goodsfeature.join(),
        imgUrl: this.form.imgUrl,
        isPromotion: this.form.isPromotion,
        standard: this.form.standard,
        packprice: this.form.packprice,
        price: this.form.price,
        goodsdesc: this.form.goodsdesc
      };

      var res = await this.axios.post(
        "/goods.php?a=add",
        this.qs.stringify(obj)
      );
      console.log(res.data);
      
      if (res.data.code === 0) {
        that.$message({
          message: "恭喜你添加成功",
          type: "success"
        });
        this.$router.push("/index/shopplist")
      } else {
        that.$message.error(res.data.msg);
      }
    },
    // 上传成功
    upSuccess(res){
        // console.log(res);
        // 拼接图片地址
        this.form.imgUrl="http://work.08321.org"+res.data;
    }
  }
};
</script>
<style>
.add_shop {
  background: #ffffff;
  text-align: left;
}
.add_shop .el-form {
  width: 535px;
}
</style>