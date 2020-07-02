<template>
  <div class="adindex">
    <el-row :gutter="20">
      <el-col :span="6">
        <div class="grid-content bg-purple">
          <el-row :gytter="20">
            <el-col :span="12" class="mag-top"><img src="../../assets/4dfde7f28ace31f0f499243da14a466.png" style="width:70px;margin-top:-6px;"></el-col>
            <el-col :span="12" class="mag-top">
              <p class="weit">总订单</p>
              <p>10240</p>
            </el-col>
          </el-row>
        </div>
      </el-col>
      <el-col :span="6">
        <div class="grid-content bg-purple">
          <el-row :gytter="20">
            <el-col :span="12" class="mag-top"><img src="../../assets/6f2e2d5dd9d0e23fdcb5e7bf0ebdd8d.png" style="width:70px;margin-top:-4px;"></el-col>
            <el-col :span="12" class="mag-top">
              <p class="weit">总订单</p>
              <p>10240</p>
            </el-col>
          </el-row>
        </div>
      </el-col>
      <el-col :span="6">
        <div class="grid-content bg-purple">
          <el-row :gytter="20">
            <el-col :span="12" class="mag-top"><img src="../../assets/4d7861fe0a13c5bf3f3eb833d89e266.png" style="width:70px;margin-top:-6px;"></el-col>
            <el-col :span="12" class="mag-top">
              <p class="weit">总订单</p>
              <p>10240</p>
            </el-col>
          </el-row>
        </div>
      </el-col>
      <el-col :span="6">
        <div class="grid-content bg-purple">
          <el-row :gytter="20">
            <el-col :span="12" class="mag-top"><img src="../../assets/55dd713a833a77ee5673f40eabce5d9.png" style="width:70px;margin-top:-6px;"></el-col>
            <el-col :span="12" class="mag-top">
              <p class="weit">总订单</p>
              <p>10240</p>
            </el-col>
          </el-row>
        </div>
      </el-col>
    </el-row>
    <!-- 数据表报 -->
    <el-row>
      <el-col :span="24">
        <div class="mychart">
          <div id="myChart" :style="{width: '100%', height: '700px'}"></div>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  data() {
    return {
      x:[],
      y:[],
      y1:[]
    };
  },
  async mounted() {
    // 商品统计
    let res = await this.axios.get("/counter.php?a=goods&field=date");
    console.log(res.data);
    res.data.data.forEach(v => {
      // 把数据添加在x轴
      this.x.push(v.ctime);
      this.y.push(v.num);
    });

    //  用户统计
    let res1 = await this.axios.get("/counter.php?a=users&field=date");
    console.log(res1.data);
    res1.data.data.forEach(v => {
      // 把数据添加在x轴
      this.y1.push(v.num);
    });
    // 基于准备好的dom，初始化echarts实例
    var myChart = this.$echarts.init(document.getElementById("myChart"));
    // 绘制图表
    myChart.setOption({
      title: {
        text: "数据统计"
      },
      tooltip: {
        trigger: "axis"
      },
      legend: {
        data: ["商品统计", "用户统计"]
      },
      grid: {
        left: "3%",
        right: "4%",
        bottom: "3%",
        containLabel: true
      },
      toolbox: {
        feature: {
          saveAsImage: {}
        }
      },
      xAxis: {
        type: "category",
        boundaryGap: false,
        data: this.x
      },
      yAxis: {
        type: "value"
      },
      series: [
        {
          name: "商品统计",
          type: "line",
          data: this.y
        },
        {
          name: "用户统计",
          type: "line",
          data: this.y1
        }
      ]
    });
  }
};
</script>
<style>
.bg-purple {
  background: #ffffff;
}
.grid-content {
  border-radius: 4px;
  height: 100px;
  font-weight: 600;
  font-size: 24px;
}
.grid-content i {
  font-size: 60px;
  text-align: right;
}
.weit {
  color: #cccccc;
}
.mag-top {
  margin-top: 20px;
}
.mychart {
  padding-top: 30px;
  margin-top: 50px;
  background: #ffffff;
}
</style>