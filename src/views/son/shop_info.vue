<template>
    <div class="shop_info">
        <el-form :inline="true" :model="formInline" class="demo-form-inline">
            <el-form-item label="选择时间">
                <el-date-picker v-model="formInline.value1" type="datetimerange" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期">
                </el-date-picker>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="onSubmit">查询</el-button>
                <!-- <p>{{formInline.y}}</p> -->
            </el-form-item>
        </el-form>
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
  // 商品统计
  async mounted(){
    let res =await this.axios.get("/counter.php?a=goods&field=category")
    console.log(res.data);
    res.data.data.forEach(v => {
      // 把数据添加在x轴
      this.formInline.x.push(v.goodscategory);
      this.formInline.y.push(v.num)
    });
     // 基于准备好的dom，初始化echarts实例
    var myChart = this.$echarts.init(document.getElementById("myChart"));
    // 绘制图表
    myChart.setOption({
      title: {
        text: "堆叠区域图"
      },
      tooltip: {
        trigger: "axis",
        axisPointer: {
          type: "cross",
          label: {
            backgroundColor: "#AED4C2"
          }
        }
      },
      legend: {
        data: ["商品统计"]
      },
      toolbox: {
        feature: {
          saveAsImage: {}
        }
      },
      grid: {
        left: "3%",
        right: "4%",
        bottom: "3%",
        containLabel: true
      },
      xAxis: [
        {
          type: "category",
          boundaryGap: false,
          data: this.formInline.x
        }
      ],
      yAxis: [
        {
          type: "value"
        }
      ],
      series: [
        {
          name: "商品统计",
          type: "line",
          stack: "总量",
          areaStyle: {
            color:"#5bd14b"
          },
          lineStyle:{
            color:"#52cf42"
          },
          data: this.formInline.y,
        },
      ]
    });
  },
  data() {
    return {
      formInline: {
        x: [],
        y: [],
        value1: [new Date(2000, 10, 10, 10, 10), new Date(2000, 10, 11, 10, 10)]
      }
    };
  },
  methods: {
    onSubmit() {
      console.log("submit!");
    }
  },
};
</script>
<style>
.shop_info {
  text-align: left;
}
.shop_info .mychart{
    padding-top: 15px;
    padding-left: 15px;
    background: #ffffff;
}
</style>