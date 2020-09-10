<template>
  <div class="page-register">
    <div>
      <!-- <img src="../../assets/images/login-bg.png" /> -->

      <a-form :form="form">
        <a-form-item>
          <a-input
            :maxLength="11"
            addonBefore="手机:"
            v-decorator="['phone', { rules: [{ required: true, message: '输入手机号' },{validator:validateRules.checkPhone}] }]"
          />
        </a-form-item>

        <a-form-item>
          <a-tooltip placement="right">
            <template slot="title">
              <p style="font-size:12px; line-height:16px;">1.长度为6-14个字符，支持数字、大小写字母、标点符号，不允许有空格。</p>
              <p style="font-size:12px; line-height:16px;">2.数字、字母、标点符号至少包含两种。</p>
            </template>
            <a-input
              type="password"
              :maxLength="14"
              addonBefore="密码:"
              v-decorator="['password', { rules: [{ required: true, message: '请输入密码' },{validator:validateRules.checkPassword}] }]"
            />
          </a-tooltip>
        </a-form-item>

        <a-form-item>
          <a-input
            type="password"
            :maxLength="14"
            addonBefore="确认密码："
            v-decorator="['password2', { rules: [{ required: true, message: '请确认密码' },{validator:r}]}]"
          />
        </a-form-item>

        <a-form-item>
          <a-button type="primary" block @click="register" :loading="loading">注册</a-button>
          <p style="text-align:center;">
            <router-link to="/login">已有帐号，立即登录</router-link>
          </p>
        </a-form-item>
      </a-form>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      loading: false,
      form: this.$form.createForm(this, { name: "save" }),
      codeImgUrl: "",
      r: (rule, value, callback) => {
        let password = this.form.getFieldValue("password");
        if (value && password != value) {
          callback("两次密码输入不一致，请重新输入");
        }
        callback();
      }
    };
  },
  created() {},
  methods: {
    register() {
      this.form.validateFields((err, values) => {
        if (!err) {
          this.loading = true;
          this.api
            .register({
              password: values.password,
              phone: values.phone
            })
            .then(res => {
              this.loading = false;
              this.$message.success(res.desc)
              this.$router.push("/login");
            })
            .catch(e => {
              this.loading = false;
            });
        }
      });
    }
  }
};
</script>

<style lang="less" scoped>
.page-register {
  box-sizing: border-box;
  min-height: 100vh;
  padding-top: 40px;
  background: url("../../assets/images/login-bg02.png") no-repeat top center;
  background-size: cover;
  & > div {
    width: 488px;
    background: rgba(255, 255, 255, 1);
    box-shadow: 0px 3px 10px 0px rgba(13, 13, 12, 0.1);
    border-radius: 10px;
    margin: 0 auto;
    padding: 30px 40px 0 40px;
    box-sizing: border-box;

    & > img {
      margin-bottom: 26px;
    }

    .ant-row.ant-form-item {
      margin-bottom: 20px;

      .ant-input-group-addon {
        background-color: transparent;
      }

      .ant-input {
        border-left: none;
        padding-left: 0;
      }

      .ant-input:hover {
        border-color: #d9d9d9;
        border-right-width: 1px !important;
      }

      .ant-input:focus {
        border-color: #d9d9d9;
        box-shadow: none;
      }
    }

    .ant-form-item-has-error.ant-row.ant-form-item {
      .ant-input-group-addon {
        color: rgba(0, 0, 0, 0.65);
        background-color: #fff;
        border-color: #d9d9d9;
      }

      .ant-input,
      .ant-input:focus,
      .ant-input:hover {
        border-color: #d9d9d9;
      }
    }
    .code-img {
      vertical-align: top;
      width: 118px;
      height: 40px;
      margin-left: 15px;
      cursor: pointer;
    }
    .login-forgot {
      line-height: 30px;
      display: flex;

      div {
        flex: 1;
      }
    }
  }
}
</style>