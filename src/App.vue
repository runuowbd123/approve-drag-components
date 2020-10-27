<template>
  <a-config-provider :locale="locale">
    <div id="app">
      <router-view />
    </div>
  </a-config-provider>
</template>

<script>
import zhCN from "ant-design-vue/lib/locale-provider/zh_CN";
export default {
  name: "App",
  data() {
    return {
      locale: zhCN,
    };
  },
};
</script>
<style lang="less">
@font-face {
  font-family: "iconfont"; /* project id 2101406 */
  src: url("//at.alicdn.com/t/font_2101406_2kmxqoi4ixq.eot");
  src: url("//at.alicdn.com/t/font_2101406_2kmxqoi4ixq.eot?#iefix")
      format("embedded-opentype"),
    url("//at.alicdn.com/t/font_2101406_2kmxqoi4ixq.woff2") format("woff2"),
    url("//at.alicdn.com/t/font_2101406_2kmxqoi4ixq.woff") format("woff"),
    url("//at.alicdn.com/t/font_2101406_2kmxqoi4ixq.ttf") format("truetype"),
    url("//at.alicdn.com/t/font_2101406_2kmxqoi4ixq.svg#iconfont") format("svg");
}
.iconfont {
  font-family: "iconfont" !important;
  font-size: 16px;
  font-style: normal;
  -webkit-font-smoothing: antialiased;
  -webkit-text-stroke-width: 0.2px;
  -moz-osx-font-smoothing: grayscale;
}
</style>