<template>
  <div class="tree-wrap">
    <!-- 当前节点信息 -->
    <div
      style="
        display: flex;
        flex-direction: column;
        align-items: center;
        background: #fff;
      "
      v-if="process.type && process.type !== 'end' && process.type !== 'conditions'"
    >
      <div class="tree-item">
        <div
          style="
            position: absolute;
            left: 0;
            top: 0px;
            width: 100%;
            background: #fff;
            z-index: 999;
            height: 40px;
          "
          v-if="process.type === 'originator'"
        ></div>
        <div class="tree-item-border"></div>
        <div class="tree-item-content" @click="clickItem(process)" :style="process.type === 'originator'?'cursor: default' : ''">
          <a-icon
            type="caret-down"
            class="down-icon"
            v-if="process.type !== 'originator'"
          />
          <a-icon
            type="close"
            class="tree-item-content-close"
            style="color: #fff"
            @click.stop="deleteChildNode(process, parent)"
            v-if="process.type !== 'originator'"
          />
          <div
            class="tree-item-content-title"
            style="color: #fff"
            :style="
              process.type === 'originator'
                ? 'background:#576a95'
                : process.type === 'approval'
                ? 'background:#ff943e;'
                : 'background:#3296fa'
            "
          >
            {{ process.title }}
          </div>
          <div class="tree-item-content-content">
            <div v-if="process.content">{{ process.content }}</div>
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
              <div
                @click="addChildNode(process, 'CCperson')"
                class="add-node-item"
              >
                <a-icon
                  type="user"
                  style="font-size: 30px; margin-bottom: 10px"
                />
                抄送人
              </div>
              <div
                @click="addChildNode(process, 'approval')"
                class="add-node-item"
              >
                <a-icon
                  type="user"
                  style="font-size: 30px; margin-bottom: 10px"
                />
                审批人
              </div>
              <div
                @click="addChildNode(process, 'condition')"
                class="add-node-item"
              >
                <a-icon
                  type="user"
                  style="font-size: 30px; margin-bottom: 10px"
                />
                分支
              </div>
            </div>
          </template>
          <a-icon type="plus-circle" class="plus" />
        </a-popover>
        <div class="tree-item-border"></div>
      </div>
    </div>
    <!-- 子节点条件节点 -->
    <div
      class="tree"
      v-if="process.conditions && process.conditions.length > 0"
    >
      <a-icon type="caret-down" class="addcondition-button-down-icon" />
      <div class="addcondition-button" @click="addCondition(process)">
        添加条件
      </div>
      <div
        v-for="(item, index) in process.conditions"
        :key="index"
        style="
          display: flex;
          flex-direction: column;
          align-items: center;
          position: relative;
        "
      >
        <div class="tree-item">
          <a-icon type="caret-down" class="condition-down-icon" />
          <div class="tree-item-border"></div>
          <div class="tree-item-content" @click="clickItem(item, process)">
            <a-icon
              type="close"
              class="tree-item-content-close"
              @click.stop="deleteCondition(index, process, parent)"
            />
            <div class="tree-item-content-title">
              <div
                style="width: 110px; text-align: left; word-break: break-all"
              >
                {{ item.title }}
              </div>
              <span style="color: #999">优先级{{ item.sort + 1 }}</span>
            </div>
            <div class="tree-item-content-content">
              <div v-if="item.content">{{ item.content }}</div>
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
                <div
                  @click="addChildNode(item, 'CCperson')"
                  class="add-node-item"
                >
                  <a-icon
                    type="user"
                    style="font-size: 30px; margin-bottom: 10px"
                  />
                  抄送人
                </div>
                <div
                  @click="addChildNode(item, 'approval')"
                  class="add-node-item"
                >
                  <a-icon
                    type="user"
                    style="font-size: 30px; margin-bottom: 10px"
                  />
                  审批人
                </div>
                <div
                  @click="addChildNode(item, 'condition')"
                  class="add-node-item"
                >
                  <a-icon
                    type="user"
                    style="font-size: 30px; margin-bottom: 10px"
                  />
                  分支
                </div>
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
          @deleteCondition="deleteCondition"
          @deleteChildNode="deleteChildNode"
          @clickItem="clickItem"
        />
        <div class="condition-vertival"></div>
        <div class="border-bottom-right" v-if="index === 0" />
        <div
          class="border-bottom-left"
          v-else-if="index === process.conditions.length - 1"
        />
        <div class="border-bottom-whole" v-else />
        <div class="border-top-right" v-if="index === 0" />
        <div
          class="border-top-left"
          v-else-if="index === process.conditions.length - 1"
        />
        <div class="border-top-whole" v-else />
      </div>
    </div>
    <!-- 如果是条件节点后面还要跟一个加号 -->
    <div
      class="add-button"
      v-if="process.conditions && process.conditions.length > 0"
    >
      <a-popover
        :title="null"
        trigger="click"
        placement="bottom"
        :getPopupContainer="(nowNode) => nowNode.parentNode"
      >
        <template slot="content">
          <div class="add-node">
            <div
              @click="addChildNode(process, 'CCperson')"
              class="add-node-item"
            >
              <a-icon
                type="user"
                style="font-size: 30px; margin-bottom: 10px"
              />
              抄送人
            </div>
            <div
              @click="addChildNode(process, 'approval')"
              class="add-node-item"
            >
              <a-icon
                type="user"
                style="font-size: 30px; margin-bottom: 10px"
              />
              审批人
            </div>
            <div
              @click="addChildNode(process, 'condition')"
              class="add-node-item"
            >
              <a-icon
                type="user"
                style="font-size: 30px; margin-bottom: 10px"
              />
              分支
            </div>
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
      @deleteCondition="deleteCondition"
      @deleteChildNode="deleteChildNode"
      @clickItem="clickItem"
    />
    <div v-if="process.type === 'end'" class="end-item">
      <a-icon type="caret-down" class="end-item-down-icon" />
      流程结束
    </div>
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
      required: true,
    },
    parent: {
      type: Object,
      default: () => {
        return {};
      },
      required: false,
    },
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
    deleteChildNode(process, parent) {
      this.$emit("deleteChildNode", process, parent);
    },
    deleteCondition(index, process, parent) {
      this.$emit("deleteCondition", index, process, parent);
    },
    clickItem(process, conditionsProcess) {
      if (process.type !== "originator") {
        this.$emit("clickItem", process, conditionsProcess);
      }
      // this.$emit("clickItem", process, conditionsProcess);
    },
  },
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
    background: #fff;
    .condition-vertival {
      height: 100%;
      width: 0;
      border-right: 1px solid #998;
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
      padding: 5px 0;
      box-shadow: 0 0 10px #ccc;
      background: #fff;
      z-index: 99999;
      border-radius: 10px;
      color: #1890ff;
      transition: 200ms;
      &:hover{
        font-size: 16px;
      }
    }
    .addcondition-button-down-icon {
      position: absolute;
      font-size: 22px;
      top: -33px;
      color: #998;
      left: calc(50% - 11px);
    }
    .border-bottom-whole {
      width: 100%;
      border-bottom: 1px solid #998;
      position: absolute;
      bottom: 0;
    }
    .border-bottom-left {
      width: 50%;
      border-bottom: 1px solid #998;
      position: absolute;
      bottom: 0;
      left: 0;
    }
    .border-bottom-right {
      width: 50%;
      border-bottom: 1px solid #998;
      position: absolute;
      bottom: 0;
      right: 0;
    }
    .border-top-whole {
      width: 100%;
      border-bottom: 1px solid #998;
      position: absolute;
      top: 0;
    }
    .border-top-left {
      width: 50%;
      border-bottom: 1px solid #998;
      position: absolute;
      top: 0;
      left: 0;
    }
    .border-top-right {
      width: 50%;
      border-bottom: 1px solid #998;
      position: absolute;
      top: 0;
      right: 0;
    }
  }
  .tree-item {
    width: 260px;
    padding: 20px;
    padding-top: 40px;
    position: relative;
    .tree-item-border {
      border-right: 1px solid #998;
      position: absolute;
      height: 100%;
      top: 0;
      left: 50%;
    }
    .condition-down-icon {
      position: absolute;
      font-size: 22px;
      top: 24px;
      color: #998;
      left: calc(50% - 11px);
    }
    .tree-item-content {
      background: #fff;
      z-index: 999;
      position: relative;
      cursor: pointer;
      border-radius: 10px;
      box-shadow: 0 0 10px #ccc;
      .down-icon {
        position: absolute;
        font-size: 22px;
        top: -16px;
        color: #998;
        left: calc(50% - 11px);
      }
      .tree-item-content-title {
        display: flex;
        align-items: center;
        padding: 10px 15px;
        border-bottom: 1px solid #ccc;
        word-break: break-all;
        border-top-left-radius: 8px;
        border-top-right-radius: 8px;
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
    padding: 20px;
    padding-bottom: 60px;
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;
    .tree-item-border {
      border-right: 1px solid #998;
      position: absolute;
      height: 100%;
      top: 0;
      left: 50%;
    }
    .plus {
      position: absolute;
      cursor: pointer;
      left: calc(50% + 10px);
      font-size: 22px;
      color: #1890ff;
      transition: 200ms;
      &:hover{
        font-size: 26px;
      }
    }
  }
}
.add-node {
  display: flex;
  .add-node-item {
    width: 100px;
    padding: 10px 0;
    cursor: pointer;
    display: flex;
    flex-direction: column;
    align-items: center;
    
  }
}
.end-item {
  width: 80px;
  padding: 10px 0;
  box-shadow: 0 0 10px #ccc;
  background: #fff;
  border-radius: 15px;
  margin: 0 auto;
  position: relative;
  .end-item-down-icon {
    position: absolute;
    font-size: 22px;
    top: -16px;
    color: #998;
    left: calc(50% - 11px);
  }
}
</style>
