<template>
  <div>
    <div>
      <a-button @click="create" :disabled="connected">开始建立websocket</a-button>
    </div>
    <div class="chatList" id="chatList">
      <template v-for="(item, index) in chatList">
        <div :key="index" class="chatList-item" v-if="item.type==='message'">
          <div class="chatList-item-title">{{item.time}}</div>
          <div>{{item.value}}</div>
        </div>
        <div :key="index" class="chatList-item" v-else-if="item.type==='audio'">
          <div class="chatList-item-title">{{item.time}}</div>
          <audio
            class="audio"
            :src="item.value"
            type="audio/mp3"
            controlslist="nodownload"
            controls="controls"
            />
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
    <div style="margin: 10px 0">
      <a-button @click="startRecord" :loading="recording">{{recording ? '录音中' : "录音"}}</a-button>
      <a-button @click="stopRecording">停止录音</a-button>
      <!-- <a-button @click="play">播放</a-button>
      <a-button @click="stopPlay">停止播放</a-button>-->
      <div>
        <audio
          class="audio"
          :src="audioUrl"
          type="audio/mp3"
          controlslist="nodownload"
          controls="controls"
          />
      </div>
    </div>
  </div>
</template>

<script>
import { createSocket, sendWSPush, closeWS } from "./websocketFunction";
import moment from "moment";
import Recorder from "js-audio-recorder";
import lamejs from "lamejs";

export default {
  name: "",
  data() {
    return {
      connected: false,
      chatList: [],
      input: "",
      recorder: null, // 录音
      recording: false,
      audioUrl:
        "https://demo.dj63.com//2019/user_up/qq1483887703/20191021/851f9fe86739b2bf824f6703ca905ae7.mp3"
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
      if (data.type === "message" || data.type === "audio") {
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
        this.input = "";
      }
    },
    close() {
      closeWS();
      this.connected = false;
      window.removeEventListener("onmessageWS", this.getData);
    },
    pressEnter() {
      // 发消息
      console.log(this.input);
      if (this.input) {
        sendWSPush({
          user: "han",
          type: "message",
          value: this.input,
          time: moment().format("YYYY-MM-DD HH:mm:ss")
        });
        this.input = "";
      }
    },
    startRecord() {
      // 开始录音
      this.recorder = new Recorder({
        sampleRate: 44100, //采样频率，默认为44100Hz(标准MP3采样率)
        sampleBits: 128 //比特率，默认为128kbps(标准MP3质量)
      });
      this.recorder.onprogress = this.recordProcess;
      this.recorder.onplay = () => {
        console.log("onplay");
      };
      this.recorder.onstopplay = () => {
        console.log("onstopplay");
      };
      this.recorder.start();
      this.recording = true;
    },
    recordProcess(duration) {
      console.log(duration);
    },
    stopRecording() {
      // 停止录音
      this.recorder.stop();
      const wavefile = this.recorder.getWAV();
      console.log(wavefile);
      const mp3file = this.convertToMp3(wavefile);
      const mp3fileWhole = new File([mp3file], "录音文件");
      const url = window.URL.createObjectURL(mp3fileWhole);
      // const url = "https://demo.dj63.com//2019/user_up/qq1483887703/20191021/851f9fe86739b2bf824f6703ca905ae7.mp3"
      this.audioUrl = url;
      sendWSPush({
        user: "han",
        type: "audio",
        value: url,
        time: moment().format("YYYY-MM-DD HH:mm:ss")
      });
      this.recording = false;
      this.recorder.destroy().then(() => {
        this.recorder = null;
      });
      console.log(mp3file, mp3fileWhole, url);
    },
    play() {
      this.recorder.play();
    },
    stopPlay() {
      this.recorder.stopPlay();
    },
    //录音文件转换成MP3文件
    convertToMp3(wavDataView) {
      // 获取wav头信息
      const wav = lamejs.WavHeader.readHeader(wavDataView); // 此处其实可以不用去读wav头信息，毕竟有对应的config配置
      const { channels, sampleRate } = wav;
      const mp3enc = new lamejs.Mp3Encoder(channels, sampleRate, 128);
      // 获取左右通道数据
      const result = this.recorder.getChannelData();
      const buffer = [];

      const leftData =
        result.left &&
        new Int16Array(result.left.buffer, 0, result.left.byteLength / 2);
      const rightData =
        result.right &&
        new Int16Array(result.right.buffer, 0, result.right.byteLength / 2);
      const remaining = leftData.length + (rightData ? rightData.length : 0);

      const maxSamples = 1152;
      for (let i = 0; i < remaining; i += maxSamples) {
        const left = leftData.subarray(i, i + maxSamples);
        let right = null;
        let mp3buf = null;

        if (channels === 2) {
          right = rightData.subarray(i, i + maxSamples);
          mp3buf = mp3enc.encodeBuffer(left, right);
        } else {
          mp3buf = mp3enc.encodeBuffer(left);
        }

        if (mp3buf.length > 0) {
          buffer.push(mp3buf);
        }
      }

      const enc = mp3enc.flush();

      if (enc.length > 0) {
        buffer.push(enc);
      }

      return new Blob(buffer, { type: "audio/mp3" });
    }
  },
  watch: {
    chatList: {
      handler(old, now) {
        console.log(old, now);
        setTimeout(() => {
          const div = document.getElementById("chatList");
          div.scrollTop = div.scrollHeight;
        }, 100);
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
.audio {
  margin: 10px 0;
  outline: none;
}
</style>
