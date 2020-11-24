<template>
  <div class="echarts">
    <div ref="myChart" style="width: 100%; height: 500px"></div>

  </div>
</template>

<script>
import 'echarts/map/js/china';
export default {
  name: "echarts",
  data() {
    return {
      data: []
    };
  },
  mounted() {
    console.log(this.$echarts)
    this.data =  [
        { name: '黑龙江', area: '东北大区', type: 'areaCenterCity', value: '18' },
        { name: '吉林', area: '东北大区', type: 'areaCenterCity', value: '18' },
        { name: '辽宁', area: '东北大区', type: 'areaCenterCity', value: '6' },
        { name: '内蒙古', area: '其他', type: 'areaCenterCity', value: '9' },
        { name: '北京', area: '华北大区', type: 'areaCenterCity', value: '14' },
        { name: '天津', area: '华北大区', type: 'areaCenterCity', value: '11' },
        { name: '河北', area: '华北大区', type: 'areaCenterCity', value: '11' },
        { name: '山东', area: '华北大区', type: 'areaCenterCity', value: '11' },
        { name: '山西', area: '华北大区', type: 'areaCenterCity', value: '11' },
        { name: '江苏', area: '华东大区', type: 'areaCenterCity', value: '14' },
        { name: '上海', area: '华东大区', type: 'areaCenterCity', value: '15' },
        { name: '浙江', area: '华东大区', type: 'areaCenterCity', value: '16' },
        { name: '福建', area: '华南大区', type: 'areaCenterCity', value: '11' },
        { name: '广东', area: '华南大区', type: 'areaCenterCity', value: '12' },
        { name: '海南', area: '华南大区', type: 'areaCenterCity', value: '14' },
        { name: '台湾', area: '其他', type: 'areaCenterCity', value: '19' },
        { name: '香港', area: '其他', type: 'areaCenterCity', value: '1' },
        { name: '澳门', area: '其他', type: 'areaCenterCity', value: '0' },
        { name: '河南', area: '华北大区', type: 'areaCenterCity', value: '14' },
        { name: '安徽', area: '华中大区', type: 'areaCenterCity', value: '0' },
        { name: '江西', area: '华中大区', type: 'areaCenterCity', value: '1' },
        { name: '广东', area: '华南大区', type: 'areaCenterCity', value: '0' },
        { name: '陕西', area: '华西大区', type: 'areaCenterCity', value: '13' },
        { name: '湖北', area: '华中大区', type: 'areaCenterCity', value: '0' },
        { name: '湖南', area: '华中大区', type: 'areaCenterCity', value: '0' },
        { name: '广西', area: '华南大区', type: 'areaCenterCity', value: '11' },
        { name: '宁夏', area: '华西大区', type: 'areaCenterCity', value: '13' },
        { name: '重庆', area: '华西大区', type: 'areaCenterCity', value: '0' },
        { name: '贵州', area: '华西大区', type: 'areaCenterCity', value: '0' },
        { name: '四川', area: '华西大区', type: 'areaCenterCity', value: '13' },
        { name: '云南', area: '华西大区', type: 'areaCenterCity', value: '0' },
        { name: '甘肃', area: '华西大区', type: 'areaCenterCity', value: '13' },
        { name: '青海', area: '其他', type: 'areaCenterCity', value: '12' },
        { name: '西藏', area: '其他', type: 'areaCenterCity', value: '0' },
        { name: '新疆', area: '其他', type: 'areaCenterCity', value: '12' },
        { name: "南海诸岛", area: '南海诸岛', type: 'areaCenterCity', value: '0' }
      ]
    this.draw();
  },
  methods: {
    draw() {
      let myChart = this.$echarts.init(this.$refs.myChart);
      // 绘制图表
      myChart.setOption({
      tooltip: {
        show: false, // 不显示提示标签
        //鼠标放地图的某一块，显示的提示框
        formatter(params, ticket, callback) {
          // console.log(params)
          return `占比<br />${params.name}：${params.data.value}`
        },
        backgroundColor: 'rgba(1,1,1,0.5)', // 提示标签背景颜色
        textStyle: { color: '#fff' } // 提示标签字体颜色
      },
      visualMap: {
        min: 0,
        max: 20,
        text: ['高', '低'],
        realtime: false,
        calculable: true,
        inRange: {
          color: ['#fff', '#fff']
        }
      },
      grid: {
        left: '10%',
        right: '10%',
        top: '10%',
        bottom: '10%',
        containLabel: true
      },
      geo: {
        map: 'china',
        roam: false,
        zoom: 1.2,
        tooltip: {
          show: false, // 不显示提示标签
        },
        label: {
          normal: {
            show: false, // 显示省份标签
            textStyle: { color: '#c71585' }// 省份标签字体颜色
          },
          emphasis: {// 对应的鼠标悬浮效果
            show: false,
            textStyle: { color: '#800080' }
          }
        },
        itemStyle: {
          normal: {
            borderWidth: 0.5, // 区域边框宽度
            borderColor: '#000', // 区域边框颜色
            areaColor: '#ffefd5', // 区域颜色
            label: { show: false }
          },
          emphasis: {
            show: false,
            borderWidth: 0.5,
            borderColor: '#4b0082',
            areaColor: '#ffdead',
          }
        },
      },
      series: [
        {
          // 该部分是渲染地图上的省会城市文字
          type: 'scatter',
          coordinateSystem: 'geo',
          data:this.data,
          symbolSize: 1,
          symbolRotate: 40,
          label: {
            normal: {
              formatter: '{b}',
              position: 'top',
              show: true
            },
            emphasis: {
              show: false
            }
          },
          tooltip: {
            show: false, // 不显示提示标签
            // 显示提示的标签
            formatter(name) {
              return `Legend ${name}`;
            }, // 提示标签格式
            backgroundColor: '#fff', // 提示标签背景颜色
            borderColor: '#ccc',
            borderWidth: 5,
            textStyle: { color: '#000' } // 提示标签字体颜色
          },
          itemStyle: {
            normal: {
              color: 'black'
            }
          }
        },
        {
          type: 'map',
          mapType: 'china',
          roam: false,
          zoom: 1.2,
          tooltip: {
            show: false, // 不显示提示标签
          },
          label: {
            normal: {
              show: true // 显示省份标签
            },
          },
          itemStyle: {
            normal: {
              "areaColor": "#fff",
              borderWidth: 0.5, // 区域边框宽度
              borderColor: '#ccc', // 区域边框颜色
              label: { show: false }
            },
            emphasis: {
              show: false,
              "areaColor": "#1890ff"
            }
          },
          // geoIndex: 0,
          //鼠标放入地图显示提示框
          tooltip: { show: true },
          data:this.data
        }
      ],
    });
    },
  },
};
</script>

<style lang="less" scoped>
.echarts {
}
</style>
