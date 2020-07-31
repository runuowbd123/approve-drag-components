<template>
  <a-drawer
    placement="right"
    :closable="false"
    :maskClosable="false"
    :visible="visible"
    @close="close"
    width="500px"
  >
    <div slot="title">
      <a-form-model :model="editData" :label-col="labelCol" :wrapper-col="wrapperCol" ref="form">
        <div style="display: flex;justify-content: space-between">
          <a-form-model-item
            prop="title"
            :rules="{ required: true, message: '请输入' }"
            style="margin-bottom:0"
          >
            <a-input v-model="editData.title" style="width: 300px" />
          </a-form-model-item>
          <a-form-model-item prop="sort" style="margin-bottom:0" v-if="editData.sort > -1">
            <a-select v-model="editData.sort" style="width: 90px">
              <a-select-option
                :value="index"
                v-for="(item, index) in formDataParentConditions"
                :key="index"
              >优先级{{index + 1}}</a-select-option>
            </a-select>
          </a-form-model-item>
        </div>
      </a-form-model>
    </div>
    <a-form-model :model="editData" :label-col="labelCol" :wrapper-col="wrapperCol" ref="form">
      <!-- <a-form-model-item prop="title" :rules="{ required: true, message: '请输入' }">
        <a-input v-model="editData.title" style="width: 370px" />
      </a-form-model-item>-->
    </a-form-model>
    <div style="display: flex;flex-direction: row-reverse">
      <a-button type="primary" @click="save">保存</a-button>
      <a-button @click="close" style="margin-right: 20px">取消</a-button>
    </div>
  </a-drawer>
</template>

<script>
export default {
  props: {
    visible: {
      type: Boolean,
      default: false,
      required: true
    },
    formData: {
      type: Object,
      default: () => {
        return {};
      },
      required: true
    },
    formDataParentConditions: {
      type: Array,
      default: () => {
        return [];
      },
      required: false
    }
  },
  data() {
    return {
      labelCol: { span: 4 },
      wrapperCol: { span: 20 },
      editData: {},
      originSort: undefined
    };
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
    }
  }
};
</script>

<style scoped>
</style>

