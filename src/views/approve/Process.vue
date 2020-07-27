<template>
  <div class="process">
    <div class="left">
      <tree :process="process" />
    </div>
    <div class="right">
      <div class="title">title</div>
    </div>
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
        root: true,
        conditions: [
          {
            title: "条件1",
            content: "条件1content"
          },
          {
            title: "条件2",
            content: "条件2content"
          }
        ],
        childNode: {
          title: "审批人1",
          content: "qwewe1"
        }
      }
    };
  }
};
</script>

<style lang="less" scoped>
.process {
  background: #fff;
  display: flex;
  height: calc(100vh - 80px);

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
