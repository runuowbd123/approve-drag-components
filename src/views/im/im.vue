<template>
  <div>
    <select>
      <option value="1">1</option>
      <option value="2">2</option>
    </select>
     <a-date-picker />
    当前账号：
    <a-select style="width: 200px" v-model="userId">
      <a-select-option
        v-for="item in ['user0', 'user1', 'user2']"
        :value="item"
        :key="item"
      >
        {{ item }}
      </a-select-option>
    </a-select>
    <a-button type="primary" @click="login">登录</a-button>
    <a-button @click="logout">登出</a-button>
    <br />
    <br />
    <div style="display: flex">
      <div style="width: 50%">私聊</div>
      <div style="width: 50%">多人</div>
    </div>
    <div style="display: flex">
      <div style="width: 50%; display: flex">
        <div style="background: #ccc; width: 80px; overflow: auto">
          <div
            v-for="(item, key) in privateList"
            :key="key"
            @click="changePrivate(item)"
            :style="
              item.toAccount === targetId
                ? 'background: #fff; padding: 5px; border: 1px solid red;cursor: pointer;'
                : 'background: #fff; padding: 5px; border: 1px solid #ccc;cursor: pointer;'
            "
          >
            {{ item.toAccount }}
            <a-badge
              status="error"
              style="margin-left: 10px"
              :style="item.unreadCount > 0 ? '' : 'display:none'"
            />
          </div>
        </div>
        <div style="flex: 1">
          <div
            style="background: #fff; height: 250px; overflow: auto"
            id="privateMessageList"
          >
            <template v-for="(item, key) in privateMessageList">
              <div
                v-if="item.from === userId"
                :key="key"
                style="
                  display: flex;
                  flex-direction: column;
                  margin: 10px;
                  align-items: flex-end;
                "
              >
                <div>
                  {{ item.from }}
                  {{ moment(item.time * 1000).format("YYYY-MM-DD HH:mm:ss") }}
                </div>
                <div style="font-size: 12px">{{ item.payload.text }}</div>
              </div>
              <div v-else :key="key" style="margin: 10px">
                <div>{{ item.from }}</div>
                <div style="font-size: 12px">{{ item.payload.text }}</div>
              </div>
            </template>
          </div>
          <a-textarea
            placeholder="请输入"
            :rows="4"
            :autoSize="false"
            style="resize: none; border-radius: unset"
            v-model="input"
          />
          <div style="margin-top: 20px">
            <a-button @click="send">发消息</a-button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import moment from "moment";
export default {
  name: "im",
  data() {
    return {
      moment,
      userId: "user0",
      targetId: "user1",
      privateList: [],
      privateMessageList: [],
      input: "",
    };
  },
  created() {},
  destroyed() {
    this.logout();
  },
  watch: {
    privateMessageList: {
      handler(old, now) {
        // console.log(old, now);
        setTimeout(() => {
          const div = document.getElementById("privateMessageList");
          div.scrollTop = div.scrollHeight;
        }, 100);
      },
      deep: true,
    },
  },
  methods: {
    //登录
    login() {
      const user = this.$genTestUserSig(this.userId);
      console.log(user);
      let res = tim
        .login({
          userID: this.userId,
          userSig: user.userSig,
        })
        .then((res) => {
          console.log(res);
          if (res.code === 0) {
            this.watchMessage();
          }
        })
        .catch((e) => {
          console.log(e);
        });
    },
    //登出
    logout() {
      tim
        .logout()
        .then((imResponse) => {
          console.log("登出成功", imResponse.data); // 登出成功
        })
        .catch((imError) => {
          console.warn("logout error:", imError);
        });
    },
    // 发消息
    send() {
      console.log("发送消息", this.input);
      if (this.input) {
        const message = tim.createTextMessage({
          to: this.targetId,
          conversationType: TIM.TYPES.CONV_C2C,
          payload: {
            text: this.input,
          },
        });
        this.input = "";
        // console.log(message)
        tim
          .sendMessage(message)
          .then((imResponse) => {
            // 发送成功
            console.log("发送成功消息", imResponse);

            this.privateMessageList.push(imResponse.data.message);
          })
          .catch((imError) => {
            // 发送失败
            console.warn("sendMessage error:", imError);
          });
      }
    },
    //切换私聊
    changePrivate(item) {
      if (this.targetId !== item.toAccount) {
        this.targetId = item.toAccount;
        this.input = "";
        this.getHistory();
        tim.setMessageRead({ conversationID: `C2C${this.targetId}` });
      }
    },
    // 获取历史消息
    getHistory() {
      tim
        .getMessageList({
          conversationID: `C2C${this.targetId}`,
          count: 15, //拉取消息条数
        })
        .then((res) => {
          if (res.code === 0) {
            this.privateMessageList = res.data.messageList;
            console.log("获取历史消息!!!!!!", res, this.privateMessageList);
          }
        })
        .catch((e) => {
          console.log("获取历史消息报错！！！", e);
        });
    },
    // 监听im变化
    watchMessage() {
      tim.on(TIM.EVENT.SDK_READY, (event) => {
        console.log(event);
        // 收到离线消息和会话列表同步完毕通知，接入侧可以调用 sendMessage 等需要鉴权的接口
        // event.name - TIM.EVENT.SDK_READY
        this.getHistory();
      });

      tim.on(TIM.EVENT.MESSAGE_RECEIVED, (event) => {
        // 收到推送的单聊、群聊、群提示、群系统通知的新消息，可通过遍历 event.data 获取消息列表数据并渲染到页面
        // event.name - TIM.EVENT.MESSAGE_RECEIVED
        // event.data - 存储 Message 对象的数组 - [Message]
        console.log("收到推送的单聊、群聊、群提示、群系统通知的新消息", event);
        event.data.forEach((item) => {
          if (item.from === this.targetId && item.conversationType === "C2C") {
            this.privateMessageList.push(item);
          }
        });
        tim.setMessageRead({ conversationID: `C2C${this.targetId}` });
      });

      tim.on(TIM.EVENT.MESSAGE_REVOKED, (event) => {
        // 收到消息被撤回的通知
        // event.name - TIM.EVENT.MESSAGE_REVOKED
        // event.data - 存储 Message 对象的数组 - [Message] - 每个 Message 对象的 isRevoked 属性值为 true
        console.log(event);
      });

      tim.on(TIM.EVENT.MESSAGE_READ_BY_PEER, (event) => {
        // SDK 收到对端已读消息的通知，即已读回执。使用前需要将 SDK 版本升级至 v2.7.0 或以上。仅支持单聊会话。
        // event.name - TIM.EVENT.MESSAGE_READ_BY_PEER
        // event.data - event.data - 存储 Message 对象的数组 - [Message] - 每个 Message 对象的 isPeerRead 属性值为 true
        console.log(event);
      });

      tim.on(TIM.EVENT.CONVERSATION_LIST_UPDATED, (event) => {
        // 收到会话列表更新通知，可通过遍历 event.data 获取会话列表数据并渲染到页面
        // event.name - TIM.EVENT.CONVERSATION_LIST_UPDATED
        // event.data - 存储 Conversation 对象的数组 - [Conversation]
        this.privateList = (event.data || []).filter((item) => {
          return item.type === "C2C";
        });
        console.log("最新的消息列表!!!!!", event, this.privateList);
      });

      tim.on(TIM.EVENT.GROUP_LIST_UPDATED, (event) => {
        // 收到群组列表更新通知，可通过遍历 event.data 获取群组列表数据并渲染到页面
        // event.name - TIM.EVENT.GROUP_LIST_UPDATED
        // event.data - 存储 Group 对象的数组 - [Group]
        console.log(event);
      });

      tim.on(TIM.EVENT.PROFILE_UPDATED, (event) => {
        // 收到自己或好友的资料变更通知
        // event.name - TIM.EVENT.PROFILE_UPDATED
        // event.data - 存储 Profile 对象的数组 - [Profile]
        console.log(event);
      });

      tim.on(TIM.EVENT.BLACKLIST_UPDATED, (event) => {
        // 收到黑名单列表更新通知
        // event.name - TIM.EVENT.BLACKLIST_UPDATED
        // event.data - 存储 userID 的数组 - [userID]
        console.log(event);
      });

      tim.on(TIM.EVENT.ERROR, (event) => {
        // 收到 SDK 发生错误通知，可以获取错误码和错误信息
        // event.name - TIM.EVENT.ERROR
        // event.data.code - 错误码
        // event.data.message - 错误信息
        console.log(event);
      });

      tim.on(TIM.EVENT.SDK_NOT_READY, (event) => {
        // 收到 SDK 进入 not ready 状态通知，此时 SDK 无法正常工作
        // event.name - TIM.EVENT.SDK_NOT_READY
        console.log(event);
      });

      tim.on(TIM.EVENT.KICKED_OUT, (event) => {
        // 收到被踢下线通知
        // event.name - TIM.EVENT.KICKED_OUT
        // event.data.type - 被踢下线的原因，例如:
        //    - TIM.TYPES.KICKED_OUT_MULT_ACCOUNT 多实例登录被踢
        //    - TIM.TYPES.KICKED_OUT_MULT_DEVICE 多终端登录被踢
        //    - TIM.TYPES.KICKED_OUT_USERSIG_EXPIRED 签名过期被踢 （v2.4.0起支持）。
        console.log(event);
      });

      tim.on(TIM.EVENT.NET_STATE_CHANGE, (event) => {
        //  网络状态发生改变（v2.5.0 起支持）。
        // event.name - TIM.EVENT.NET_STATE_CHANGE
        // event.data.state 当前网络状态，枚举值及说明如下：
        //     \- TIM.TYPES.NET_STATE_CONNECTED - 已接入网络
        //     \- TIM.TYPES.NET_STATE_CONNECTING - 连接中。很可能遇到网络抖动，SDK 在重试。接入侧可根据此状态提示“当前网络不稳定”或“连接中”
        //    \- TIM.TYPES.NET_STATE_DISCONNECTED - 未接入网络。接入侧可根据此状态提示“当前网络不可用”。SDK 仍会继续重试，若用户网络恢复，SDK 会自动同步消息
        console.log(event);
      });
    },
  },
};
</script>

<style scoped>
</style>
