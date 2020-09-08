<template>
  <div>
    websocket
    <a-button @click="send" :disabled="!connected">发消息</a-button>
    <a-button @click="close">关闭</a-button>
  </div>
</template>

<script>
import { createSocket,sendWSPush,closeWS } from './function'
export default {
  name:'',
  data(){
   return {
     connected: false,
   }
  },
  created() {
    createSocket('wss://echo.websocket.org', this.connect);
    window.addEventListener('onmessageWS', this.getData)
  },
  beforeDestroy() {
    closeWS()
  },
  methods: {
    connect() { // 连接后回调
      console.log('wesocket建立连接');
      this.connected = true;
    },
    getData(e) {
      console.log(e)
    },
    send() {
      sendWSPush(123);
    },
    close() {
      closeWS()
    }
  }
}
</script>

<style scoped>

</style>
