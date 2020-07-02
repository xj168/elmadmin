<template>
  <div class="shop_list">
    <!-- 商品列表 -->
    <el-card class="box-card">
      <template>
        <el-table :data="tableData" style="width: 100%">
          <el-table-column type="expand">
            <template slot-scope="props">
              <el-form label-position="left" inline class="demo-table-expand">
                <el-form-item label="商品名称">
                  <span>{{ props.row.goodsname }}</span>
                </el-form-item>
                <el-form-item label="所属店铺">
                  <span>{{ props.row.goodsfeature }}</span>
                </el-form-item>
                <el-form-item label="商品 ID">
                  <span>{{ props.row.id }}</span>
                </el-form-item>
                <el-form-item label="图片">
                  <el-image style="width: 100px; height: 100px" :src="props.row.imgUrl"></el-image>
                  <!-- <span>{{ props.row.id }}</span> -->
                </el-form-item>
                <el-form-item label="店铺 ID">
                  <span>{{ props.row.packprice }}</span>
                </el-form-item>
                <el-form-item label="商品分类">
                  <span>{{ props.row.goodscategory }}</span>
                </el-form-item>
                <el-form-item label="店铺地址">
                  <span>{{ props.row.isPromotion }}</span>
                </el-form-item>
                <el-form-item label="商品描述">
                  <span>{{ props.row.goodsdesc }}</span>
                </el-form-item>
              </el-form>
            </template>
          </el-table-column>
          <el-table-column label="商品 ID" prop="id">
          </el-table-column>
          <el-table-column label="头像">
            <template slot-scope="scope">
                <el-avatar :src="scope.row.imgUrl"></el-avatar>
              </template>
          </el-table-column>
          <el-table-column label="商品名称" prop="goodsname">
          </el-table-column>
          <el-table-column label="描述" prop="goodsdesc">
          </el-table-column>
          <el-table-column label="操作">
            <template slot-scope="scope">
              <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
              <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
      </template>
      <div class="page">
        <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" layout="total,sizes,prev, pager, next, jumper" :page-size='pageSize' :page-sizes=[5,10,15] :current-page='currentPage' :total="total">
        </el-pagination>
      </div>
    </el-card>
  </div>
</template>

<script>
export default {
  // 改成同步异步处理
  created() {
    // 调用ajax
    this.getdata();
  },
  data() {
    return {
      tableData: [
        {
          id: "",
          ctime: "",
          goodsname: "",
          goodscategory: "",
          goodsfeature: "",
          imgUrl: "",
          isPromotion: "",
          standard: "",
          packprice: "",
          price: "",
          goodsdesc: ""
        }
      ],
      // 分页数据
      total: 50, //总共多少页
      currentPage: 1, //当前页,
      pageSize: 5
    };
  },
  methods: {
    handleEdit(index, row) {
      console.log(index, row);
      // 发送参数
      this.$router.push("/index/amend_shop/" + row.id);
    },
    // 删除
    async handleDelete(index) {
      var res = await this.axios.get("/goods.php?a=delete", {
        params: {
          // 找到表中对用的数组中对应的id
          id: this.tableData[index].id
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
      // console.log(index, row);
    },
    // 分页
    handleSizeChange(val) {
      this.pageSize = val;
      // 调用函数
      this.getdata();
      // console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
      this.currentPage = val;
      // 调用函数
      this.getdata();
      // console.log(`当前页: ${val}`);
    },
    async getdata() {
      // 调用ajax 等待他的返回
      var res = await this.axios.get("/goods.php?a=list", {
        params: {
          currentPage: this.currentPage,
          pageSize: this.pageSize
        }
      });
      console.log(res.data);

      // 获取所有列表并赋值进去
      this.tableData = res.data.data;
      // 总页数 转换为数字
      this.total = parseInt(res.data.total);
    }
  }
};
</script>
<style>
.shop_list {
  background: #ffffff;
}
.demo-table-expand {
  font-size: 0;
}
.demo-table-expand label {
  width: 90px;
  color: #99a9bf;
}
.demo-table-expand .el-form-item {
  margin-right: 0;
  margin-bottom: 0;
  width: 50%;
}
.shop_list .page {
  margin-top: 30px;
  text-align: left;
}
</style>