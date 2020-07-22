<template>
  <div class="page-home">
    <div class="page-left">
      <div class="company">
        <img v-if="info.authState === '1'" class="company-icon" src="../../assets/imgs/icon02.png" />
        <img
          v-else-if="info.authState === '2'"
          class="company-icon"
          src="../../assets/imgs/icon03.png"
        />
        <img
          v-else-if="info.authState === '3'"
          class="company-icon"
          src="../../assets/imgs/icon04.png"
        />
        <img
          v-else-if="info.authState === '4'"
          class="company-icon"
          src="../../assets/imgs/icon01.png"
        />

        <div class="company-right">
          <div class="company-name" v-if="info.isFormal">{{info.entpName}}</div>
          <div class="company-name" v-else-if="info.authState === '1'">企业尚未认证</div>
          <div class="company-name" v-else-if="info.authState === '2'">认证中，请耐心等待</div>
          <div class="company-name" v-else-if="info.authState === '3'">企业认证失败</div>
          <div class="company-name" v-else-if="info.authState === '4'">{{info.entpName}}</div>

          <a-button v-if="info.authState === '1'" type="primary" ghost>
            <router-link :to="info.entpName?'/authentication?entpName='+info.entpName:'/authentication'">立即认证</router-link>
          </a-button>
          <span v-else-if="info.authState === '2'" class="color-fd9242">认证中，请耐心等待</span>
          <div v-else-if="info.authState === '3'">
            <a-button type="primary" ghost>
              <router-link to="/auth">重新认证</router-link>
            </a-button>
            <a-tooltip :title="info.authDesc||' '">
              <a-icon type="question-circle" style="font-size:18px;margin-left:5px;color:#1890ff;" />
            </a-tooltip>
          </div>
        </div>
      </div>
      <a-divider />

      <div v-if="info.authState === '4'||info.isFormal">
        <div class="left-item">
          <div class="item-label">员工数量</div>
          <div class="item-content">
            <span>{{info.acctCount}}人/</span>
            <span class="redcolor">{{info.acctFailCount}}人未激活</span>
          </div>
        </div>
        <div class="left-item">
          <div class="item-label">昨天使用人数</div>
          <div class="item-content">{{info.prevUseCount}}人</div>
        </div>
        <div class="left-button">
          <a-button type="link" @click="linkToStaffPage">邀请员工 ></a-button>
        </div>
        <a-divider />
        <div class="left-item">
          <div class="item-label">企业账户</div>
          <div class="item-content">{{info.balanceEntp != null ? info.balanceEntp.toFixed(2) : ""}}元</div>
        </div>
        <div class="left-item">
          <div class="item-label">蜂豆账户</div>
          <div class="item-content">{{info.txLen}}蜂豆</div>
        </div>
        <div class="left-item">
          <div class="item-label">收益账户</div>
          <div class="item-content">{{info.balanceProfit != null ? info.balanceProfit.toFixed(2) : ""}}元</div>
        </div>
        <div class="left-item">
          <div class="item-label">保证金账户</div>
          <div class="item-content">{{info.balanceMargin != null ? info.balanceMargin.toFixed(2) : ""}}元</div>
        </div>
        <div class="left-item">
          <div class="item-label">帐户管理员</div>
          <div class="item-content">{{info.balanceMng ? info.balanceMng : "未设置"}}</div>
        </div>
        <div class="left-button">
          <a-button type="link" @click="linkToFundsPage">资金账户 ></a-button>
        </div>
      </div>
      <div v-else>
        <div class="app-item-title">认证通过后，可以享受以下功能</div>
        <template v-for="(item, index) in functionList">
          <div class="app-item" :key="index" v-if="item.isOpen">
            <div class="app-icon">
              <img :src="require(`../../assets/imgs/${item.logo}`)" />
            </div>
            <div class="app-txt">
              <div>{{item.title}}</div>
              <span>{{item.description}}</span>
            </div>
          </div>
        </template>
        <div class="app-item-title">以下功能即将上线，敬请期待</div>
        <template v-for="(item, index) in functionList">
          <div class="app-item" :key="index" v-if="!item.isOpen">
            <div class="app-icon">
              <img :src="require(`../../assets/imgs/${item.logo}`)" />
            </div>
            <div class="app-txt">
              <div>{{item.title}}</div>
              <span>{{item.description}}</span>
            </div>
          </div>
        </template>
      </div>
    </div>

    <div class="page-right">
      <div class="banner">
        <a-carousel
          
        >
        <!-- :autoplay="true" -->
          <div class="aaa1">
            <!-- <img src="" alt=""> -->
          </div>
          <div class="aaa2">
          </div>
        </a-carousel>
      </div>

      <div v-if="info.authState === '4'||info.isFormal" class="block-item">
        <div class="right-title">
          <div class="right-title-label">消息中心</div>
          <div class="right-title-content">
            <a-button type="link">查看更多 ></a-button>
          </div>
        </div>
        <ul class="msg-list">
          <li>
            <span>【财务消息】提现到账提醒</span>
            <span class="fr">2019-08-09-12 15:14:05</span>
          </li>
          <li>
            <span>【财务消息】提现到账提醒</span>
            <span class="fr">2019-08-09-12 15:14:05</span>
          </li>
          <li>
            <span>【财务消息】提现到账提醒</span>
            <span class="fr">2019-08-09-12 15:14:05</span>
          </li>
        </ul>
      </div>

      <div v-if="info.authState === '4'||info.isFormal" class="block-item">
        <div class="right-title">
          <div class="right-title-label">快捷入口</div>
        </div>
        <ul class="app-list">
          <li>
            <a @click="goTo('/apps/store','x3wb0u82')">
              <img class="app-icon" src="../../assets/imgs/app01.png" />
              <span class="app-txt">应用购买</span>
            </a>
          </li>
          <li>
            <a @click="goTo('/contract/list','dnulcgwn')">
              <img class="app-icon" src="../../assets/imgs/app02.png" />
              <span class="app-txt">合同确认</span>
            </a>
          </li>
          <li>
            <a @click="goTo('/order/orderList','hqdv88nq')">
              <img class="app-icon" src="../../assets/imgs/app03.jpg" />
              <span class="app-txt">订单支付</span>
            </a>
          </li>
          <li>
            <a @click="goToApp('/basicApp/intelligence?appid=a305','a305')">
              <img class="app-icon" src="../../assets/imgs/app04.png" />
              <span class="app-txt">智能人事</span>
            </a>
          </li>
          <!-- <li>
            <router-link to="/index">
              <img class="app-icon" src="../../assets/imgs/app05.png" />
              <span class="app-txt">虚拟号码管家</span>
            </router-link>
          </li>
          <li>
            <router-link to="/index">
              <img class="app-icon" src="../../assets/imgs/app06.png" />
              <span class="app-txt">慧云名片</span>
            </router-link>
          </li> -->
        </ul>
      </div>

      <div class="block-item" v-else-if="info.softList && info.softList.length">
        <div class="right-title">
          <div class="right-title-label">全部应用</div>
        </div>
        <ul class="apps-apply">
          <li v-for="element in info.softList" :key="element.appId" @click="toIntro(element.appId)">
            <img class="apps-apply-icon" :src="element.appImg" />
            <div class="apps-apply-txt">
              <div class="apps-apply-name">{{element.appName}}</div>
              <span>{{element.appDesc}}</span>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import functionList from "../../../public/static/functionList"
export default {
  data() {
    return {
      functionList,
      info: {},
      moduleIds: [],
      qfyAppIds: []
    };
  },
  created() {
    // this.$bus.$emit("changeBreadTitle", "");
    this.getInfo();
    const userInfo = JSON.parse(sessionStorage.getItem('userInfo'));
    this.moduleIds = userInfo.curr.moduleIds;
    this.qfyAppIds = userInfo.curr.qfyAppIds;
    console.log(this.moduleIds, this.qfyAppIds, 'sessionStorage中获取的个人信息权限')
  },
  methods: {
    getInfo() {
      this.api.home01().then(res => {
        console.log('info信息', res.data)
        this.info = res.data;
      });
    },
    toIntro(appId) {
      this.$router.push("/apps/store/detail?appId=" + appId + '&authenticated=true');
    },
    linkToFundsPage(params) {
      if(this.moduleIds.includes('jl98if4c')) {
        this.$router.push("/funds/moneyaccount");
      } else {
        this.$message.info('暂无资金账户权限')
      }
      
    },
    linkToStaffPage(params) {
      if (this.moduleIds.includes('wyb9mzee')) {
        this.$router.push("/staff");
      } else {
        this.$message.info('暂无邀请员工权限')
      }
    },
    goTo(path, permissionId) {
      if (this.moduleIds.includes(permissionId)) {
        this.$router.push(path);
      } else {
        this.$message.info('暂无该模块权限')
      }
    },
    goToApp(path, permissionId) {
      if (this.qfyAppIds.includes(permissionId)) {
        this.$router.push(path);
      } else {
        this.$message.info('暂无该模块权限')
      }
    }
  }
};
</script>

<style lang="less" scoped>
.page-home {
  display: flex;

  .page-left {
    width: 350px;
    padding: 28px 28px 0 22px;
    background-color: #fff;

    .company {
      display: flex;

      .company-icon {
        height: 54px;
        width: 54px;
        margin: 0 20px 20px 10px;
      }

      .company-right {
        flex: 1;

        .company-name {
          font-size: 16px;
          color: rgba(51, 51, 51, 1);
          line-height: 36px;
        }

        .color-fd9242 {
          font-size: 12px;
          color: #fd9242;
        }
      }
    }

    .left-item {
      display: flex;
      font-size: 12px;
      color: rgba(51, 51, 51, 1);
      margin-bottom: 30px;

      .item-label {
        flex: 0 0 90px;
      }

      .item-content {
        flex: 1;
        text-align: right;

        .redcolor {
          color: #f83535;
        }
      }
    }

    .left-button {
      text-align: right;

      .ant-btn {
        padding: 4px 0;
        font-size: 12px;
        color: rgba(62, 123, 248, 1);
      }
    }

    .app-item-title {
      margin-bottom: 30px;
      font-size: 12px;
      color: rgba(77, 77, 77, 1);
    }

    .app-item {
      display: flex;
      margin-bottom: 40px;

      .app-icon {
        flex: 0 0 50px;
        height: 50px;
        margin-right: 10px;

        img {
          width: 100%;
          height: 100%;
        }
      }

      .app-txt {
        flex: 1;

        div {
          font-size: 16px;
          color: rgba(51, 51, 51, 1);
        }

        span {
          font-size: 12px;
          color: rgba(77, 77, 77, 1);
        }
      }
    }
  }

  .page-right {
    width: calc(100% - 350px);
    margin-left: 12px;
    display: flex;
    flex-direction: column;

    .block-item {
      background-color: #fff;
      padding-bottom: 10px;
      margin-top: 10px;
    }

    .right-title {
      display: flex;
      padding: 20px;

      .right-title-label {
        flex: 0 0 100px;
        line-height: 32px;
        font-size: 14px;
        font-weight: bold;
        color: rgba(77, 77, 77, 1);
      }

      .right-title-content {
        flex: 1;
        text-align: right;

        .ant-btn {
          padding: 4px 0;
          font-size: 12px;
          color: rgba(62, 123, 248, 1);
        }
      }
    }

    .msg-list {
      padding-left: 40px;

      li {
        margin-bottom: 15px;
        margin-right: 20px;
        font-size: 12px;
        color: rgba(77, 77, 77, 1);
        list-style: none;
      }

      li::before {
        content: "";
        display: inline-block;
        vertical-align: top;
        margin-top: 8px;
        margin-right: 8px;
        width: 6px;
        height: 6px;
        background: rgba(62, 123, 248, 1);
        border-radius: 50%;
      }
    }

    .app-list {
      padding: 0 20px 0 40px;
      display: flex;
      flex-wrap: wrap;
      justify-content: space-between;

      li {
        flex: 0 0 220px;
        height: 78px;
        margin-bottom: 20px;
        border: 1px solid rgba(222, 222, 222, 1);
        border-radius: 10px;
        list-style: none;

        a {
          display: inline-block;
          width: 100%;
          height: 100%;
          padding: 0 20px;
          color: rgba(0, 0, 0, 0.65);
          cursor: pointer;

          .app-txt {
            line-height: 78px;
            margin-left: 13px;
          }
        }
      }

      .opacity {
        height: 0;
        border: none;
        margin-bottom: 0;
      }
    }

    .apps-apply {
      padding: 0;
      display: flex;
      flex-wrap: wrap;
      justify-content: space-between;

      li {
        flex: 0 0 50%;
        width: 50%;
        padding: 0 20px;
        list-style: none;
        display: flex;
        align-items: center;
        height: 63px;
        margin-bottom: 40px;

        .apps-apply-icon {
          flex: 0 0 60px;
          height: 60px;
          margin-right: 15px;
        }

        .apps-apply-txt {
          flex: 1;

          div {
            font-size: 16px;
            color: rgba(51, 51, 51, 1);
          }

          span {
            font-size: 12px;
            color: rgba(77, 77, 77, 1);
            line-height: 18px;
            display: inline-block;
            word-break: break-all;
            text-overflow: ellipsis;
            display: -webkit-box;
            -webkit-box-orient: vertical;
            -webkit-line-clamp: 2;
            overflow: hidden;
          }
        }
      }
    }
  }
}
</style>
<style lang="less">
.banner{
    width: 100%;
    background: linear-gradient(
      0deg,
      rgba(28, 172, 250, 1) 0%,
      rgba(23, 70, 210, 1) 76%
    );
    .ant-carousel {
      margin: 0 auto;
      height: 240px;
      width: 100%;
      overflow: hidden;
      .slick-slide {
        text-align: center;
        height: 240px;
        line-height: 240px;
        // img{
        //   width: 100%;
        //   height: 240px;
        // }
        .aaa1{
          height:240px;
          background: url('../../assets/images/banner1.png') no-repeat center;
        }
        .aaa2{
          height:240px;
          background: url('../../assets/images/banner2.png') no-repeat center;
        }
      }
    }
}

</style>
