<template>
  <div class="member-select">
    <div class="left">
      <div class="selected-list">
        <div
          class="selected-tag"
          v-for="(item,index) in selectedList"
          :key="index"
          @click="deleteMember(item.id)"
        >
          <span>{{item.name}}</span>
          <span v-if="item.number > 0">({{item.number}})人</span>
          <span class="close">×</span>
        </div>
        <a-select
          show-search
          :value="inputvalue"
          placeholder="请输入姓名"
          style="width: 100px;margin: 0 10px 10px 0"
          :default-active-first-option="false"
          :show-arrow="false"
          :filter-option="false"
          :not-found-content="null"
          @search="handleSearch"
          @change="handleChange"
          :dropdownMatchSelectWidth="false"
        >
          <a-select-option v-for="item in filterList" :key="item.id" :item="item">
            <div
              style="display: flex;width: 200px;box-sizing: border-box;height: 55px;align-items: center"
            >
              <img
                src="../assets/images/s2.jpg"
                alt="头像"
                style="width: 40px;height: 40px;border-radius: 20px"
              />
              <div
                style="height: 55px;margin-left: 10px;display: flex; flex-direction: column; justify-content: space-around"
              >
                <div style="font-size: 16px;color: #000">{{ item.name }}</div>
                <div style="font-size: 12px">XXX部门</div>
              </div>
            </div>
          </a-select-option>
        </a-select>
      </div>
      <div class="button-list">
        <a-button
          type="primary"
          style="margin-right: 20px"
          :disabled="selectedList.length === 0"
          @click="onOk"
        >确定</a-button>
        <a-button @click="onCancel">取消</a-button>
      </div>
    </div>
    <div class="right">
      <a-breadcrumb style="flex: none;padding-left: 20px;">
        <a-breadcrumb-item
          :style="index === breadList.length - 1 ? 'cursor: pointer; color: #ccc': 'cursor: pointer; color: #000'"
          v-for="(item, index) in breadList"
          :key="index"
          :class="index === breadList.length - 1 ? 'bread-forbidden' : 'bread'"
        >
          <span @click="changeBread(item)">{{item.name}}</span>
        </a-breadcrumb-item>
      </a-breadcrumb>
      <div class="member-list">
        <template>
          <div class="member-item" @click.prevent="selectMember('all')">
            <a-radio :checked="isSelectedAll()">全选</a-radio>
          </div>
          <div
            v-for="(item, index) in memberList"
            :key="index"
            class="member-item"
            @click.prevent="selectMember(item)"
          >
            <a-radio :checked="isSelected(item)">
              <img
                v-if="item.img"
                src="../assets/images/s2.jpg"
                alt="头像"
                style="width: 40px;height: 40px;border-radius: 20px;margin-right: 5px"
              />
              {{item.name}}
              <span v-if="item.number > 0">({{item.number}})</span>
            </a-radio>
            <div
              class="lower-level"
              v-if="item.number > 0"
              @click.stop="changeLevel(item)"
              :style="isSelected(item) ? 'cursor: not-allowed' : 'cursor: pointer'"
            >下级</div>
          </div>
        </template>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    defaultSelect: {
      type: Array,
      default: () => [],
      required: false
    }
  },
  data() {
    return {
      memberList: [], // 右侧选择列表中的数据
      selectedList: [], // 左侧选中的列表数据结构{name: '111', id: 111, number: 11}
      inputvalue: undefined, // 输入框
      filterList: [], // 左侧输入框下拉框列表
      breadList: [] // 面包屑
    };
  },
  created() {
    // 初始化赋值默认已选择的人
    if (this.defaultSelect && this.defaultSelect.length > 0) {
      this.selectedList = this.defaultSelect.map((item) => {
        if (item.deptId) {
          return {
            ...item,
            id: item.deptId,
            name: item.deptName
          }
        } else {
          return {
            ...item,
            id: item.qfyAcctId,
            name: item.qfyAcctName
          }
        }
      })
    }
    // 这里需要给面包屑赋值初始第一个对象
    const userInfo = JSON.parse(sessionStorage.getItem("userInfo"));
    const targetObj = userInfo.entps.find(item => {
      return item.id === userInfo.curr.id;
    });
    this.breadList.push({
      ...targetObj,
      deptPId: "0",
      deptName: targetObj.entpName,
      id: "0",
      name: targetObj.entpName
    });
    console.log("userInfo", userInfo, "breadList", this.breadList);
    // 再去获取右边的列表
    this.getMemberList();
  },
  methods: {
    isSelected(targetObj) {
      let selected = false;
      this.selectedList.forEach(item => {
        if (item.id === targetObj.id) {
          selected = true;
        }
      });
      return selected;
    },
    isSelectedAll() {
      let selectedAll = true;
      this.memberList.forEach(item => {
        const targetIndex = this.selectedList.findIndex(it => {
          return it.id === item.id;
        });
        if (targetIndex === -1) {
          selectedAll = false;
        }
      });
      return selectedAll;
    },
    handleSearch(value) {
      // 搜索框搜索
      console.log("search");
      const data = [
        {
          qfyAcctName: "请问",
          qfyAcctId: 'id123'
        }
      ];
      this.filterList = data.map((item) => {
        return {
          ...item,
          id: item.qfyAcctId,
          name: item.qfyAcctName
        }
      })
    },
    handleChange(value, obj) {
      // 搜索框点击选择搜索出来的人员时调用
      console.log(value, obj.data.attrs.item);
      const targetObj = obj.data.attrs.item;
      let canAdd = true;
      this.selectedList.forEach(item => {
        if (item.id === targetObj.id) {
          canAdd = false;
        }
      });
      if (canAdd) {
        this.selectedList.push(targetObj);
      } else {
        this.$message.error("不能重复选择");
      }
      this.inputvalue = "";
      this.filterList = [];
    },
    deleteMember(id) {
      // 删除人员
      this.selectedList = this.selectedList.filter(item => {
        return item.id !== id;
      });
    },
    onOk() {
      console.log("确定,选中的人员", this.selectedList);
    },
    onCancel() {
      console.log("取消");
    },
    changeBread(targetObj) {
      // 点击面包屑
      const targetIndex = this.breadList.findIndex(item => {
        return item.id === targetObj.id;
      });
      console.log(targetIndex);
      if (targetIndex !== this.breadList.length - 1) {
        this.breadList = this.breadList.slice(0, targetIndex + 1);
        this.getMemberList();
      }
    },
    getMemberList() {
      console.log("获取memberList");
      const data = [
        {
          deptName: "销售部",
          deptId: 1,
          number: 12
        },
        {
          deptName: "研发部",
          deptId: 2,
          number: 23
        },
        {
          deptName: "客服部",
          deptId: 3,
          number: 22
        },
        {
          qfyAcctName: "蔡总",
          qfyAcctId: 111
        },
        {
          qfyAcctName: "蔡经理",
          qfyAcctId: 222
        }
      ];
      this.memberList = data.map((item) => {
        if (item.deptId) {
          return {
            ...item,
            id: item.deptId,
            name: item.deptName
          }
        } else {
          return {
            ...item,
            id: item.qfyAcctId,
            name: item.qfyAcctName
          }
        }
      })
    },
    selectMember(targetObj) {
      // 右侧点击radio按钮事件
      if (targetObj !== "all") {
        // 点击具体某个人或者部门
        let isExistence = false;
        const targetIndex = this.selectedList.findIndex(item => {
          return item.id === targetObj.id;
        });
        if (targetIndex !== -1) {
          this.selectedList = this.selectedList.filter(item => {
            return item.id !== targetObj.id;
          });
        } else {
          this.selectedList.push(targetObj);
        }
      } else {
        // 点击全选
        let isSelectedAll = this.isSelectedAll();
        if (isSelectedAll) {
          this.selectedList = this.selectedList.filter(item => {
            const canFind = this.memberList.findIndex(it => {
              return it.id === item.id;
            });
            return canFind === -1;
          });
        } else {
          this.memberList.forEach(item => {
            const canFind = this.selectedList.findIndex(it => {
              return it.id === item.id;
            });
            if (canFind === -1) {
              this.selectedList.push(item);
            }
          });
        }
      }
      console.log(this.selectedList);
    },
    changeLevel(targetObj) {
      // 点击下级
      if (!this.isSelected(targetObj)) {
        this.breadList.push(targetObj);
        console.log(this.breadList);
        // this.getMemberList();
        this.memberList = [
          {
            qfyAcctName: "测试1",
            qfyAcctId: 43,
            name: "测试1",
            id: 43
          }
        ];
      }
    }
  }
};
</script>
<style lang="less" scoped>
.member-select {
  width: 680px;
  height: 490px;
  overflow: auto;
  display: flex;
  border: 1px solid #ccc;
  .left {
    width: 50%;
    border-right: 1px solid #ccc;
    box-sizing: border-box;
    overflow: auto;
    padding: 20px 20px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    .selected-list {
      display: flex;
      align-items: center;
      flex-wrap: wrap;
      .selected-tag {
        margin: 0 10px 10px 0;
        height: 30px;
        padding: 0 10px;
        background: rgb(241, 241, 242);
        border-radius: 4px;
        color: #000;
        cursor: pointer;
        display: flex;
        align-items: center;
        &:hover {
          background: rgb(231, 232, 232);
        }
        .close {
          font-size: 18px;
        }
      }
    }
  }
  .right {
    width: 50%;
    padding: 15px 0;
    display: flex;
    flex-direction: column;
    .bread {
      &:hover {
        color: #1890ff !important;
      }
    }
    .bread-forbidden {
      cursor: not-allowed !important;
    }
    .member-list {
      flex: 1;
      overflow: auto;
      margin-top: 10px;
      .member-item {
        height: 50px;
        padding: 0 20px;
        position: relative;
        &:hover {
          background: rgb(241, 241, 242);
        }
        .ant-radio-wrapper {
          width: 100%;
          height: 100%;
          display: flex;
          align-items: center;
        }
        .lower-level {
          position: absolute;
          right: 0px;
          top: 10px;
          height: 30px;
          display: flex;
          align-items: center;
          padding: 0 20px 0 10px;
          border-left: 1px solid #ccc;
          cursor: pointer;
          &:hover {
            color: #1890ff;
          }
        }
      }
    }
  }
}
</style>