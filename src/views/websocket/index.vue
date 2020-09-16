<template>
  <div>
    <div>
      <a-button @click="init">建立websocke</a-button>
    </div>
    <a-button @click="send" :disabled="!connected">发消息</a-button>
    <a-button @click="close">关闭</a-button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      path: "wss://echo.websocket.org", //wss://api.baidu.com
      socket: "",
      connected: false,
      timeout: 5000,
      timeoutObj: null,
      serverTimeoutObj: null,
      timeoutnum: null
    };
  },
  mounted() {
  },
  beforeDestroy() {
    this.close();
  },
  methods: {
    init() {
      if (typeof WebSocket === "undefined") {
        alert("您的浏览器不支持socket");
      } else {
        // 实例化socket
        this.socket = new WebSocket(this.path);
        // 监听socket连接
        this.socket.onopen = this.open;
        // 监听socket错误信息
        this.socket.onerror = this.error;
        // 监听socket消息
        this.socket.onmessage = this.getMessage;
        this.socket.onclose = e => {
          console.log(e); //监听关闭事件
          console.log("关闭");
          this.connected = false;
        };
      }
    },
    reconnect() {
      //重新连接
      var that = this;
      if (that.connected) {
        return;
      }
      that.connected = true;
      //没连接上会一直重连，设置延迟避免请求过多
      that.timeoutnum && clearTimeout(that.timeoutnum);
      that.timeoutnum = setTimeout(function() {
        //新连接
        that.init();
        that.connected = false;
      }, 5000);
    },
    reset() {
      //重置心跳
      var that = this;
      //清除时间
      clearTimeout(that.timeoutObj);
      clearTimeout(that.serverTimeoutObj);
      //重启心跳
      that.start();
    },
    start() {
      //开启心跳
      var self = this;
      self.timeoutObj && clearTimeout(self.timeoutObj);
      self.serverTimeoutObj && clearTimeout(self.serverTimeoutObj);
      self.timeoutObj = setTimeout(function() {
        //这里发送一个心跳，后端收到后，返回一个心跳消息，
        if (self.socket.readyState == 1) {
          //如果连接正常
          self.socket.send("heartCheck");
        } else {
          //否则重连
          self.reconnect();
        }
        self.serverTimeoutObj = setTimeout(function() {
          //超时关闭
          self.socket.close();
        }, self.timeout);
      }, self.timeout);
    },
    open() {
      this.connected = true;
      this.start()
      console.log("socket连接成功,并且开始心跳");
    },
    error() {
      console.log("连接错误");
    },
    getMessage(msg) {
      console.log(msg);
      this.reset();
    },
    send() {
      this.socket.send({ a: 1 });
    },
    close() {
      this.socket && this.socket.close(); //关闭websocket
    }
  }
};
</script>

<style>
</style>