<template>
  <a-form-model
    ref="searchForm"
    layout="inline"
    :model="formInline"
    @submit="handleSubmit"
    @submit.native.prevent
  >
    <a-form-model-item
      v-for="(item, index) in formList"
      :key="'formModalItem_' + index"
      :label="item.label"
    >
      <!-- input -->
      <a-input
        v-if="item.type == 'input'"
        v-model="formInline[item.name]"
        :placeholder="item.placeholder"
        allowClear
      ></a-input>
      <!-- select 下拉框 -->
      <a-select
        style="width: 200px"
        v-if="item.type == 'select'"
        v-model="formInline[item.name]"
        :mode="item.mode ? item.mode : 'default'"
        optionFilterProp="children"
        :placeholder="item.placeholder"
        allowClear
      >
        <a-select-option
          v-for="(it, idx) in item.options"
          :key="'formModelOption_' + idx"
          :value="item.optionValue ? it[item.optionValue] : it['value']"
          >{{
            item.optionLabel ? it[item.optionLabel] : it["label"]
          }}</a-select-option
        >
      </a-select>
      <!-- select group 下拉框 -->
      <a-select
        style="width: 200px"
        v-if="item.type == 'selectGroup'"
        v-model="formInline[item.name]"
        :mode="item.mode ? item.mode : 'default'"
        optionFilterProp="children"
        :placeholder="item.placeholder"
        allowClear
      >
        <a-select-opt-group
          v-for="(group, groupIdx) in item.list"
          :key="'formModelSelectGroup_' + groupIdx + '_' + group.groupId"
        >
          <span slot="label">
            <a-icon type="apartment" />
            {{ group.groupName }}
          </span>
          <a-select-option
            v-for="(groupOption, optionIdx) in item.groupOptionsName
              ? group[item.groupOptionsName]
              : group['staffs']"
            :key="'groupOption_' + optionIdx"
            :value="groupOption.value"
            >{{ groupOption.name }}</a-select-option
          >
        </a-select-opt-group>
      </a-select>
      <!-- compact 组合 -->
      <a-input-group compact v-if="item.type == 'compact'">
        <a-select
          style="min-width: 94px"
          v-model="formInline[item.compactName]"
        >
          <a-select-option
            v-for="(it, idx) in item.options"
            :key="'formModelOption_' + idx"
            :value="it.value"
            >{{ it.label }}</a-select-option
          >
        </a-select>
        <a-input
          v-if="item.compact == 'input'"
          v-model="formInline[item.name]"
          :placeholder="item.placeholder"
          style="width: 200px"
        />
        <a-range-picker
          v-if="item.compact == 'datepicker'"
          format="YYYY-MM-DD"
          v-model="formInline[item.name]"
        />
      </a-input-group>
      <a-input-group compact v-if="item.type == 'inputCompact'">
        <a-input
          v-model="formInline[item.name][0]"
          style="width: 80px"
          allowClear
        />
        <a-input
          style="
            width: 30px;
            border-left: 0;
            pointer-events: none;
            backgroundcolor: #fff;
          "
          placeholder="~"
          disabled
        />
        <a-input
          v-model="formInline[item.name][1]"
          style="width: 80px; border-left: 0"
          allowClear
        />
      </a-input-group>

      <!-- datepicker 时间选择器 -->
      <a-date-picker
        v-if="item.type == 'datepicker'"
        v-model="formInline[item.name]"
        :valueFormat="item.format ? item.format : 'YYYY-MM-DD'"
      />
      <a-month-picker
        v-if="item.type == 'monthpicker'"
        v-model="formInline[item.name]"
        :valueFormat="item.format ? item.format : 'YYYY-MM'"
      />
      <a-range-picker
        style="width: 200px"
        v-if="item.type == 'rangepicker'"
        v-model="formInline[item.name]"
        :valueFormat="item.format ? item.format : 'YYYY-MM-DD'"
        :ranges="item.ranges ? item.ranges : dateRanges"
        :disabledDate="item.disabledDate"
      />
      <a-week-picker
        v-if="item.type == 'weekpicker'"
        v-model="formInline[item.name]"
      />

      <!-- treeselect -->
      <a-tree-select
        v-if="item.type == 'treeselect'"
        v-model="formInline[item.name]"
        style="width: 200px"
        :tree-data="item.treeData || []"
        tree-checkable
        :placeholder="item.placeholder || '请选择'"
        :maxTagCount="item.maxTagCount || 1"
      />

      <!-- 省市区联动 -->
      <a-cascader
        v-if="item.type == 'areaCascader'"
        :options="areaDictionary"
        :field-names="item.fieldNames"
        :placeholder="item.placeholder"
        change-on-select
        @change="areaOnChange"
        v-model="formInline[item.name]"
      />

      <!-- 普通级联 -->
      <a-cascader
        v-if="item.type == 'cascader'"
        :options="item.options"
        :placeholder="item.placeholder"
        :field-names="item.fieldNames"
        change-on-select
        v-model="formInline[item.name]"
        @change="referOnChange"
      />
    </a-form-model-item>
    <!-- <div> -->
      <a-button
        type="primary"
        html-type="submit"
        :style="{ marginRight: '10px' }"
        >查询</a-button
      >
      <a-button type="primary" @click="reset">重置</a-button>
    <!-- </div> -->
  </a-form-model>
</template>
<script>
// :ranges=""
import moment from "moment";
import { areaDictionary } from "./areaDictionary";
export default {
  props: {
    formList: {
      type: Array,
      default: () => [],
    },
    defaultFormValues: {
      type: Object,
    },
    changeImmediate: {
      type: Boolean,
      default: false,
    },
  },
  watch: {
    defaultFormValues: {
      handler(val, oldVal) {
        // this.formInline = Object.assign({}, this.formInline, val);
      },
      deep: true,
    },
    formInline: {
      handler(val, oldVal) {
        if (this.changeImmediate) {
          this.$emit("prevHandleSubmit", this.formInline); //表单数据变化时
        }
      },
      deep: true,
    },
  },
  data() {
    return {
      formInline: {},
      dateRanges: {
        今日: [moment(), moment()],
        本周: [moment().startOf("week"), moment().endOf("week")],
        本月: [moment().startOf("month"), moment().endOf("month")],
        本季度: [moment().startOf("quarter"), moment().endOf("quarter")],
      },
      areaDictionary,
    };
  },
  created() {
    this.formInline = Object.assign(
      {},
      this.formInline,
      this.defaultFormValues
    );
    this.formList.map((item, index) => {
      if (
        item.type == "inputCompact" &&
        !(this.formInline[item.name] && this.formInline[item.name].length)
      ) {
        this.formInline[item.name] = [undefined, undefined];
      } else if (
        item.type == "datepicker" ||
        item.type == "monthpicker" ||
        item.type == "weekpicker" ||
        (item.type == "compact" && item.compact == "datepicker")
      ) {
        // this.formInline[item.name] = null;
      } else if (item.type == "rangepicker") {
        // this.formInline[item.name] = [null, null];
      }
    });
  },
  methods: {
    reset() {
      console.log(99999)
      // this.$refs.searchForm.resetFields();
      this.formInline={}
    },
    handleSubmit(e) {
      let obj = Object.assign({}, this.formInline);
      this.formList.map((item, index) => {
        if (item.type == "rangepicker") {
          for (let key in obj) {
            if (key == item.name) {
              console.log(key, obj[key]);
              obj[key] = obj[key].join(",");
            }
          }
          // item.name = item.name;
        }
      });
      console.log(obj);
      this.$emit("filterSubmit"); //点击查询按钮时
    },
    areaOnChange(value) {
      console.log(value);
      this.$emit("prevAreaOnChange", value);
    },
    //普通级联
    referOnChange(value) {
      console.log(value);
      this.$emit("prevReferOnChange", value);
    },
  },
};
</script>
<style lang="less" scoped>
.ant-form {
  padding: 10px 15px;
  // border-bottom: 1px solid #e8e8e8;
}
.ant-form-inline .ant-form-item {
  margin-bottom: 10px;
}
.ant-btn{
  margin-top: 3px;
}
</style>
