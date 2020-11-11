<template>
  <a-drawer
    placement="right"
    :closable="false"
    :maskClosable="false"
    :visible="visible"
    @close="close"
    width="500px"
  >
    <!-- 标题 -->
    <div slot="title">
      <a-form-model
        :model="editData"
        :label-col="labelCol"
        :wrapper-col="wrapperCol"
        ref="form"
      >
        <div
          style="
            display: flex;
            justify-content: space-between;
            align-items: center;
          "
        >
          <div v-if="editData.type === 'originator'">
            {{ editData.title }}
          </div>
          <a-form-model-item
            prop="title"
            :rules="{ required: true, message: '请输入' }"
            style="margin-bottom: 0"
            v-else
          >
            <a-input v-model="editData.title" style="width: 300px" />
          </a-form-model-item>
          <a-form-model-item
            prop="sort"
            style="margin-bottom: 0"
            v-if="editData.type === 'condition'"
          >
            <a-select v-model="editData.sort" style="width: 90px">
              <a-select-option
                :value="index"
                v-for="(item, index) in formDataParentConditions"
                :key="index"
                >优先级{{ index + 1 }}</a-select-option
              >
            </a-select>
          </a-form-model-item>
        </div>
      </a-form-model>
    </div>
    <!-- 条件节点内容 -->
    <div v-if="editData.type === 'condition'">
      <div class="top-title">当审批单同时满足以下条件时，进入此流程</div>
      <template v-for="(item, index) in editData.content">
        <div
          :key="index"
          style="
            display: flex;
            align-items: center;
            justify-content: space-between;
            margin-bottom: 15px;
          "
        >
          <div style="width: 90px">{{ item.label }}：</div>
          <!-- <a-select style="flex: 1">
            <a-select-option value="lucy"> Lucy </a-select-option>
          </a-select> -->
          <a-icon
            type="delete"
            style="
              color: #1890ff;
              font-size: 18px;
              width: 30px;
              margin-left: 10px;
              cursor: pointer;
            "
            @click="deleteCondition(item)"
          />
        </div>
      </template>
      <div style="display: flex; align-items: center">
        <a-button type="primary" @click="openConditionModal">添加条件</a-button>
        <div style="margin-left: 10px">
          还有{{ canChooseComponentList.length }}个可用条件
        </div>
      </div>
    </div>
    <!-- 审批人节点内容 -->
    <div v-else-if="editData.type === 'approval'">审批人</div>
    <!-- 抄送人节点内容 -->
    <div v-else-if="editData.type === 'CCperson'">抄送人</div>
    <div style="display: flex; flex-direction: row-reverse">
      <a-button type="primary" @click="save">保存</a-button>
      <a-button @click="close" style="margin-right: 20px">取消</a-button>
    </div>

    <!-- 添加条件弹窗 -->
    <a-modal
      :maskClosable="false"
      title="选择条件"
      v-if="conditionModalShow"
      :visible="conditionModalShow"
      @cancel="
        () => {
          conditionModalShow = false;
        }
      "
      @ok="addConditionModalOk"
    >
      <a-checkbox-group v-model="conditionList">
        <a-checkbox
          v-for="(item, index) in requiredComponentList"
          :value="item.id"
          :key="index"
          >{{ item.label }}</a-checkbox
        >
      </a-checkbox-group>
    </a-modal>
  </a-drawer>
</template>

<script>
import Vue from 'vue'
export default {
  props: {
    visible: {
      type: Boolean,
      default: false,
      required: true,
    },
    formData: {
      type: Object,
      default: () => {
        return {};
      },
      required: true,
    },
    formDataParentConditions: {
      type: Array,
      default: () => {
        return [];
      },
      required: false,
    },
    componentList: {
      type: Array,
      default: () => [],
      required: false,
    },
  },
  data() {
    let requiredComponentList = this.componentList.filter((item) => {
      return item.required;
    });
    requiredComponentList.unshift({ label: "发起人", id: "originator" });
    return {
      labelCol: { span: 4 },
      wrapperCol: { span: 20 },
      requiredComponentList, // 选择条件的选择列表
      editData: {}, // 当前编辑的数据
      originSort: undefined, // 条件节点刚进来的时候的优先级
      conditionModalShow: false, // 添加条件弹窗
      conditionList: [], //添加条件弹窗内的值
    };
  },
  computed: {
    // 过滤掉当前已选择的组件，剩下未选择的组件
    canChooseComponentList() {
      const list = (this.requiredComponentList || []).filter((item) => {
        let flag = true;
        (this.editData.content || []).forEach((contentItem) => {
          if (item.id === contentItem.id) {
            flag = false;
          }
        });
        return flag;
      });
      return list;
    },
  },
  created() {
    console.log(this.formData);
    this.editData = JSON.parse(JSON.stringify(this.formData));
    this.originSort = JSON.parse(JSON.stringify(this.formData)).sort;
  },
  methods: {
    save() {
      if (this.originSort > -1) {
        this.$emit("save", this.editData, this.originSort);
      } else {
        this.$emit("save", this.editData);
      }
    },
    close() {
      this.$emit("close");
    },
    // 点击添加条件按钮
    openConditionModal() {
      this.conditionModalShow = true;
      this.conditionList = (this.editData.content || []).map((item) => item.id);
    },
    // 选择条件弹窗点击确定
    addConditionModalOk() {
      console.log(this.conditionList);
      const newContent = this.conditionList.map((item) => {
        let flag = false;
        (this.editData.content || []).forEach((contentItem) => {
          if (contentItem.id === item) {
            flag = contentItem;
          }
        });
        if (flag) {
          return flag;
        } else {
          //todo: 根据添加不同的组件对象中需要赋予不同属性值
          const target = this.requiredComponentList.find((c) => {
            return c.id === item;
          });
          return {
            ...target
          };
        }
      });
      this.editData.content = newContent;
      this.conditionModalShow = false;
      console.log(this.editData.content);
    },
    // 点击删除按钮
    deleteCondition(target) {
      console.log(target);
      this.editData.content = this.editData.content
    }
  },
};
</script>

<style scoped>
.top-title {
  display: flex;
  padding: 10px 0;
  justify-content: center;
  margin-bottom: 20px;
  border: 1px solid #6897f8;
  color: #6897f8;
  background: #e4f6ff;
  border-radius: 5px;
}
</style>

