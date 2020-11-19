<template>
  <div>
    <div class="article">
      <el-row>
        <el-col :span="7">
          <el-row>
            <div class="span_title ">今日航行状态
              <el-button :plain="true" type="info-two" class="today_button">详情</el-button>
            </div>
          </el-row>
          <svg height="10" style="width: 525px" >
              <line x1="15" y1="0" x2="525" y2="0" style="stroke:#00D491; stroke-width:2"></line>
            </svg>
          <el-row>
            <el-col :span="8">
              <div class="shipinfo_position" id="shipStatus1">
                <el-progress type="circle" color="red" :percentage="100" ></el-progress>
                <div class="shipinfo_remark">上行过闸</div>
              </div>
            </el-col>
            <el-col :span="8">
              <div class="shipinfo_position" id="shipStatus2">
                <el-progress type="circle" :percentage="100"></el-progress>
                <div class="shipinfo_remark">上行待闸</div>
              </div>
            </el-col>
            <el-col :span="8">
              <div class="shipinfo_position" id="shipStatus3">
                <el-progress type="circle" :percentage="100"></el-progress>
                <div class="shipinfo_remark">上行总数</div>
              </div>
            </el-col>
          </el-row>
          <svg height="10" style="width: 525px">
              <line x1="15" y1="0" x2="525" y2="0" style="stroke:#00D491; stroke-width:2"></line>
            </svg>
          <el-row>
            <el-col :span="8">
              <div class="shipinfo_position" id="shipStatus4">
                <el-progress type="circle" :percentage="100"></el-progress>
                <div class="shipinfo_remark">下行过闸</div>
              </div>
            </el-col>
            <el-col :span="8">
              <div class="shipinfo_position" id="shipStatus5">
                <el-progress type="circle" :percentage="100"></el-progress>
                <div class="shipinfo_remark">下行待闸</div>
              </div>
            </el-col>
            <el-col :span="8">
              <div class="shipinfo_position" id="shipStatus6">
                <el-progress type="circle" :percentage="100"></el-progress>
                <div class="shipinfo_remark">下行总数</div>
              </div>
            </el-col>
          </el-row>
          <svg height="10" style="width: 525px">
              <line x1="15" y1="0" x2="525" y2="0" style="stroke:#00D491; stroke-width:2"></line>
            </svg>
          <el-row>
            <div class="span_title ">各阶段用时统计
              <el-button :plain="true" type="info-two" class="today_button">详情</el-button>
            </div>
          </el-row>
          <svg height="10" style="width: 525px" >
            <line x1="15" y1="0" x2="525" y2="0" style="stroke:#00D491; stroke-width:2"></line>
          </svg>
          <el-row>
            <div class="stage_time">
              <el-table
                :data="tableData"
                :show-header="false"
                style="width: 100%"
                :default-sort = "{prop: 'date', order: 'descending'}"
                >
                <el-table-column
                  prop="stage_type"
                  align="left"
                  label="阶段状态">
                </el-table-column>
                <el-table-column
                  prop="spend_time"
                  label="阶段耗时"
                  align="right"
                  sortable>
                </el-table-column>
              </el-table>
            </div>
          </el-row>
        </el-col>
        <el-col :span="10">
          <el-row>
            <homemap></homemap>
          </el-row>
          <el-row>
            <div class="date_select">
              选择时间维度：
              <el-radio-group v-model="date_type">
                <el-radio label="day">日</el-radio>
                <el-radio label="month">月</el-radio>
                <el-radio label="year">年</el-radio>
              </el-radio-group>
            </div>
            <div class="cargo_arrived_type" id="cargo_arrived">
            </div>
          </el-row>
        </el-col>
        <el-col :span="7">
          <el-row>
            <div class="span_title ">今日到港
              <el-button :plain="true" type="info-two" class="today_button">详情</el-button>
            </div>
            <div class="todayCargoMuch">
                <span>34598310</span>吨
            </div>
          </el-row>
          <svg height="10" style="width: 525px" >
            <line x1="15" y1="0" x2="525" y2="0" style="stroke:#00D491; stroke-width:2"></line>
          </svg>
          <el-row>
            <div class="span_title ">今日挂牌价（金陵石化）
              <el-button :plain="true" type="info-two" class="today_button">详情</el-button>
            </div>
            <div class="todayCargoMoney">
              <span>3459/</span> 吨
            </div>
          </el-row>
          <svg height="10" style="width: 525px" >
            <line x1="15" y1="0" x2="525" y2="0" style="stroke:#00D491; stroke-width:2"></line>
          </svg>
          <el-row>
            <div class="span_title ">即将到港</div>
            <svg height="10" style="width: 525px" >
            <line x1="15" y1="0" x2="525" y2="0" style="stroke:#00D491; stroke-width:2"></line>
            </svg>
            <div class="estimate_arrived">
              <el-table
                :data="estimateArrived"
                style="width: 100%"
                :default-sort = "{prop: 'date', order: 'descending'}"
                >
                <el-table-column
                  prop="id"
                  align="center"
                  label="序号">
                </el-table-column>
                <el-table-column
                  prop="ship_name"
                  align="center"
                  label="船名">
                </el-table-column>
                <el-table-column
                  prop="zaizhong"
                  align="center"
                  label="载重">
                </el-table-column>
                <el-table-column
                  prop="now_position"
                  align="center"
                  label="当前位置">
                </el-table-column>
                <el-table-column
                  prop="estimate_pubdate"
                  width="150"
                  label="预到日期"
                  align="center"
                  sortable>
                </el-table-column>
              </el-table>
            </div>
            <div class="span_title ">
              <el-button :plain="true" type="info-two" class="today_button">详情</el-button>
            </div>
          </el-row>
        </el-col>
      </el-row>
    </div>
  </div>

</template>


<script>
import homemap from './homemap'
export default {
  name: 'shipinfo',
  data () {
    return {
      date_type: "day",
      ship_type: {
        'no1': 9
      },
      tableData: [
        {
          "stage_type": "出发->待闸",
          "spend_time": "13天",
        },
        {
          "stage_type": "待闸期",
          "spend_time": "3天",
        },
        {
          "stage_type": "过闸->过闸",
          "spend_time": "3天",
        },
        {
          "stage_type": "卸货期",
          "spend_time": "3天",
        }
      ],
      estimateArrived: [
        {
          "id": "1",
          "ship_name": "大洋98",
          "zaizhong": "3000",
          "now_position": "宜昌",
          "estimate_pubdate": "11:20",
        },
        {
          "id": "1",
          "ship_name": "大洋98",
          "zaizhong": "3000",
          "now_position": "宜昌",
          "estimate_pubdate": "11:20",
        },
        {
          "id": "1",
          "ship_name": "大洋98",
          "zaizhong": "3000",
          "now_position": "宜昌",
          "estimate_pubdate": "11:20",
        },
        {
          "id": "1",
          "ship_name": "大洋98",
          "zaizhong": "3000",
          "now_position": "宜昌",
          "estimate_pubdate": "11:20",
        },
        {
          "id": "1",
          "ship_name": "大洋98",
          "zaizhong": "3000",
          "now_position": "宜昌",
          "estimate_pubdate": "11:20",
        },
      ]

    }
  },
  components: {
    homemap
  },
  mounted(){
    this.getCargoArrived();
    this.getData();
  },
  methods:{
    getData(){
      document.getElementById("shipStatus1").querySelector('.el-progress__text').innerText = 9;
      document.getElementById("shipStatus2").querySelector('.el-progress__text').innerText = 12;
      document.getElementById("shipStatus3").querySelector('.el-progress__text').innerText = 21;
      document.getElementById("shipStatus4").querySelector('.el-progress__text').innerText = 8;
      document.getElementById("shipStatus5").querySelector('.el-progress__text').innerText = 20;
      document.getElementById("shipStatus6").querySelector('.el-progress__text').innerText = 28;
      $(".shipinfo_position .el-progress__text").css({"font-size": "32px"})
    },
    getCargoArrived(){
      var colors = "#675bba"
      let option = {
        color: colors,

        tooltip: {
          trigger: 'axis',
          axisPointer: {
              type: 'cross'
          }
        },
        grid: {
          right: '20%'
        },
        // toolbox: {
        //   feature: {
        //     dataView: {show: true, readOnly: false},
        //     restore: {show: true},
        //     saveAsImage: {show: true}
        //   }
        // },
        // legend: {
        //   data: ['蒸发量', '平均温度']
        // },
        xAxis: [
          {
            type: 'category',
            axisTick: {
                alignWithLabel: true
            },
            data: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月']
          }
        ],
        yAxis: [
          {
            type: 'value',
            name: '温度',
            min: 0,
            max: 25,
            position: 'left',
            axisLine: {
              lineStyle: {
                color: colors
              }
            },
            axisLabel: {
                formatter: '{value} °C'
            }
          }
        ],
        series: [
          {
            name: '蒸发量',
            type: 'bar',
            data: [2.0, 2.2, 3.3, 4.5, 6.3, 10.2, 20.3, 23.4, 23.0, 16.5, 12.0, 6.2]
          },
          {
            name: '平均温度',
            type: 'line',
            data: [2.0, 2.2, 3.3, 4.5, 6.3, 10.2, 20.3, 23.4, 23.0, 16.5, 12.0, 6.2]
          }
        ]
      };
      console.log("...............", document.getElementById("cargo_arrived"))
      let echart = this.$echarts.init(document.getElementById("cargo_arrived"));
      echart.setOption(option);
    },
  },

}
</script>

<style>


</style>>