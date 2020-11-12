<template>
  <div class="map">
    <a-input-search
      v-model="address"
      id="searchMap"
      class="form-item-content"
      placeholder="请填写详细地址"
      enterButton="搜索地图"
      @search="handleSelectChange"
    />
    <div class="box">
      <div id="container" style="width: 500px; height: 300px"></div>
      <div id="panel"></div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      map: null,
      address: "崇贤街道木桥庄路2号",
      latitude: null,
      longitude: null,
    };
  },
  mounted() {
    this.init();
  },
  methods: {
    init() {
      this.map = new AMap.Map("container", {
        // center: [116.397428, 39.90923],
        resizeEnable: true,
        zoom: 10,
      });
      let geocoder = new AMap.Geocoder();
      // 点击地图任一点获取坐标值信息
      AMap.event.addListener(this.map, "click", (e) => {
        geocoder.getAddress(e.lnglat, (status, result) => {
          // 这是为了用经纬度通过地图获取到当前中文地址address
          if (status === "complete" && result.regeocode) {
            let adres = result.regeocode.addressComponent;
            let address = `${adres.township}${adres.street}${adres.streetNumber}`;
            this.map.clearMap();
            console.log(e, adres);
            let marker = new AMap.Marker({
              position: e.lnglat,
              title: address,
            });
            new AMap.InfoWindow({
              isCustom: false,
              content: "<span>" + address + "&nbsp;&nbsp;</span>",
              offset: new AMap.Pixel(0, -36),
              showShadow: true,
              closeWhenClickMap: true,
              autoMove: true,
            }).open(this.map, new AMap.LngLat(e.lnglat.lng, e.lnglat.lat));
            this.map.add(marker);
            this.latitude = e.lnglat.lat;
            this.longitude = e.lnglat.lng;
            this.address = address;
          }
        });
      });
    },
    handleSelectChange() {
      let address = this.address;
      AMap.service(["AMap.PlaceSearch"], () => {
        let obj = {
          city: "杭州市",
          pageSize: 5, // 单页显示结果条数
          pageIndex: 1, // 页码
          citylimit: true, //是否强制限制在设置的城市内搜索
          map: this.map, // 展现结果的地图实例
          panel: "panel", // 结果列表将在此容器中进行展示。
          autoFitView: true, // 是否自动调整地图视野使绘制的 Marker点都处于视口的可见范围
        };
        this.map.clearMap(); // 清除上一次搜索出来的坐标点
        let placeSearch = new AMap.PlaceSearch(obj);
        console.log(placeSearch, address);
        address &&
          placeSearch.search(address, (status, result) => {
            
            console.log(
              "点击搜索后：搜索结果状态，搜索结果列表",
              status,
              result
            );
          });
        // 点击地图上搜索出来的地址点出发事件
        AMap.event.addListener(placeSearch, "markerClick", (e) => {
          this.latitude = e.data.location.lat;
          this.longitude = e.data.location.lng;
          this.address = e.data.address;
          console.log("markerClick!!!!!!!!!", e.data);
          new AMap.InfoWindow({
            isCustom: false,
            content: "<span>" + e.data.address + "&nbsp;&nbsp;</span>",
            offset: new AMap.Pixel(0, -36),
            showShadow: true,
            closeWhenClickMap: true,
            autoMove: true,
          }).open(
            this.map,
            new AMap.LngLat(e.data.location.lng, e.data.location.lat)
          );
        });
        // 点击搜索列表中地址触发事件
        AMap.event.addListener(placeSearch, "listElementClick", (e) => {
          this.map.clearInfoWindow();
          this.latitude = e.data.location.lat;
          this.longitude = e.data.location.lng;
          this.address = e.data.address;
          console.log("listElementClick!!!!!!!!!", e.data);
          new AMap.InfoWindow({
            isCustom: false,
            content: "<span>" + e.data.address + "&nbsp;&nbsp;</span>",
            offset: new AMap.Pixel(0, -36),
            showShadow: true,
            closeWhenClickMap: true,
            autoMove: true,
          }).open(
            this.map,
            new AMap.LngLat(e.data.location.lng, e.data.location.lat)
          );
        });
      });
    },
  },
};
</script>
<style lang="less" scoped>
.map {
  padding: 20px;
  background: #fff;
  #panel {
    // display: none;
  }
}
</style>
