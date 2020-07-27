<template>
  <div class="tree-wrap">
    <div style="display: flex; flex-direction:column;align-items: center;">
      <div class="tree-item">
        <div
          style="position:absolute;left:0;top:0;width: 100%;background: #fff;z-index: 999;height: 20px"
          v-if="process.root"
        ></div>
        <div class="tree-item-border"></div>
        <div class="tree-item-content">
          {{process.title}}
          {{process.content}}
        </div>
      </div>
      <div class="add-button">
        <div style="padding-left: 40px;">+</div>
        <div class="tree-item-border"></div>
      </div>
      <!-- <tree v-if="item.children" :children="item.children"></tree> -->
    </div>
    <div class="tree">
      <div v-for="(item, index) in process.conditions" :key="index">
        <div class="tree-item">
          <div class="tree-item-border"></div>
          <div class="tree-item-content">
            {{item.title}}
            {{item.content}}
          </div>
        </div>
        <div class="add-button">
          <div style="padding-left: 40px;">+</div>
          <div class="tree-item-border"></div>
        </div>
      </div>
    </div>
    <tree v-if="process.childNode" :process="process.childNode"/>
  </div>
</template>

<script>
export default {
  name: "tree",
  props: {
    process: {
      type: Object,
      default: {},
      required: true
    }
  },
  data() {
    return {};
  }
};
</script>

<style lang="less" scoped>
.tree-wrap {
  color: #000;
  .tree {
    display: flex;
    justify-content: center;
  }
  .tree-item {
    width: 220px;
    padding: 20px;
    position: relative;
    .tree-item-border {
      border-right: 1px solid #000;
      position: absolute;
      height: 100%;
      top: 0;
      left: 50%;
    }
    .tree-item-content {
      padding: 10px;
      border: 1px solid #ccc;
      background: #fff;
      z-index: 999;
      position: relative;
    }
  }
  .add-button {
    padding: 20px;
    position: relative;
    .tree-item-border {
      border-right: 1px solid #000;
      position: absolute;
      height: 100%;
      top: 0;
      left: 50%;
    }
  }
}
</style>
