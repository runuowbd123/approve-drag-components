<template>
  <div>
    <div class="layout-header">
      <div class="layout-header-logo">
        <img src="../../assets/images/login-bg.png" />
      </div>
      <div class="layout-header-right">
        <template v-if="info.curr.entpIsFormal || info.curr.entpIsAuth">
          <div v-if="info.entps.length > 1" style="margin-right: 10px;">
            <a-dropdown :trigger="['click']">
              <div style="cursor: pointer;">
                {{entpName}}<a-icon type="down" style="margin-left: 5px"/>
              </div>
              <a-menu slot="overlay" @click="changeEntp">
                <a-menu-item v-for="item in info.entps" :key="item.entpId">
                  {{item.entpName}}
                </a-menu-item>
              </a-menu>
            </a-dropdown>
          </div>
          <div style="margin-right: 10px;color: #000" v-else>{{entpName}}</div>
        </template>
        <a-avatar style="vertical-align:top;" icon="user" />
        <a-button class="color51" style="padding:0 5px;" type="link">{{info.curr.loginAcctName}}</a-button>
        <a-button type="link" @click="layout">退出</a-button>
      </div>
    </div>
    <div class="layout-asider" v-if="info.curr.entpIsFormal || info.curr.entpIsAuth">
      <a-menu
        mode="inline"
        @select="handleClick"
        :selectedKeys="[selectedKeys]"
        :openKeys="openKeys"
        @openChange="openChange"
      >
        <template v-for="(item) in menuList">
          <template v-if="item.children && item.children.length > 0">
            <a-sub-menu
              :key="item.key"
              v-if="submenuShow(item.permission, item.childrenPermission)"
            >
              <span slot="title">
                <img :src="require(`../../assets/images/${item.activeLogo}`)" alt class="white" />
                <img :src="require(`../../assets/images/${item.logo}`)" alt class="black" />
                <span>{{item.title}}</span>
              </span>
              <template v-for="it in item.children">
                <a-menu-item
                  :key="it.key"
                  v-if="(info.curr.moduleIds || []).includes(it.permission)"
                >{{it.title}}</a-menu-item>
              </template>
            </a-sub-menu>
          </template>
          <template v-else>
            <a-menu-item
              :key="item.key"
              v-if="(info.curr.moduleIds || []).includes(item.permission) || item.permission === 'always'"
            >
              <img :src="require(`../../assets/images/${item.activeLogo}`)" alt class="white" />
              <img :src="require(`../../assets/images/${item.logo}`)" alt class="black" />
              {{item.title}}
            </a-menu-item>
          </template>
        </template>
      </a-menu>
    </div>
    <div class="layout-main" :style="info.curr.entpIsFormal || info.curr.entpIsAuth ? '' : 'margin-left: 0'">
      <div class="page-title" v-if="isBack||breadTitle">
        <a-button type="link" v-if="isBack" @click="$router.go(-1)">
          <a-icon type="left" />
          <span style="margin-left:2px;">返回</span>
        </a-button>
        <span v-if="isBack" style="font-size: 14px;margin-right: 15px">|</span>
        <span style="font-size: 14px">{{breadTitle}}</span>
      </div>
      <router-view />
    </div>
  </div>
</template>
<script>
import menuList from "@/views/layoutManagement/menuList.js";
export default {
  data() {
    return {
      menuList,
      isBack: false,
      breadTitle: "",
      info: {
        curr: {},
        entps: []
      },
      selectedEntpId: "",
      selectedKeys: "/home",
      openKeys: []
    };
  },
  computed: {
    entpName() {
      const targetObj = this.info.entps.find(item => {
        return item.entpId === this.selectedEntpId;
      });
      return (targetObj || {}).entpName;
    }
  },
  watch: {
    $route(to, from) {
      const meta = to.meta;
      this.isBack = meta.isBack;
      this.breadTitle = meta.breadTitle;
      this.selectedKeys = this.$route.path;
    }
  },
  created() {
    const meta = this.$route.meta;
    this.isBack = meta.isBack;
    this.breadTitle = meta.breadTitle;
    this.$bus.$on("changeBreadTitle", msg => {
      this.breadTitle = msg;
    });
    this.api.login02({}).then(res => {
      this.info = res.data;
      this.selectedEntpId = this.info.curr.entpId;
      sessionStorage.setItem("userInfo", JSON.stringify(this.info));
      console.log("------------个人信息", this.info);
    });
    this.selectedKeys = this.$route.path;
    this.setOpenKeys();
  },
  methods: {
    changeEntp({ key }) {
      if(key !== this.selectedEntpId) {
        this.selectedEntpId = key
        this.api.login02({entpId: this.selectedEntpId}).then(res => {
          window.location.reload()
        });
      }
    },
    layout() {
      this.api.Q0004().then(res => {
        this.$router.push("/login");
      });
    },
    handleClick(e) {
      this.$router.push({
        path: e.key
      });
      this.selectedKeys = e.key;
    },
    openChange(val) {
      console.log(val);
      this.openKeys = val;
    },
    setOpenKeys() {
      const path = this.$route.path;
      console.log(path, path.indexOf("/app"));
      if (path.indexOf("/app") === 0) {
        this.openKeys = ["/app"];
      } else if (path.indexOf("/order") === 0) {
        this.openKeys = ["/order"];
      } else if (path.indexOf("/funds") === 0) {
        this.openKeys = ["/funds"];
      } else if (path.indexOf("/contract") === 0) {
        this.openKeys = ["/contract"];
      } else if (path.indexOf("/settings") === 0) {
        this.openKeys = ["/settings"];
      }
    },
    submenuShow(permission, childrenPermission) {
      const permissionShow = (this.info.curr.moduleIds || []).includes(
        permission
      );
      let childrenPermissionShow = false;
      (this.info.curr.moduleIds || []).forEach(item => {
        if (childrenPermission.includes(item)) {
          childrenPermissionShow = true;
        }
      });
      return permissionShow && childrenPermissionShow;
    }
  }
};
</script>
<style lang="less" scoped>
.layout-header {
  position: fixed;
  z-index: 1;
  top: 0;
  left: 0;
  right: 0;
  height: 52px;
  background: rgba(255, 255, 255, 1);
  box-shadow: 0px 6px 12px 1px rgba(42, 54, 70, 0.09);
  display: flex;
  align-items: center;
  .layout-header-logo {
    flex: 1;
    img {
      height: 44px;
      padding: 0 20px;
    }
  }
  .layout-header-right {
    display: flex;
    align-items: center;
    height: 32px;
    .color51 {
      color: #333;
      cursor: default;
    }
  }
}

.layout-asider {
  position: fixed;
  z-index: 1;
  top: 52px;
  bottom: 0;
  left: 0;
  width: 147px;
  background: rgba(42, 54, 70, 1);
  overflow-x: hidden;
  overflow-y: auto;
}
.layout-asider::-webkit-scrollbar {
  width: 0;
}

.layout-main {
  margin-left: 147px;
  padding: 62px 10px 10px 10px;
  min-height: 100vh;
  box-sizing: border-box;
  background: rgba(241, 242, 245, 1);
  .page-title {
    font-size: 16px;
    font-family: Microsoft YaHei;
    font-weight: 600;
    color: rgba(77, 77, 77, 1);
    line-height: 38px;
  }
}
</style>
<style lang="less">
.layout-asider {
  .ant-menu {
    border: none;
    background-color: transparent;
    color: rgba(255, 255, 255, 0.5);
    .anticon {
      margin-right: 5px;
    }
    .ant-menu-submenu-title {
      padding-right: 24px;
    }
    .ant-menu-submenu-title .ant-menu-submenu-arrow {
      right: 10px;
    }
    .ant-menu-item,
    .ant-menu-submenu-title {
      transition: none;
      // -webkit-transition: none;
    }
    .ant-menu-submenu {
      transition: none;
      span {
        display: flex;
        align-items: center;
        .white {
          display: none;
        }
        .black {
          display: block;
          margin-right: 10px;
        }
      }
    }
    .ant-menu-submenu-active {
      span {
        display: flex;
        align-items: center;
        transition: none;
        .black {
          display: none;
        }
        .white {
          display: block;
          margin-right: 10px;
        }
      }
    }
    .ant-menu-submenu-selected {
      color: #ffffff;
      span {
        display: flex;
        align-items: center;
        transition: none;
        .black {
          display: none;
        }
        .white {
          display: block;
          margin-right: 10px;
        }
      }
    }
    .ant-menu-item {
      display: flex;
      align-items: center;
      transition: none;
      .white {
        display: none;
      }
      .black {
        display: block;
        margin-right: 10px;
      }
    }
    .ant-menu-item-active {
      .white {
        display: block;
        margin-right: 10px;
      }
      .black {
        display: none;
      }
    }
    .ant-menu-item-selected {
      color: rgba(255, 255, 255, 1);
      background-color: transparent;
      .white {
        display: block;
        margin-right: 10px;
      }
      .black {
        display: none;
      }
    }
    .ant-menu-submenu-title:hover,
    .ant-menu-item:hover {
      color: rgba(255, 255, 255, 1);
    }
    .ant-menu-submenu-title:hover .ant-menu-submenu-arrow::before,
    .ant-menu-submenu-title:hover .ant-menu-submenu-arrow::after {
      background: linear-gradient(to right, #fff, #fff);
    }
    .ant-menu-item:active,
    .ant-menu-submenu-title:active {
      background-color: transparent;
    }
    .ant-menu-item-selected::after {
      opacity: 0;
    }
    .ant-menu-submenu-title,
    .ant-menu-item {
      padding-left: 12px !important;
    }
    .ant-menu-sub > .ant-menu-item {
      padding-left: 28px !important;
      font-size: 12px;
    }
  }
}
</style>