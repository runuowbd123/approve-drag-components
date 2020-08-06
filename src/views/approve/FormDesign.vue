<template>
  <div class="row">
    <!-- 左边组件部分 -->
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
          <!-- 选项 -->
          <div class="title">选项</div>
          <draggable
            class="list-group"
            :list="components.option"
            :group="{ name: 'comp', pull: 'clone', put: false }"
            @change="log"
            :options="{sort: false}"
            filter=".undraggable"
          >
            <div
              class="list-group-item"
              v-for="item in components.option"
              :key="item.id"
            >{{ item.name }}</div>
          </draggable>
          <!-- 日期 -->
          <div class="title">日期</div>
          <draggable
            class="list-group"
            :list="components.date"
            :group="{ name: 'comp', pull: 'clone', put: false }"
            @change="log"
            :options="{sort: false}"
            filter=".undraggable"
          >
            <div
              class="list-group-item"
              v-for="item in components.date"
              :key="item.id"
            >{{ item.name }}</div>
          </draggable>
          <!-- 其他 -->
          <div class="title">其他</div>
          <draggable
            class="list-group"
            :list="components.other"
            :group="{ name: 'comp', pull: 'clone', put: false }"
            @change="log"
            :options="{sort: false}"
            filter=".undraggable"
          >
            <div
              class="list-group-item"
              v-for="item in components.other"
              :key="item.id"
            >{{ item.name }}</div>
          </draggable>
        </a-tab-pane>
        <a-tab-pane key="2" tab="控件组">Content of Tab Pane 2</a-tab-pane>
      </a-tabs>
    </div>

    <!-- 中间手机部分 -->
    <div class="mobile">
      <div class="mobile-wrap">
        <draggable
          :list="componentList"
          group="comp"
          @change="log"
          style="height: 545px;overflow: auto;background: #f3f3f3"
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
            <!-- 单选框 或者 多选框 或者 日期 或者 联系人 或者部门-->
            <template
              v-if="item.type==='radio' || item.type === 'checkbox' || item.type === 'datepicker' || item.type === 'contact' || item.type === 'department'"
            >
              <div
                style="padding: 15px 20px;background: #fff;display: flex;justify-content: space-between"
              >
                <div style="color: #000;width: 6.2em;word-break:break-all;position:relative">
                  {{item.label}}
                  <div
                    style="position:absolute;top: 0;left: -10px;color: red"
                    v-if="item.required"
                  >*</div>
                </div>
                <div style="display: flex;align-items: center">
                  <div
                    style="color: rgb(153, 153, 153);max-width: 150px;word-break:break-all"
                  >{{item.placeholder}}</div>
                  <van-icon name="arrow" style="margin-left: 5px" />
                </div>
              </div>
            </template>
            <!-- 日期区间 -->
            <template v-if="item.type==='datepickerRange'">
              <div class="date-range">
                <div class="date-range-title">
                  {{item.label1}}
                  <div class="red" v-if="item.required">*</div>
                </div>
                <div class="date-range-content">
                  <div class="date-range-content-word">{{item.placeholder}}</div>
                  <van-icon name="arrow" style="margin-left: 5px" />
                </div>
              </div>
              <div class="date-range">
                <div class="date-range-title">
                  {{item.label2}}
                  <div class="red" v-if="item.required">*</div>
                </div>
                <div class="date-range-content">
                  <div class="date-range-content-word">{{item.placeholder}}</div>
                  <van-icon name="arrow" style="margin-left: 5px" />
                </div>
              </div>
              <div class="date-range" v-if="item.autoCalculate">
                <div class="date-range-title">{{item.timeLabel}}</div>
                <div class="date-range-content">
                  <div class="date-range-content-word">自动计算</div>
                  <van-icon name="arrow" style="margin-left: 5px" v-show="false" />
                </div>
              </div>
            </template>
            <!-- 明细/表格 -->
            <template v-if="item.type==='detail'">
              <div style="padding: 10px;background: #fff;">
                <div style="margin-bottom: 5px">明细</div>
                <div
                  style="cursor: pointer;background: rgb(242,242,242);text-align: center;display: flex; flex-direction: column;justify-content: space-around;height:130px;padding: 20px 0;"
                >
                  <div>可拖入多个控件（不包含明细控件）</div>
                  <div style="color: blue">+ 添加</div>
                </div>
              </div>
            </template>
            <!-- 省市区 -->
            <template v-if="item.type==='address'">
              <div class="date-range">
                <div class="date-range-title">
                  {{item.label}}
                  <div class="red" v-if="item.required">*</div>
                </div>
                <div class="date-range-content">
                  <div class="date-range-content-word">请选择</div>
                  <van-icon name="arrow" style="margin-left: 5px" />
                </div>
              </div>
              <van-field type="textarea" placeholder="请输入详细地址" v-if="item.format === 'ssq-detail'" />
            </template>
            <!-- 图片, 附件 -->
            <template v-if="item.type==='picture' || item.type === 'annex'">
              <div class="date-range">
                <div class="date-range-title">
                  {{item.label}}
                  <div class="red" v-if="item.required">*</div>
                </div>
                <div class="date-range-content">
                  <van-icon name="photo" style="font-size: 20px" v-if="item.type==='picture'" />
                  <a-icon type="folder-add" style="font-size: 18px" v-if="item.type==='annex'" />
                </div>
              </div>
            </template>

            <a-icon
              type="close-circle"
              v-if="item.id === clickItemId"
              class="close"
              @click.stop="deleteItem(index, item)"
            />
          </div>
        </draggable>
      </div>
    </div>

    <!-- 右侧组件详情部分 -->
    <div class="component-detail">
      <div class="title">{{clickItem.name}}</div>
      <!-- 单行输入框,多行输入框,数字输入框,金额, 单选框，多选框, 日期, 联系人, 部门 -->
      <div
        v-if="clickItem.type === 'input' || clickItem.type === 'textArea' || clickItem.type === 'number' || clickItem.type === 'money' || clickItem.type === 'radio' || clickItem.type === 'checkbox' || clickItem.type === 'datepicker' || clickItem.type === 'contact' || clickItem.type === 'department'"
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
        <!-- 数字输入框多一个单位配置 -->
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
        <!-- 单选框和多选框多个选项配置 -->
        <template v-if="clickItem.type === 'radio' || clickItem.type === 'checkbox'">
          <div class="component-detail-item-title">
            选项
            <span class="gray">每项最多20个字，最多20项</span>
          </div>
          <div class="component-detail-item-content">
            <draggable class="list-group" :list="clickItem.optionList" :group="{ name: 'comp'}">
              <div
                v-for="(item,index) in clickItem.optionList"
                :key="index"
                style="display: flex;align-items:center;cursor: move;margin-top: 10px"
              >
                <a-icon type="menu" style="margin-right: 5px" />
                <a-input
                  v-model="item.name"
                  style="width: 200px;margin-right: 10px;"
                  :maxLength="20"
                />
                <a-icon
                  type="plus-circle"
                  style="margin-right: 5px;color: rgb(51,153,51);font-size: 16px';cursor: pointer"
                  v-if="clickItem.optionList.length - 1 === index && clickItem.optionList.length < 20"
                  @click="plusOption(clickItem.optionList)"
                />
                <a-icon
                  type="minus-circle"
                  style="color: red;font-size: 14px;cursor: pointer"
                  v-if="clickItem.optionList.length !== 1"
                  @click="deleteOption(clickItem.optionList, index)"
                />
              </div>
            </draggable>
          </div>
        </template>
        <!-- 日期 日期类型组件 -->
        <template v-if="clickItem.type === 'datepicker'">
          <div class="component-detail-item-title">日期类型</div>
          <div class="component-detail-item-content">
            <a-radio-group v-model="clickItem.format" style="display: flex;flex-direction: column">
              <a-radio value="YYYY-MM-DD">年-月-日</a-radio>
              <a-radio value="YYYY-MM-DD HH:mm">年-月-日 时:分</a-radio>
            </a-radio-group>
          </div>
        </template>
        <!-- 联系人 选择范围组件 -->
        <template v-if="clickItem.type === 'contact'">
          <div class="component-detail-item-title">选择范围</div>
          <div class="component-detail-item-content">
            <a-checkbox v-model="clickItem.canChooseMe">可选自己</a-checkbox>
            <a-checkbox v-model="clickItem.canChooseMore">可选多人</a-checkbox>
          </div>
        </template>
        <!-- 部门 选择范围组件 -->
        <template v-if="clickItem.type === 'department'">
          <div class="component-detail-item-title">选择范围</div>
          <div class="component-detail-item-content">
            <a-checkbox v-model="clickItem.canChooseMore">可选多部门</a-checkbox>
          </div>
        </template>
        <div class="component-detail-item-title">验证（勾选后可作为流程条件）</div>
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
            <template v-for="(it,ind) in clickItem.formulaList">
              <span :key="ind" :class="it.type ? 'formula-item-gray' : ''">{{it.label}}{{" "}}</span>
            </template>
          </div>
        </div>
        <div class="component-detail-item-title">验证（勾选后可作为流程条件）</div>
        <a-checkbox :checked="clickItem.required" @change="changeComponentE('required', $event)">必填</a-checkbox>
      </div>

      <!-- 日期区间 -->
      <div v-if="clickItem.type === 'datepickerRange'" class="component-detail-item">
        <div class="component-detail-item-title">
          标题1
          <span class="gray">最多20个字</span>
        </div>
        <div class="component-detail-item-content">
          <a-input v-model="clickItem.label1" :maxLength="20" />
        </div>
        <div class="component-detail-item-title">
          标题2
          <span class="gray">最多20个字</span>
        </div>
        <div class="component-detail-item-content">
          <a-input v-model="clickItem.label2" :maxLength="20" />
        </div>
        <div class="component-detail-item-title">
          提示文字
          <span class="gray">最多20个字</span>
        </div>
        <div class="component-detail-item-content">
          <a-input v-model="clickItem.placeholder" :maxLength="20" />
        </div>
        <div class="component-detail-item-title">日期类型</div>
        <div class="component-detail-item-content">
          <a-radio-group v-model="clickItem.format" style="display: flex;flex-direction: column">
            <a-radio value="YYYY-MM-DD">年-月-日</a-radio>
            <a-radio value="YYYY-MM-DD HH:mm">年-月-日 时:分</a-radio>
          </a-radio-group>
        </div>
        <div class="component-detail-item-title">验证（勾选后可作为流程条件）</div>
        <div class="component-detail-item-content">
          <a-checkbox v-model="clickItem.required">必填</a-checkbox>
        </div>
        <div class="component-detail-item-title">自动计算时长</div>
        <div class="component-detail-item-content">
          <a-checkbox v-model="clickItem.autoCalculate">开启</a-checkbox>
        </div>
        <div class="component-detail-item-title" v-if="clickItem.autoCalculate">
          标题
          <span class="gray">最多20个字</span>
        </div>
        <div class="component-detail-item-content" v-if="clickItem.autoCalculate">
          <a-input v-model="clickItem.timeLabel" :maxLength="20" />
        </div>
      </div>

      <!-- 明细, 省市区, 图片, 附件 -->
      <div
        v-if="clickItem.type === 'address' || clickItem.type === 'detail' || clickItem.type === 'picture' || clickItem.type === 'annex'"
        class="component-detail-item"
      >
        <div class="component-detail-item-title">
          标题
          <span class="gray">最多20个字</span>
        </div>
        <div class="component-detail-item-content">
          <a-input v-model="clickItem.label" :maxLength="20" />
        </div>
        <div class="component-detail-item-title">验证（勾选后可作为流程条件）</div>
        <div class="component-detail-item-content">
          <a-checkbox v-model="clickItem.required">必填</a-checkbox>
        </div>
        <template v-if="clickItem.type === 'address'">
          <!-- 省市区格式配置 -->
          <div class="component-detail-item-title">格式</div>
          <div class="component-detail-item-content">
            <a-radio-group v-model="clickItem.format" style="display: flex;flex-direction: column">
              <a-radio value="ssq">省市区</a-radio>
              <a-radio value="ssq-detail">省市区-详细地址</a-radio>
            </a-radio-group>
          </div>
        </template>
      </div>
    </div>

    <a-button
      type="primary"
      style="position: absolute; top: 10px;right: 200px;z-index: 99999"
      @click="save"
    >保存</a-button>
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
      componentList: [
        {
          category: "number",
          id: 21,
          label: "金额",
          name: "金额",
          placeholder: "请输入金额",
          required: false,
          type: "money"
        }
      ], // 中间手机端添加的组件
      count: 22, // y用于拖拽新组建生成的id
      clickItemId: null, // 选择的组件id
      formulaModalShow: false // 计算公式弹窗
    };
  },
  computed: {
    clickItem() {
      const targetObj = (this.componentList || []).find(item => {
        return item.id === this.clickItemId;
      });
      return targetObj || { name: "无" };
    },
    toolList() {
      const toolList = this.componentList.filter(item => {
        return item.type === "money" || item.type === 'number';
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
    deleteItem(index, item) {
      // 删除组件
      console.log(item, this.componentList)
      this.componentList.splice(index, 1);
      this.clickItemId = null;
      // 当删除金额和数字输入框的时候要清空对应用到这两个组件的计算公式 // todo: 简化这里的遍历
      if(item.type === "money" || item.type === 'number'){
        this.componentList = this.componentList.map((component) => {
          if(component.type === "formula") {
            const formulaList = component.formulaList || [];
            let flag = true;
            formulaList.forEach((formula) => {
              if(formula.id === item.id) {
                flag = false;
              }
            });
            if(flag) {
              return component;
            } else {
              return {
                ...component,
                formulaList: []
              };
            }
          } else {
            return component
          }
        })
      }
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
      // 组件详情更改
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
      // 计算公式更改
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
    },
    plusOption(optionList) {
      if (optionList.length < 20) {
        optionList.push({ name: "" });
      }
    },
    deleteOption(optionList, index) {
      optionList.splice(index, 1);
    },

    save() {
      console.log(this.componentList);
    }
  }
};
</script>
<style lang="less" scoped>
.row {
  display: flex;
  justify-content: space-between;
  background: #f3f3f3;
  height: calc(100vh - 75px);
}
.component-list {
  width: 300px;
  flex: none;
  border-right: 1px solid #ccc;
  padding: 10px;
  overflow: auto;
  background: #fff;
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
  .mobile-wrap {
    padding: 30px 20px;
    background: #fff;
    border-radius: 10px;
    box-shadow: 0px 0px 10px #ccc;
  }
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
  .date-range {
    background: #fff;
    padding: 10px;
    display: flex;
    justify-content: space-between;
    .date-range-title {
      color: #000;
      width: 6.2em;
      word-break: break-all;
      position: relative;
      .red {
        position: absolute;
        top: 0;
        left: -10px;
        color: red;
      }
    }
    .date-range-content {
      display: flex;
      align-items: center;
      .date-range-content-word {
        color: rgb(153, 153, 153);
        max-width: 150px;
        word-break: break-all;
      }
    }
  }
}

.component-detail {
  width: 300px;
  flex: none;
  border-left: 1px solid #ccc;
  background: #fff;
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
        display: flex;
        align-items: center;
        flex-wrap: wrap;
        .formula-item-gray {
          margin: 0 5px;
          padding: 4px;
          border-radius: 4px;
          background: #f0f0f0;
        }
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