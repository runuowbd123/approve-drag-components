<template>
  <a-modal
    :maskClosable="false"
    title="计算公式设置"
    :visible="formulaModalShow"
    @ok="onOk"
    @cancel="onCancel"
    style="positon:relative"
  >
    <a-icon
      type="arrow-left"
      style="font-size: 20px;position: absolute;right: 80px;top:150px;z-index: 999;cursor: pointer"
      @click="back()"
    />
    <div
      style="color: red;position: absolute;right: 40px;top:150px;z-index: 999;cursor: pointer"
      @click="clear()"
    >清空</div>
    <a-textarea readonly :value="textarea" class="textarea" />
    <div class="tip">仅有数字输入框和金额控件可以用于计算</div>
    <div class="formula-components">
      <div class="title">可选控件</div>
      <div class="content">
        <div
          class="content-item"
          v-for="(item, index) in toolList"
          :key="index"
          @click="changeFormula(item)"
        >{{item.label}}</div>
      </div>
    </div>
    <div class="formula-components">
      <div class="title">符号</div>
      <div class="content">
        <div
          class="content-item"
          v-for="(item, index) in symbolList"
          :key="index"
          @click="changeFormula(item)"
        >{{item.label}}</div>
      </div>
    </div>
    <div class="formula-components">
      <div class="title">数字</div>
      <div class="content">
        <div
          class="content-item"
          v-for="(item, index) in numberList"
          :key="index"
          @click="changeFormula(item)"
        >{{item.label}}</div>
      </div>
    </div>
  </a-modal>
</template>

<script>
export default {
  props: {
    formulaModalShow: {
      type: Boolean,
      default: false,
      required: true
    },
    toolList: {
      type: Array,
      default: () => [],
      required: true
    },
    defaultFormulaList: {
      type: Array,
      default: () => [],
      required: false
    }
  },
  data() {
    return {
      formulaList: [], // textarea中显示的计算公式
      symbolList: [
        { label: "+", key: "+" },
        { label: "-", key: "-" },
        { label: "×", key: "*" },
        { label: "÷", key: "/" },
        { label: "(", key: "(" },
        { label: ")", key: ")" }
      ], // 符号数组
      numberList: [
        { label: "0", key: "0" },
        { label: "1", key: "1" },
        { label: "2", key: "2" },
        { label: "3", key: "3" },
        { label: "4", key: "4" },
        { label: "5", key: "5" },
        { label: "6", key: "6" },
        { label: "7", key: "7" },
        { label: "8", key: "8" },
        { label: "9", key: "9" },
        { label: ".", key: "." }
      ]
    };
  },
  computed: {
    textarea() {
      let text = "计算结果 = ";
      this.formulaList.forEach(item => {
        text += item.label;
        text += " ";
      });
      return text;
    }
  },
  created() {
    console.log(
      "可选控件",
      this.toolList,
      "默认的计算公式",
      this.defaultFormulaList
    );
    this.formulaList = JSON.parse(JSON.stringify(this.defaultFormulaList));
  },
  methods: {
    changeFormula(targetObj) {
      this.formulaList.push(targetObj);
    },
    back() {
      this.formulaList.pop();
    },
    clear() {
      this.formulaList = [];
    },
    onOk() {
      if (this.toolList && this.toolList.length > 0) {
        console.log("----计算公式数组", this.formulaList);
        let formulaIsError = false;
        let formulaString = "";
        this.formulaList.forEach(item => {
          if (item.type) {
            formulaString += 1;
          } else {
            formulaString += item.key;
          }
        });
        console.log("------计算公式字符串", formulaString);
        try {
          let number = eval(formulaString);
          console.log(number, "计算公式得到的结果");
          if (isNaN(number)) {
            formulaIsError = true;
          }
        } catch (e) {
          formulaIsError = true;
        }
        if (formulaIsError) {
          this.$message.error("编辑的公式不符合计算法则，无法计算");
        } else {
          this.$emit("changeComponentFormula", this.formulaList);
          this.formulaList = [];
        }
      } else {
        this.$message.error("无可选控件无法设置公式，请先添加可选控件");
      }
    },
    onCancel() {
      this.$emit("closeFormulaModal");
      this.formulaList = [];
    }
  }
};
</script>

<style lang="less" scoped>
.textarea {
  height: 100px;
  resize: none;
}
.tip {
  width: 100%;
  height: 30px;
  line-height: 30px;
  border: 1px solid rgb(0, 153, 204);
  border-radius: 5px;
  background: rgb(215, 239, 247);
  text-align: center;
  margin: 20px 0;
}
.formula-components {
  width: 100%;
  display: flex;
  margin-bottom: 10px;
  .title {
    width: 65px;
    margin-top: 5px;
  }
  .content {
    flex: 1;
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    .content-item {
      min-width: 45px;
      text-align: center;
      border: 1px solid #ccc;
      padding: 3px 5px;
      border-radius: 5px;
      cursor: pointer;
      margin: 0 10px 10px 0;
    }
  }
}
</style>
