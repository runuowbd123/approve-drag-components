<template>
  <div class="app-intro-page">
    <div class="app-logo-txt">
      <img :src="info.appImg" />
      <div>
        <div class="app-title">{{info.appName}}请问</div>
        <div class="app-dec">{{info.appDesc}}万千瓦</div>
      </div>
    </div>
    <a-divider />
    <div>
      <div class="pro-intro">产品介绍</div>
      <div class="pro-intro-img">
        <img :src="info.appImgB" />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      appId: "",
      info: {}
    };
  },
  created() {
    this.appId = this.$route.query.appId;
    this.getInfo();
  },
  methods: {
    getInfo() {
      this.api.home02({ appId: this.appId }).then(res => {
        this.info = res.data;
      });
    }
  }
};
</script>

<style lang="less" scoped>
.app-intro-page {
  background-color: #fff;

  .app-logo-txt {
    display: flex;
    padding: 30px 20px 10px;

    img {
      flex: 0 0 60px;
      height: 60px;
      margin-right: 20px;
    }

    & > div {
      flex: 1;

      .app-title {
        font-size: 14px;
        color: rgba(51, 51, 51, 1);
      }

      .app-dec {
        font-size: 12px;
        color: rgba(153, 153, 153, 1);
      }
    }
  }

  .pro-intro {
    font-size: 14px;
    color: rgba(51, 51, 51, 1);
    padding: 0 20px 20px;
  }

  .pro-intro-img {
    padding: 0 20px 40px 20px;

    img {
      min-width: 50%;
      max-width: 100%;
    }
  }
}
</style>
