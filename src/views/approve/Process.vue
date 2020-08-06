<template>
  <div class="process">
    <div class="left">
      <tree
        :process="process"
        @addCondition="addCondition"
        @addChildNode="addChildNode"
        @addChildNodeEnd="addChildNodeEnd"
        @deleteCondition="deleteCondition"
        @deleteChildNode="deleteChildNode"
        @clickItem="clickItem"
      />
    </div>
    <drawer
      v-if="visible"
      :visible="visible"
      :formData="formData"
      :formDataParentConditions="formDataParentConditions"
      @save="saveFormData"
      @close="closeDrawer"
    />
    <a-button
      type="primary"
      style="position: absolute; top: -50px;right: 200px;z-index: 9"
      @click="save"
    >保存</a-button>
  </div>
</template>

<script>
import Tree from "./components/tree";
import drawer from "./components/processDrawer";
export default {
  components: {
    Tree,
    drawer
  },
  data() {
    return {
      visible: false,
      formData: {},
      formDataParentConditions: [],
      currentProcess: {},
      process: {
        title: "发起人",
        content: "所有人",
        type: "originator",
        isRoot: true,
        childNode: {
          conditions: [
            {
              title: "条件1",
              content: "条件1content",
              sort: 0
            },
            {
              title: "条件2",
              content: "条件2content",
              sort: 1
            },
            {
              title: "条件3",
              content: "条件3content",
              sort: 2
            }
          ],
          childNode: {
            title: "222",
            content: "222",
            type: "approval",
            childNode: {
              type: "end"
            }
          }
        }
      }
    };
  },
  methods: {
    clickItem(process, conditionsProcess) {
      console.log(process, conditionsProcess);
      this.formData = JSON.parse(JSON.stringify(process));
      if (conditionsProcess) {
        this.formDataParentConditions = conditionsProcess.conditions;
      }
      this.currentProcess = process;
      this.visible = true;
    },
    closeDrawer() {
      this.visible = false;
    },
    saveFormData(newData, originSort) {
      console.log(newData, originSort);
      if (this.currentProcess.type) {
        this.currentProcess = Object.assign(this.currentProcess, newData);
      } else {
        this.currentProcess = Object.assign(this.currentProcess, newData);
        this.formDataParentConditions.splice(originSort, 1);
        this.formDataParentConditions.splice(
          this.currentProcess.sort,
          0,
          this.currentProcess
        );
        this.formDataParentConditions.forEach((item, index) => {
          item.sort = index;
        });
        console.log(this.formDataParentConditions);
      }
      this.closeDrawer();
    },
    addCondition(process) {
      // 添加条件
      let sort = process.conditions.length;
      process.conditions.push({
        title: `条件${sort + 1}`,
        content: "",
        sort
      });
    },
    deleteCondition(index, process, parent) {
      // 删除条件
      console.log(
        "--删除所在位置--",
        index,
        "删除对象所在的对象节点",
        process,
        "删除对象所在的对象节点的父对象",
        parent
      );
      if (process.conditions.length < 3) {
        if (process.content) {
          delete process.conditions;
        } else {
          parent.childNode = process.childNode;
        }
      } else {
        process.conditions.splice(index, 1);
        process.conditions = process.conditions.map((item, index) => {
          return {
            ...item,
            sort: index
          };
        });
      }
      this.process = JSON.parse(JSON.stringify(this.process));
      console.log(this.process);
    },
    addChildNode(process, type) {
      // 正常节点下的加号
      let newProcess = JSON.parse(JSON.stringify(process));
      if (type === "condition") {
        process.conditions = [
          {
            title: "条件1",
            content: "",
            sort: 0
          },
          {
            title: "条件2",
            content: "",
            sort: 1
          }
        ];
        if (newProcess.conditions) {
          process.childNode = {
            childNode: newProcess.childNode,
            conditions: newProcess.conditions
          };
        } else {
          process.childNode = {
            ...newProcess.childNode
          };
        }
      } else {
        delete process.conditions;
        process.childNode = {
          title: type === "approval" ? "审批人" : "抄送人",
          type: type,
          content: "",
          childNode: newProcess.childNode,
          conditions: newProcess.conditions
        };
      }
      this.process = JSON.parse(JSON.stringify(this.process));
      console.log(process, this.process);
    },
    addChildNodeEnd(process, type) {
      // 条件节点下的加号和条件闭合之后下面的加号
      let childNode = JSON.parse(JSON.stringify(process.childNode || {}));
      console.log(childNode, type);
      if (type === "condition") {
        process.childNode = {
          conditions: [
            {
              title: "条件1",
              content: "",
              sort: 0
            },
            {
              title: "条件2",
              content: "",
              sort: 1
            }
          ],
          childNode: {
            ...childNode
          }
        };
      } else {
        process.childNode = {
          title: type === "approval" ? "审批人" : "抄送人",
          type,
          content: "",
          childNode: {
            ...childNode
          }
        };
      }
      this.process = JSON.parse(JSON.stringify(this.process));
      console.log(process, this.process);
    },
    deleteChildNode(process, parent) {
      //删除节点
      if (process.conditions && process.conditions.length > 0) {
        // 当前部分对象中有条件conditions字段
        parent.childNode = {
          conditions: process.conditions,
          childNode: process.childNode
        };
        console.log(parent.childNode);
      } else {
        // 当前部分对象中无条件conditions字段
        parent.childNode = process.childNode;
      }
      this.process = JSON.parse(JSON.stringify(this.process));
      console.log(this.process);
    },
    save() {
      console.log(this.process);
    }
  }
};
</script>

<style lang="less" scoped>
.process {
  background: #f5f5f7;
  display: flex;
  height: calc(100vh - 80px);
  position: relative;
  .left {
    flex: 1;
    text-align: center;
    overflow: auto;
  }
}
</style>
