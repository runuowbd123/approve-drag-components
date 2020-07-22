<template>
  <div class="row">
    <div class="component-list">
      <a-tabs v-model="activeTab">
        <a-tab-pane key="1" tab="基础控件">
          <!-- 文本组件 -->
          <div class="title">文本</div>
          <draggable
            class="list-group"
            :list="components.text"
            :group="{ name: 'comp', pull: 'clone', put: false }"
            @change="log"
            :options="{sort: false}"
            filter=".undraggable"
          >
            <div
              class="list-group-item"
              v-for="item in components.text"
              :key="item.id"
            >{{ item.name }}</div>
          </draggable>
          <!-- 数值组件 -->
          <div class="title">数值</div>
          <draggable
            class="list-group"
            :list="components.number"
            :group="{ name: 'comp', pull: 'clone', put: false }"
            @change="log"
            :options="{sort: false}"
            filter=".undraggable"
          >
            <div
              class="list-group-item"
              v-for="item in components.number"
              :key="item.id"
            >{{ item.name }}</div>
          </draggable>
        </a-tab-pane>
        <a-tab-pane key="2" tab="控件组">Content of Tab Pane 2</a-tab-pane>
      </a-tabs>
    </div>
    <div class="mobile">
      <draggable
        :list="componentList"
        group="comp"
        @change="log"
        style="height: 545px;overflow: auto;background: rgb(248,248,249);"
      >
        <div
          v-for="(item,index) in componentList"
          :key="index"
          class="list-group-item1"
          :class="item.id === clickItemId ? 'list-group-item-active': ''"
          @click="clickComponent(item)"
        >
          <!-- 单行输入框 -->
          <template v-if="item.type==='input'">
            <van-field
              :label="item.label"
              :placeholder="item.placeholder"
              :required="item.required"
            />
          </template>
          <!-- 多行输入框 -->
          <template v-if="item.type==='textArea'">
            <van-field
              type="textarea"
              :label="item.label"
              :placeholder="item.placeholder"
              :required="item.required"
            />
          </template>
          <!-- 说明文字 -->
          <template v-if="item.type==='explain'">
            <van-field type="textarea" placeholder="请输入说明文字" :value="item.content" />
          </template>
          <!-- 数字输入框 -->
          <template v-if="item.type==='number'">
            <van-field
              type="number"
              :label="item.label"
              :placeholder="item.placeholder"
              :required="item.required"
            />
            <div style="width: 100%;padding: 0 16px">
              <div
                style="font-size: 12px;color: #ccc;width: 6.2em;display: flex;justify-content: center;word-break:break-all"
              >({{item.unit}})</div>
            </div>
          </template>
          <!-- 金额 -->
          <template v-if="item.type==='money'">
            <van-field
              type="number"
              :label="item.label"
              :placeholder="item.placeholder"
              :required="item.required"
            />
          </template>
          <!-- 计算公式 -->
          <template v-if="item.type==='formula'">
            <van-field :label="item.label" :value="'自动计算'" :required="item.required" />
          </template>

          <a-icon
            type="close-circle"
            v-if="item.id === clickItemId"
            class="close"
            @click.stop="deleteItem(index)"
          />
        </div>
      </draggable>
    </div>

    <div class="component-detail">
      <div class="title">{{clickItem.name}}</div>
      <!-- 单行输入框,多行输入框,数字输入框 -->
      <div
        v-if="clickItem.type === 'input' || clickItem.type === 'textArea' || clickItem.type === 'number' || clickItem.type === 'money'"
        class="component-detail-item"
      >
        <div class="component-detail-item-title">
          标题
          <span class="gray">最多20个字</span>
        </div>
        <div class="component-detail-item-content">
          <a-input
            :value="clickItem.label"
            @change="changeComponentE('label', $event)"
            :maxLength="20"
          />
        </div>
        <div class="component-detail-item-title">
          提示文字
          <span class="gray">最多20个字</span>
        </div>
        <div class="component-detail-item-content">
          <a-input
            :value="clickItem.placeholder"
            @change="changeComponentE('placeholder', $event)"
            :maxLength="20"
          />
        </div>
        <template v-if="clickItem.type === 'number'">
          <div class="component-detail-item-title">
            单位
            <span class="gray">最多20个字</span>
          </div>
          <div class="component-detail-item-content">
            <a-input
              :value="clickItem.unit"
              @change="changeComponentE('unit', $event)"
              :maxLength="20"
            />
          </div>
        </template>
        <div class="component-detail-item-title">验证</div>
        <a-checkbox :checked="clickItem.required" @change="changeComponentE('required', $event)">必填</a-checkbox>
      </div>

      <!-- 说明文字 -->
      <div v-if="clickItem.type === 'explain'" class="component-detail-item">
        <div class="component-detail-item-title">
          说明文字
          <span class="gray">最多50个字</span>
        </div>
        <div class="component-detail-item-content">
          <a-textarea
            :value="clickItem.content"
            @change="changeComponentE('content', $event)"
            :maxLength="50"
            :autoSize="{minRows: 6, maxRows: 6}"
          />
        </div>
      </div>

      <!-- 计算公式 -->
      <div v-if="clickItem.type === 'formula'" class="component-detail-item">
        <div class="component-detail-item-title">
          标题
          <span class="gray">最多20个字</span>
        </div>
        <div class="component-detail-item-content">
          <a-input
            :value="clickItem.label"
            @change="changeComponentE('label', $event)"
            :maxLength="20"
          />
        </div>
        <div class="component-detail-item-title">计算公式</div>
        <div class="component-detail-item-content formula" @click="formulaModalShow=true">
          <div class="formula-item">
            计算结果 =
            <span v-for="(it,ind) in clickItem.formulaList" :key="ind">{{it.label}}{{" "}}</span>
          </div>
        </div>
        <div class="component-detail-item-title">验证</div>
        <a-checkbox :checked="clickItem.required" @change="changeComponentE('required', $event)">必填</a-checkbox>
      </div>
    </div>

    <formulaModal
      v-if="formulaModalShow"
      :formulaModalShow="formulaModalShow"
      :toolList="toolList"
      :defaultFormulaList="clickItem.formulaList"
      @changeComponentFormula="changeComponentFormula"
      @closeFormulaModal="formulaModalShow=false"
    />
  </div>
</template>

<script>
import draggable from "vuedraggable";
import components from "./componentList";
import formulaModal from "./components/formulaModal";
export default {
  components: {
    draggable,
    formulaModal
  },
  data() {
    return {
      activeTab: "1",
      components, // 可选组件
      componentList: [], // 中间手机端添加的组件
      count: 7, // y用于拖拽新组建生成的id
      clickItemId: null, // 选择的组件id
      formulaModalShow: false // 计算公式弹窗
    };
  },
  computed: {
    clickItem() {
      const targetObj = this.componentList.find(item => {
        return item.id === this.clickItemId;
      });
      return targetObj || { name: "无" };
    },
    toolList() {
      const toolList = this.componentList.filter(item => {
        return item.category === "number" && item.type !== "formula";
      });
      return toolList || [];
    }
  },
  methods: {
    log(evt) {
      // 移动组件触发函数
      console.log(evt);
      if (evt.added) {
        this.count += 1;
        const item = evt.added.element;
        const idx = this.componentList.findIndex(e => e.id === item.id);
        let temp = JSON.parse(JSON.stringify(this.componentList));
        temp[idx].id = this.count;
        this.componentList = temp;
      }
      console.log(this.componentList);
    },
    deleteItem(index) {
      // 删除组件
      this.componentList.splice(index, 1);
      this.clickItemId = null;
    },
    clickComponent(target) {
      // 点击选中组件
      console.log("click target", target);
      if (this.clickItemId === target.id) {
        this.clickItemId = null;
      } else {
        this.clickItemId = target.id;
      }
      console.log(this.clickItemId);
    },
    changeComponentE(name, e) {
      console.log(name, e.target.value, this.clickItemId, this.componentList);
      this.componentList = this.componentList.map(item => {
        if (item.id === this.clickItemId) {
          let newItem = item;
          if (e.target.type === "checkbox") {
            newItem[name] = e.target.checked;
          } else {
            newItem[name] = e.target.value;
          }
          return newItem;
        } else {
          return item;
        }
      });
      console.log(this.componentList);
    },
    changeComponentFormula(formulaList) {
      console.log(formulaList, "计算公式数组");
      this.componentList = this.componentList.map(item => {
        if (item.id === this.clickItemId) {
          let newItem = item;
          newItem.formulaList = formulaList;
          return newItem;
        } else {
          return item;
        }
      });
      this.formulaModalShow = false;
      console.log(this.componentList, "最新的组件数组");
    }
  }
};
</script>
<style lang="less" scoped>
.row {
  display: flex;
  justify-content: space-between;
  background: #fff;
  height: calc(100vh - 75px);
}
.component-list {
  width: 300px;
  flex: none;
  border-right: 1px solid #ccc;
  padding: 10px;
  overflow: auto;
  .title {
    font-size: 14px;
    margin-bottom: 10px;
  }
  .list-group {
    display: flex;
    flex-wrap: wrap;
    .list-group-item {
      position: relative;
      display: block;
      width: 45%;
      margin: 0 5% 10px 0;
      padding: 5px 10px;
      background-color: #fff;
      border: 1px solid #ccc;
      cursor: move;
    }
  }
}
.mobile {
  margin-top: 50px;
  width: 340px;
  flex: none;
  .list-group-item1 {
    position: relative;
    display: block;
    padding: 5px 10px;
    margin-bottom: -1px;
    background-color: #fff;
    box-sizing: border-box;
    cursor: move;
    margin: 10px 0;
  }
  .list-group-item-active {
    border: 1px solid #1890ff;
  }
  .close {
    position: absolute;
    top: 0px;
    right: 0;
    color: #1890ff;
    cursor: pointer;
    font-size: 16px;
  }
  .list-group-item {
    position: relative;
    display: block;
    width: 45%;
    margin: 0 5% 10px 0;
    padding: 10px;
    background-color: #fff;
    border: 1px solid #ccc;
    cursor: move;
  }
}

.component-detail {
  width: 300px;
  flex: none;
  border-left: 1px solid #ccc;
  .title {
    border-bottom: 1px solid #ccc;
    padding: 10px;
  }
  .component-detail-item {
    padding: 10px;
    .component-detail-item-title {
      margin-bottom: 10px;
      .gray {
        color: #999999;
        font-size: 12px;
      }
    }
    .component-detail-item-content {
      margin-bottom: 20px;
    }
    .formula {
      display: flex;
      align-items: center;
      flex-wrap: wrap;
      cursor: pointer;
      border: 1px solid #ccc;
      padding: 10px;
      padding-bottom: 0;
      .formula-item {
        margin: 0 5px 10px 0;
      }
    }
  }
}
</style>
<style lang="less">
.component-list {
  .ant-tabs-nav {
    width: 100% !important;
    .ant-tabs-tab {
      margin: 0;
      width: 50%;
      text-align: center;
    }
  }
}
</style>