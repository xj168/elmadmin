<template>
  <div class="order_info">
    <el-form :inline="true" :model="formInline" class="demo-form-inline">
      <el-form-item label="选择时间">
        <el-date-picker v-model="formInline.value1" type="datetimerange" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期">
        </el-date-picker>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">查询</el-button>
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
  data() {
    return {
      formInline: {
        value1: [new Date(2000, 10, 10, 10, 10), new Date(2000, 10, 11, 10, 10)]
      },
      y:[],
      x:[]
    };
  },
  methods: {
    onSubmit() {
      console.log("submit!");
    }
  },
  async mounted() {
    let res1 = await this.axios.get("/counter.php?a=users&field=group");
    console.log(res1.data);
    res1.data.data.forEach(v => {
      this.x.push(v.userGroup)
      // 把数据添加在y轴
      this.y.push(v.num);
    });
    // 基于准备好的dom，初始化echarts实例
    var myChart = this.$echarts.init(document.getElementById("myChart"));
    // 绘制图表
    myChart.setOption({
    color: ['#12d4f1'],
    tooltip: {
        trigger: 'axis',
        axisPointer: {            // 坐标轴指示器，坐标轴触发有效
            type: 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
        }
    },
    grid: {
        left: '3%',
        right: '4%',
        bottom: '3%',
        containLabel: true
    },
    xAxis: [
        {
            type: 'category',
            data: this.x,
            axisTick: {
                alignWithLabel: true
            }
        }
    ],
    yAxis: [
        {
            type: 'value'
        }
    ],
    series: [
        {
            name: '直接访问',
            type: 'bar',
            barWidth: '60%',
            data: this.y
        }
    ]
    });
  }
};
</script>
<style>
.order_info {
  text-align: left;
}
.order_info .mychart {
  padding-top: 30px;
  background: #ffffff;
}
</style>