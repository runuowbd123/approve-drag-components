<template>
  <div class="auth-page">
    <div class="page-title">企业认证</div>
    <div class="auth-page-content">
      <div class="tips">
        <a-icon type="close-circle" theme="filled" style="color:#F55353;" />
        您的认证申请未通过，未通过原因：{{info.authDesc}}
      </div>

      <div class="block-title">
        <div class="block-title-txt">
          企业信息
          <a-button class="fr-btn" icon="edit" type="link">
            <router-link to="/authentication?type=1&step=1">修改</router-link>
          </a-button>
        </div>
        <a-divider />
      </div>
      <a-form :label-col="{ span: 6 }" :wrapper-col="{ span: 15 }">
        <a-form-item label="认证方式">{{info.entpType=='1'?'企业':'商户'}}</a-form-item>
        <a-form-item label="证件类型">{{info.certType=='1'?'多证合一营业执照':'普通营业执照'}}</a-form-item>
        <a-form-item label="企业名称">{{info.entpName}}</a-form-item>
        <a-form-item :label="info.certType=='1'?'统一社会信用代码':'注册码'">{{info.certNo}}</a-form-item>
        <a-form-item
          label="注册地址"
        >{{info.regionProvinceName}}{{info.regionCityName}}{{info.regionDistrictName}}{{info.address}}</a-form-item>
        <a-form-item label="营业执照">
          <a-upload
            :fileList="license"
            :showUploadList="{ showRemoveIcon: false }"
            listType="picture-card"
            @preview="handlePreview"
          ></a-upload>
        </a-form-item>
      </a-form>

      <div class="block-title">
        <div class="block-title-txt">
          法人信息
          <a-button class="fr-btn" icon="edit" type="link">
            <router-link to="/authentication?type=1&step=2">修改</router-link>
          </a-button>
        </div>
        <a-divider />
      </div>
      <a-form :label-col="{ span: 6 }" :wrapper-col="{ span: 15 }">
        <a-form-item label="证件类型">大陆身份证</a-form-item>
        <a-form-item label="法人姓名">{{info.legalCardName}}</a-form-item>
        <a-form-item label="证件号码">{{info.legalCardNo}}</a-form-item>
        <a-form-item label="证件照正面">
          <a-upload
            :fileList="legalPicture"
            :showUploadList="{ showRemoveIcon: false }"
            listType="picture-card"
            @preview="handlePreview"
          ></a-upload>
        </a-form-item>
        <a-form-item label="证件照背面">
          <a-upload
            :fileList="legalSidePicture"
            :showUploadList="{ showRemoveIcon: false }"
            listType="picture-card"
            @preview="handlePreview"
          ></a-upload>
        </a-form-item>
      </a-form>

      <div class="block-title" v-if="info.agencyCardNo">
        <div class="block-title-txt">
          代办人信息
          <a-button class="fr-btn" icon="edit" type="link">
            <router-link to="/authentication?type=1&step=2">修改</router-link>
          </a-button>
        </div>
        <a-divider />
      </div>
      <a-form :label-col="{ span: 6 }" :wrapper-col="{ span: 15 }" v-if="info.agencyCardNo">
        <a-form-item label="证件类型">大陆身份证</a-form-item>
        <a-form-item label="法人姓名">{{info.agencyCardName}}</a-form-item>
        <a-form-item label="证件号码">{{info.agencyCardNo}}</a-form-item>
        <a-form-item class="card-img" label="证件照正面">
          <a-upload
            :fileList="agencyPicture"
            :showUploadList="{ showRemoveIcon: false }"
            listType="picture-card"
            @preview="handlePreview"
          ></a-upload>
        </a-form-item>
        <a-form-item class="card-img" label="证件照背面">
          <a-upload
            :fileList="agencySidePicture"
            :showUploadList="{ showRemoveIcon: false }"
            listType="picture-card"
            @preview="handlePreview"
          ></a-upload>
        </a-form-item>
        <a-form-item class="card-img" label="授权书">
          <a-upload
            :fileList="authPicture"
            :showUploadList="{ showRemoveIcon: false }"
            listType="picture-card"
            @preview="handlePreview"
          ></a-upload>
        </a-form-item>
      </a-form>
    </div>
    <a-modal :visible="previewVisible" :footer="null" @cancel="handleCancel">
      <img alt="example" style="width: 100%" :src="previewImage" />
    </a-modal>
  </div>
</template>

<script>
export default {
  data() {
    return {
      previewVisible: false,
      previewImage: '',
      license: [],
      legalPicture: [],
      legalSidePicture: [],
      agencyPicture: [],
      agencySidePicture: [],
      authPicture: [],
      info: {}
    };
  },
  created() {
    this.getInfo();
  },
  methods: {
    handleCancel() {
      this.previewVisible = false;
    },
    handlePreview(file) {
      this.previewImage = file.url || file.preview;
      this.previewVisible = true;
    },
    getInfo() {
      this.api.auth02().then(res => {
        this.info = res.data;
        this.license = [
          {
            uid: "-1",
            name: "image.png",
            status: "done",
            url: res.data.license[1],
            thumbUrl: res.data.license[0]
          }
        ];
        this.legalPicture = [
          {
            uid: "-1",
            name: "image.png",
            status: "done",
            url: res.data.legalCardImgFront[1],
            thumbUrl: res.data.legalCardImgFront[0]
          }
        ];
        this.legalSidePicture = [
          {
            uid: "-1",
            name: "image.png",
            status: "done",
            url: res.data.legalCardImgBack[1],
            thumbUrl: res.data.legalCardImgBack[0]
          }
        ];
        this.agencyPicture = [
          {
            uid: "-1",
            name: "image.png",
            status: "done",
            url: res.data.agencyCardImgFront && !!res.data.agencyCardImgFront.length?res.data.agencyCardImgFront[1]:"",
            thumbUrl: res.data.agencyCardImgFront && !!res.data.agencyCardImgFront.length?res.data.agencyCardImgFront[0]:"",
          }
        ];
        this.agencySidePicture = [
          {
            uid: "-1",
            name: "image.png",
            status: "done",
            url: res.data.agencyCardImgBack && !!res.data.agencyCardImgBack.length?res.data.agencyCardImgBack[1]:"",
            thumbUrl: res.data.agencyCardImgBack && !!res.data.agencyCardImgBack.length?res.data.agencyCardImgBack[0]:""
          }
        ];
        this.authPicture = [
          {
            uid: "-1",
            name: "image.png",
            status: "done",
            url: res.data.agencyAuth && !!res.data.agencyAuth.length?res.data.agencyAuth[1]:"",
            thumbUrl: res.data.agencyAuth && !!res.data.agencyAuth.length?res.data.agencyAuth[0]:""
          }
        ];
      });
    }
  }
};
</script>

<style lang="less" scoped>
.auth-page {
  padding: 10px;
  background: rgba(241, 242, 245, 1);
  .page-title {
    font-size: 14px;
    font-family: Microsoft YaHei;
    font-weight: 400;
    color: rgba(77, 77, 77, 1);
    line-height: 38px;
  }
  .auth-page-content {
    background-color: #fff;
    padding-bottom: 40px;
    .tips {
      margin-bottom: 20px;
      height: 40px;
      line-height: 40px;
      padding: 0 20px;
      background: rgba(255, 241, 240, 1);
      border: 1px solid rgba(254, 175, 170, 1);
    }
    .block-title {
      .block-title-txt {
        padding: 0 10px;
        .fr-btn {
          float: right;
          padding: 0px 3px;
        }
      }
      .ant-divider.ant-divider-horizontal {
        margin-top: 5px;
      }
    }
    .ant-upload-picture-card-wrapper {
      width: auto;
    }
  }
}
</style>
<style lang="less">
.auth-page {
  .auth-page-content {
    .ant-col.ant-col-6.ant-form-item-label {
      padding-right: 20px;
    }
    .card-img {
      .ant-upload-list-picture-card,
      .ant-upload-select-picture-card,
      .ant-upload-list-picture-card-container .ant-upload-list-item {
        width: 180px;
      }
    }
  }
}
</style>