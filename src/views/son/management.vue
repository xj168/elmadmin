<template>
  <div class="management">
    <el-card class="box-card">
      <div class="text item">
        <el-form :inline="true" :model="formInline" class="demo-form-inline">
          <el-form-item label="订单号">
            <el-input v-model="formInline.user" placeholder="订单号"></el-input>
          </el-form-item>
          <el-form-item label="收件人">
            <el-input v-model="formInline.user" placeholder="收件人"></el-input>
          </el-form-item>
          <el-form-item label="手机号">
            <el-input v-model="formInline.user" placeholder="手机号"></el-input>
          </el-form-item>
          <el-form-item label="点单状态">
            <el-select v-model="formInline.region" placeholder="订单状态">
              <el-option label="成功" value="shanghai"></el-option>
              <el-option label="失败" value="beijing"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="选择时间">
            <el-date-picker v-model="formInline.value1" type="datetimerange" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期">
            </el-date-picker>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="onSubmit">查询</el-button>
          </el-form-item>
        </el-form>
        <div class="table">
          <el-table :data="tableData" border style="min-width: 100%">
            <el-table-column fixed prop="date" label="订单号" min-width="15">
            </el-table-column>
            <el-table-column prop="name" label="订单时间" min-width="12">
            </el-table-column>
            <el-table-column prop="province" label="手机号" min-width="12">
            </el-table-column>
            <el-table-column prop="city" label="收货人" min-width="12">
            </el-table-column>
            <el-table-column prop="address" label="配送地址" min-width="30">
            </el-table-column>
            <el-table-column prop="zip" label="发送时间" min-width="12">
            </el-table-column>
            <el-table-column prop="zip" label="用户备注" min-width="12">
            </el-table-column>
            <el-table-column prop="zip" label="订单金额" min-width="12">
            </el-table-column>
            <el-table-column prop="zip" label="订单状态" min-width="12">
            </el-table-column>
            <el-table-column prop="zip" label="操作" min-width="10">
              <template slot-scope="scope">
                <el-button @click="handleClick(scope.row)" type="text" size="small">查看</el-button>
                <el-button type="text" size="small">编辑</el-button>
              </template>
            </el-table-column>
          </el-table>
        </div>
        <div class="page">
          <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" layout="total, prev, pager, next, jumper" :total="400">
          </el-pagination>
        </div>
      </div>
    </el-card>
  </div>
</template>

<script>
export default {
  data() {
    const item = {
      date: "2016-05-02",
      name: "王小虎",
      province: "上海",
      city: "普陀区",
      address: "上海市普陀区金沙江路 1518 弄",
      zip: 200333
    };
    return {
      formInline: {
        user: "",
        region: "",
        value1: [new Date(2000, 10, 10, 10, 10), new Date(2000, 10, 11, 10, 10)]
      },
      // 表格
      tableData: Array(15).fill(item)
    };
  },
  methods: {
    onSubmit() {
      console.log("submit!");
    },
    handleClick(row) {
      console.log(row);
    },
    // 分页
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
    }
  }
};
</script>
<style>
.management {
  background: #ffffff;
}
.management .table {
  margin-top: 40px;
}
.page {
  margin: 30px auto;
}
</style>