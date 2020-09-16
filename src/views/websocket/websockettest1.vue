<template>
  <div>
    <div>
      <a-button @click="create" :disabled="connected">开始建立websocket</a-button>
    </div>
    <div class="chatList" id="chatList">
      <template v-for="(item, index) in chatList">
        <div :key="index" class="chatList-item">
          <div class="chatList-item-title">{{item.time}}</div>
          <div>{{item.value}}</div>
        </div>
      </template>
    </div>
    <a-textarea
      placeholder="请输入"
      :rows="4"
      :autoSize="false"
      style="resize: none;border-radius: unset"
      v-model="input"
      @pressEnter.prevent="pressEnter"
      :disabled="!connected"
    />

    <div style="margin-top: 20px">
      <a-button @click="send" :disabled="!connected">发消息</a-button>
      <a-button @click="close">关闭</a-button>
    </div>
  </div>
</template>

<script>
import { createSocket, sendWSPush, closeWS } from "./function";
import moment from "moment";
export default {
  name: "",
  data() {
    return {
      connected: false,
      chatList: [],
      input: ''
    };
  },
  created() {
    // createSocket('wss://echo.websocket.org', this.connect);
    // window.addEventListener("onmessageWS", this.getData);
  },
  beforeDestroy() {
    this.connected && closeWS();
    this.connected = false;
    window.removeEventListener("onmessageWS", this.getData);
  },
  methods: {
    create() {
      createSocket("wss://echo.websocket.org", this.connect);

      window.addEventListener("onmessageWS", this.getData);
    },
    connect() {
      // 连接后回调
      console.log("wesocket建立连接");
      this.$message.success("wesocket建立连接");
      this.connected = true;
    },
    getData(e) {
      console.log(e);
      const data = JSON.parse(e.detail);
      console.log(data);
      if (data.type === "message") {
        this.chatList.push(data);
      }
    },
    send() {
      if (this.input) {
        sendWSPush({
          user: "han",
          type: "message",
          value: this.input,
          time: moment().format("YYYY-MM-DD HH:mm:ss")
        });
        this.input = '';
      }
    },
    close() {
      closeWS();
      this.connected = false;
      window.removeEventListener("onmessageWS", this.getData);
    },
    pressEnter() {
      console.log(this.input);
      if (this.input) {
        sendWSPush({
          user: "han",
          type: "message",
          value: this.input,
          time: moment().format("YYYY-MM-DD HH:mm:ss")
        });
        this.input = '';
      }
    }
  },
  watch: {
    chatList: {
      handler(old, now) {
        console.log(old, now)
        setTimeout(() => {
          const div = document.getElementById("chatList");
        div.scrollTop = div.scrollHeight;
        }, 100)
      },
      deep: true
    }
  }
};
</script>

<style lang="less" scoped>
.chatList {
  height: 300px;
  background: #fff;
  margin: 20px 0 0;
  overflow: auto;
  .chatList-item {
    margin: 20px 0;
    padding: 0 20px;
    .chatList-item-title {
      margin-bottom: 10px;
    }
  }
}
</style>
