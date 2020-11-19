<template>
<div id="myChart" :style="{width: '300px', height: '300px'}"></div>
</template>

<script>

export default {
  name: 'test',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App',
      opp : {
            title: { text: '在Vue中使用echarts' },
            tooltip: {},
            xAxis: {
                data: ["衬衫","羊毛衫","雪纺衫","裤子","高跟鞋","袜子"]
            },
            yAxis: {},
            series: [{
                name: '销量',
                type: 'bar',
                data: [5, 20, 36, 10, 10, 20]
            },
            ]
      }
    }
  },
  created(){
    this.drawLine(this.opp);
  },
  methods: {
    drawLine(opp){
        // 基于准备好的dom，初始化echarts实例
        let myChart = this.$echarts.init(document.getElementById('myChart'))
        // 绘制图表
        myChart.setOption(opp);
    }
  },
  watch:{
    opp: {
        handler(newVal, oldVal) {
            drawLine(newVal);
        },
        deep: true //对象内部属性的监听，关键。
      }
  }
}
</script>