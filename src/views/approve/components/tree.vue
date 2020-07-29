<template>
  <div class="tree-wrap">
    <!-- 当前节点信息 -->
    <div
      style="display: flex; flex-direction:column;align-items: center;background: #f5f5f7;"
      v-if="process.title"
    >
      <div class="tree-item">
        <div
          style="position:absolute;left:0;top:0px;width: 100%;background: #f5f5f7;z-index: 999;height: 40px"
          v-if="process.isRoot"
        ></div>
        <div class="tree-item-border"></div>
        <div class="tree-item-content">
          <a-icon
            type="close"
            class="tree-item-content-close"
            style="color: #fff"
            @click.stop="deleteChildNode(process, parent)"
            v-if="!process.isRoot"
          />
          <div
            class="tree-item-content-title"
            style="color: #fff"
            :style="process.type==='originator' ? 'background:#576a95' : (process.type==='approval' ? 'background:#ff943e;' : 'background:#3296fa')"
          >{{process.title}}</div>
          <div class="tree-item-content-content">
            <div v-if="process.content">{{process.content}}</div>
            <div v-else style="color: #999">请设置</div>
          </div>
        </div>
      </div>
      <div class="add-button">
        <a-popover
          :title="null"
          trigger="click"
          placement="bottom"
          :getPopupContainer="(nowNode) => nowNode.parentNode"
        >
          <template slot="content">
            <div class="add-node">
              <div @click="addChildNode(process, 'CCperson')" class="add-node-item">添加抄送人</div>
              <div @click="addChildNode(process, 'approval')" class="add-node-item">添加审批人</div>
              <div @click="addChildNode(process, 'condition')" class="add-node-item">添加条件</div>
            </div>
          </template>
          <a-icon type="plus-circle" class="plus" />
        </a-popover>
        <div class="tree-item-border"></div>
      </div>
    </div>
    <!-- 子节点条件节点 -->
    <div class="tree" v-if="process.conditions && process.conditions.length > 0">
      <div class="addcondition-button" @click="addCondition(process)">添加条件</div>
      <div
        v-for="(item, index) in process.conditions"
        :key="index"
        style="display: flex; flex-direction:column;align-items: center;position:relative"
      >
        <div class="tree-item">
          <div class="tree-item-border"></div>
          <div class="tree-item-content">
            <a-icon
              type="close"
              class="tree-item-content-close"
              @click.stop="deleteCondition(index, process, parent)"
            />
            <div class="tree-item-content-title">
              <div style="width: 110px;text-align:left;word-break: break-all;">{{item.title}}</div>
              <span style="color: #999;">优先级{{item.sort + 1}}</span>
            </div>
            <div class="tree-item-content-content">
              <div v-if="item.content">{{item.content}}</div>
              <div v-else style="color: #999">请设置</div>
            </div>
          </div>
        </div>
        <div class="add-button">
          <a-popover
            :title="null"
            trigger="click"
            placement="bottom"
            :getPopupContainer="(nowNode) => nowNode.parentNode"
          >
            <template slot="content">
              <div class="add-node">
                <div @click="addChildNodeEnd(item, 'CCperson')" class="add-node-item">添加抄送人</div>
                <div @click="addChildNodeEnd(item, 'approval')" class="add-node-item">添加审批人</div>
                <div @click="addChildNodeEnd(item, 'condition')" class="add-node-item">添加条件</div>
              </div>
            </template>
            <a-icon type="plus-circle" class="plus" />
          </a-popover>
          <div class="tree-item-border"></div>
        </div>
        <tree
          v-if="item.childNode"
          :process="item.childNode"
          :parent="item"
          @addCondition="addCondition"
          @addChildNode="addChildNode"
          @addChildNodeEnd="addChildNodeEnd"
          @deleteCondition="deleteCondition"
          @deleteChildNode="deleteChildNode"
        />
        <div class="condition-vertival"></div>
        <div class="border-bottom-right" v-if="index === 0" />
        <div class="border-bottom-left" v-else-if="index === process.conditions.length - 1" />
        <div class="border-bottom-whole" v-else />
        <div class="border-top-right" v-if="index === 0" />
        <div class="border-top-left" v-else-if="index === process.conditions.length - 1" />
        <div class="border-top-whole" v-else />
      </div>
    </div>
    <!-- 如果是条件节点后面还要跟一个加号 -->
    <div class="add-button" v-if="process.conditions && process.conditions.length > 0">
      <a-popover
        :title="null"
        trigger="click"
        placement="bottom"
        :getPopupContainer="(nowNode) => nowNode.parentNode"
      >
        <template slot="content">
          <div class="add-node">
            <div @click="addChildNodeEnd(process, 'CCperson')" class="add-node-item">添加抄送人</div>
            <div @click="addChildNodeEnd(process, 'approval')" class="add-node-item">添加审批人</div>
            <div @click="addChildNodeEnd(process, 'condition')" class="add-node-item">添加条件</div>
          </div>
        </template>
        <a-icon type="plus-circle" class="plus" />
      </a-popover>
      <div class="tree-item-border"></div>
    </div>
    <!-- 除条件节点外的子节点 -->
    <tree
      v-if="process.childNode"
      :process="process.childNode"
      :parent="process"
      @addCondition="addCondition"
      @addChildNode="addChildNode"
      @addChildNodeEnd="addChildNodeEnd"
      @deleteCondition="deleteCondition"
      @deleteChildNode="deleteChildNode"
    />
  </div>
</template>

<script>
export default {
  name: "tree",
  props: {
    process: {
      type: Object,
      default: () => {
        return {};
      },
      required: true
    },
    parent: {
      type: Object,
      default: () => {
        return {};
      },
      required: false
    }
  },
  data() {
    return {};
  },
  methods: {
    addChildNode(process, type) {
      this.$emit("addChildNode", process, type);
    },
    addCondition(process) {
      this.$emit("addCondition", process);
    },
    addChildNodeEnd(process, type) {
      this.$emit("addChildNodeEnd", process, type);
    },
    deleteChildNode(process, parent) {
      this.$emit("deleteChildNode", process, parent);
    },
    deleteCondition(index, process, parent) {
      this.$emit("deleteCondition", index, process, parent);
    }
  }
};
</script>

<style lang="less" scoped>
.tree-wrap {
  color: #000;
  .tree {
    display: flex;
    justify-content: center;
    position: relative;
    z-index: 999;
    background: #f5f5f7;
    .condition-vertival {
      height: 100%;
      width: 0;
      border-right: 1px solid #999;
      position: absolute;
      left: 50%;
      top: 0;
    }
    .addcondition-button {
      cursor: pointer;
      position: absolute;
      top: -17px;
      left: calc(50% - 40px);
      width: 80px;
      padding: 10px 0;
      box-shadow: 0 0 10px #ccc;
      background: #fff;
      z-index: 99999;
      border-radius: 15px;
      color: #1890ff;
    }
    // .border-bottom-whole {
    //   width: 100%;
    //   border-bottom: 1px solid #999;
    //   position: absolute;
    //   bottom: 0;
    // }
    // .border-bottom-left {
    //   width: 50%;
    //   border-bottom: 1px solid #999;
    //   position: absolute;
    //   bottom: 0;
    //   left: 0;
    // }
    // .border-bottom-right {
    //   width: 50%;
    //   border-bottom: 1px solid #999;
    //   position: absolute;
    //   bottom: 0;
    //   right: 0;
    // }
    // .border-top-whole {
    //   width: 100%;
    //   border-bottom: 1px solid #999;
    //   position: absolute;
    //   top: 0;
    // }
    // .border-top-left {
    //   width: 50%;
    //   border-bottom: 1px solid #999;
    //   position: absolute;
    //   top: 0;
    //   left: 0;
    // }
    // .border-top-right {
    //   width: 50%;
    //   border-bottom: 1px solid #999;
    //   position: absolute;
    //   top: 0;
    //   right: 0;
    // }
  }
  .tree-item {
    width: 260px;
    padding: 20px;
    padding-top: 40px;
    position: relative;
    .tree-item-border {
      border-right: 1px solid #999;
      position: absolute;
      height: 100%;
      top: 0;
      left: 50%;
    }
    .tree-item-content {
      background: #fff;
      z-index: 999;
      position: relative;
      cursor: pointer;
      border-radius: 4px;
      box-shadow: 0 0 10px #ccc;
      .tree-item-content-title {
        display: flex;
        align-items: center;
        padding: 10px 15px;
        border-bottom: 1px solid #ccc;
        word-break: break-all;
        border-top-left-radius: 4px;
        border-top-right-radius: 4px;
      }
      .tree-item-content-content {
        display: flex;
        align-items: center;
        flex-wrap: wrap;
        word-break: break-all;
        padding: 20px 15px;
      }
      .tree-item-content-close {
        position: absolute;
        cursor: pointer;
        font-size: 14px;
        color: #999;
        right: 5px;
        top: 10px;
      }
    }
  }
  .add-button {
    background: #f5f5f7;
    padding: 20px;
    padding-bottom: 60px;
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;
    .tree-item-border {
      border-right: 1px solid #999;
      position: absolute;
      height: 100%;
      top: 0;
      left: 50%;
    }
    .plus {
      position: absolute;
      cursor: pointer;
      left: calc(50% + 30px);
      font-size: 20px;
      color: #1890ff;
    }
  }
}
.add-node {
  display: flex;
  .add-node-item {
    width: 120px;
    text-align: center;
    padding: 10px;
    cursor: pointer;
  }
}
</style>
