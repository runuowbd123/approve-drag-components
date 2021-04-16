<template>
  <div class="sku">
    <div style="font-weight: bold; margin: 20px 0">sku算法-实现商品多规格</div>
    <a-form-model ref="form" :model="formData">
      <div class="standard-list">
        <div
          v-for="(item, index) in formData.standardsList"
          :key="index"
          class="standard"
        >
          <a-form-model-item
            label="规格名"
            :label-col="{ span: 4 }"
            :wrapper-col="{ span: 18 }"
            :rules="[
              { required: true, message: '请输入规格名' },
              {
                validator: (rule, value, callback) => {
                  validateName(rule, value, callback, item.name, formData.standardsList);
                },
                trigger: 'change',
              },
            ]"
            :prop="'standardsList.' + index + '.name'"
          >
            <a-input
              v-model.trim="item.name"
              placeholder="请输入规格名"
              @blur="standardBlur(item.name)"
            />
          </a-form-model-item>
          <a-row>
            <a-col
              :span="4"
              style="text-align: right; height: 40px; line-height: 40px"
              >规格值：</a-col
            >
            <a-col :span="18" style="display: flex; flex-wrap: wrap">
              <div
                v-for="(child, childIndex) in item.children"
                :key="childIndex"
                style="width: 25%"
              >
                <a-form-model-item
                  label="规格值"
                  :label-col="{ span: 0 }"
                  :wrapper-col="{ span: 20 }"
                  :rules="[{ required: true, message: '请输入规格值' }]"
                  :prop="
                    'standardsList.' +
                    index +
                    '.children.' +
                    childIndex +
                    '.name'
                  "
                >
                  <a-input
                    v-model.trim="child.name"
                    placeholder="请输入规格值"
                    @blur="standardValueBlur(child.name, item.children)"
                  />
                </a-form-model-item>
              </div>
            </a-col>
          </a-row>
          <a-row>
            <a-col :span="4" style="text-align: right"></a-col>
            <a-col :span="18">
              <a-button @click="addStandardChild(item)">添加规格值</a-button>
            </a-col>
          </a-row>
        </div>
        <a-button @click="addStandards">添加规格</a-button>
      </div>
      <div class="goods">
        <a-table
          :columns="columns"
          :dataSource="formData.goodsList"
          :rowKey="(record, index) => index"
          :pagination="false"
          bordered
        >
          <template slot="price" slot-scope="key, item, index">
            <a-form-model-item
              :label-col="{ span: 0 }"
              :wrapper-col="{ span: 20 }"
              :rules="[{ required: true, message: '请输入现价' }]"
              :prop="'goodsList.' + index + '.price'"
            >
              <a-input
                v-model="formData.goodsList[index].price"
                placeholder="请输入现价"
              />
            </a-form-model-item>
          </template>
          <template slot="cost" slot-scope="key, item, index">
            <a-form-model-item
              :label-col="{ span: 0 }"
              :wrapper-col="{ span: 20 }"
              :rules="[{ required: true, message: '请输入成本' }]"
              :prop="'goodsList.' + index + '.cost'"
            >
              <a-input
                v-model="formData.goodsList[index].cost"
                placeholder="请输入成本"
              />
            </a-form-model-item>
          </template>
          <template slot="stock" slot-scope="key, item, index">
            <a-form-model-item
              :label-col="{ span: 0 }"
              :wrapper-col="{ span: 20 }"
              :rules="[{ required: true, message: '请输入库存' }]"
              :prop="'goodsList.' + index + '.stock'"
            >
              <a-input
                v-model="formData.goodsList[index].stock"
                placeholder="请输入库存"
              />
            </a-form-model-item>
          </template>
        </a-table>
      </div>
    </a-form-model>

    <a-button
      type="primary"
      style="position: absolute; right: 20px; top: 20px"
      @click="save"
      >保存</a-button
    >
  </div>
</template>

<script>
export default {
  name: "sku",
  data() {
    return {
      formData: {
        standardsList: [
          {
            name: "",
            children: [{ name: "" }, { name: "" }],
          },
        ], // 规格列表
        goodsList: [{}], // 商品列表
      },
    };
  },
  computed: {
    columns() {
      let frontColumns = [];
      let endColumns = [
        {
          title: "现价",
          dataIndex: "price",
          scopedSlots: { customRender: "price" },
        },
        {
          title: "成本",
          dataIndex: "cost",
          scopedSlots: { customRender: "cost" },
        },
        {
          title: "库存",
          dataIndex: "stock",
          scopedSlots: { customRender: "stock" },
        },
      ];

      const finalColumns = frontColumns.concat(endColumns);
      return finalColumns;
    },
  },
  watch: {
    "formData.standardsList": {
      handler(val, oldVal) {
        console.log("formData.standardsList----------changed", val);
      },
      deep: true,
    },
  },
  created() {},
  methods: {
    // 添加规格
    addStandards() {
      let newStandard = {
        name: "",
        children: [{ name: "" }, { name: "" }],
      };
      if (this.formData.standardsList.length < 4) {
        this.formData.standardsList.push(newStandard);
      } else {
        this.$message.error("最多添加4个规格");
      }
    },
    // 添加规格值
    addStandardChild(obj) {
      console.log(obj);
      let child = { name: "" };
      if (obj.children.length < 4) {
        obj.children.push(child);
      } else {
        this.$message.error("最多添加4个规格值");
      }
    },
    // 规格名失去焦点做检验重复校验
    standardBlur(name) {
      console.log(name);
    },
    //规格值失去焦点检验重复校验
    standardValueBlur(name, list) {
      console.log(name, list);
    },
    save() {
      this.$refs.form.validate((valid) => {
        if (valid) {
          console.log("---------------formData", this.formData);
        }
      });
    },
    validateName(rule, value, callback, name, list) {
      console.log( name, list);
      callback();
    },
  },
};
</script>

<style lang='less' scoped>
.sku {
  background: #fff;
  height: calc(100vh - 80px);
  padding: 10px;
  position: relative;
  overflow: auto;
  .standard-list {
    display: flex;
    flex-wrap: wrap;
    .standard {
      background: #f1f2f5;
      width: 47%;
      padding: 20px;
      margin-bottom: 20px;
      margin-right: 3%;
    }
  }
}
</style>
