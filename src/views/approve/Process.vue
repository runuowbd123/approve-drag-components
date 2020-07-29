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
      />
    </div>
    <!-- <div class="right">
      <div class="title">title</div>
    </div>-->
    <a-button
      type="primary"
      style="position: absolute; top: -50px;right: 200px;z-index: 99999"
      @click="save"
    >保存</a-button>
  </div>
</template>

<script>
import Tree from "./components/tree";
export default {
  components: {
    Tree
  },
  data() {
    return {
      process: {
        title: "发起人",
        content: "所有人",
        type: 'originator',
        isRoot: true,
        // childNode: {
        //   conditions: [
        //     {
        //       title: "条件1",
        //       content: "条件1content",
        //       sort: 0
        //     },
        //     {
        //       title: "条件2",
        //       content: "条件2content",
        //       sort: 1,
        //       childNode: {
        //         title: "节点审批人",
        //         content: "节点审批人",
        //         type: 'approval'
        //       }
        //     }
        //   ],
        //   childNode: {
        //     conditions: [
        //       {
        //         title: "条件1",
        //         content: "条件1content",
        //         sort: 0
        //       },
        //       {
        //         title: "条件2",
        //         content: "条件2content",
        //         sort: 1
        //       },
        //       {
        //         title: "条件3",
        //         content: "条件3content",
        //         sort: 2
        //       }
        //     ]
        //   }
        // }
      }
    };
  },
  methods: {
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
      console.log('--删除所在位置--',index,'删除对象所在的对象节点' , process,'删除对象所在的对象节点的父对象' ,parent);
      if(process.conditions.length < 3) {
        if(process.content) {
          delete process.conditions;
        } else {
          parent.childNode = process.childNode;
        }
      } else {
        process.conditions.splice(index, 1)
      }
       this.process = JSON.parse(JSON.stringify(this.process));
       console.log(this.process)
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
          },
        ];
        process.childNode = {
          childNode: newProcess.childNode,
          conditions: newProcess.conditions,
        };
      } else {
        delete process.conditions;
        process.childNode = {
          title: type==="approval" ? '审批人': '抄送人',
          type: type,
          content: "",
          childNode: newProcess.childNode,
          conditions: newProcess.conditions
        };
      }
      this.process = JSON.parse(JSON.stringify(this.process));
      console.log(process,this.process);
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
            },
          ],
          childNode: {
            ...childNode
          }
        };
      } else {
        process.childNode = {
          title: type==="approval" ? '审批人': '抄送人',
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
      if(process.conditions && process.conditions.length > 0) { // 当前部分对象中有条件conditions字段
        parent.childNode = {
          conditions: process.conditions,
          childNode: process.childNode
        }
        console.log(parent.childNode)

      } else { // 当前部分对象中无条件conditions字段
        parent.childNode = process.childNode
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
  .right {
    flex: none;
    width: 350px;
    border-left: 1px solid #ccc;
    .title {
      padding: 10px;
    }
  }
}
</style>
