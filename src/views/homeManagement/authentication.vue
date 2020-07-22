<template>
  <div class="authentication-page">
    <div class="page-title">企业认证</div>
    <div class="authentication-page-content">
      <a-row>
        <a-col :span="2"></a-col>
        <a-col :span="20">
          <a-steps class="a-step-box" :current="stepNum" labelPlacement="vertical">
            <a-step title="企业信息" />
            <a-step title="企业法人/代办人信息" />
            <a-step title="确定信息" />
          </a-steps>
        </a-col>
        <a-col :span="2"></a-col>
      </a-row>

      <div v-show="stepNum===0">
        <div class="block-title">
          <div class="block-title-txt">企业信息</div>
          <a-divider />
        </div>

        <a-form
          :form="form"
          :label-col="{ span: 6 }"
          :wrapper-col="{ span: 15 }"
          @submit="handleSubmit"
        >
          <a-row>
            <a-col :span="15">
              <a-form-item label="认证方式">
                <a-radio-group
                  v-decorator="['entpType',{ rules: [{ required: true, message: '请选择认证方式' }] }]"
                >
                  <a-radio
                    v-for="item in entpTypeList"
                    :key="item.code"
                    :value="item.code"
                  >{{item.desc}}</a-radio>
                </a-radio-group>
              </a-form-item>
              <a-form-item label="证件类型">
                <a-radio-group
                  @change="certTypeChange"
                  v-decorator="['certType',{ rules: [{ required: true, message: '请选择证件类型' }] }]"
                >
                  <a-radio
                    v-for="item in certTypeList"
                    :key="item.code"
                    :value="item.code"
                  >{{item.desc}}</a-radio>
                </a-radio-group>
              </a-form-item>
              <a-form-item label="企业名称">
                <a-input
                  :maxLength="128"
                  :disabled="!entpNameAbledEdit"
                  v-decorator="['entpName',{ rules: [{ required: true, message: '请输入企业名称' },{ validator: validateRules.checkCompanyName }] }]"
                />
              </a-form-item>
              <a-form-item label="统一社会信用代码" v-if="certType==='1'">
                <a-input
                  :maxLength="30"
                  v-decorator="['certNo',{ rules: [{ required: true, message: '请输入统一社会信用代码' },{ validator: validateRules.checkIosCode }] }]"
                />
              </a-form-item>
              <a-form-item label="注册码" v-else-if="certType==='2'">
                <a-input
                  :maxLength="30"
                  v-decorator="['certNo',{ rules: [{ required: true, message: '请输入注册码' },{ validator: validateRules.checkIosCode }] }]"
                />
              </a-form-item>
              <a-form-item label="注册地址">
                <a-cascader
                  @change="addressChange"
                  placeholder=" "
                  :options="residences"
                  :loadData="regionLoadData"
                  v-decorator="['region',{ rules: [{ type: 'array', required: true, message: '请选择地址' },{ validator: validateRules.checkAddress }] }]"
                />
              </a-form-item>
              <a-form-item label="详细地址">
                <a-input
                  :maxLength="100"
                  v-decorator="['address',{ rules: [{ required: true, message: '请输入详细地址' }] }]"
                />
              </a-form-item>
              <a-form-item label="营业执照" extra="照片支持.jpg .jpeg .bmp .gif .png格式，大小不超过5M">
                <a-upload
                  :fileList="auth01"
                  :showUploadList="{ showRemoveIcon: false }"
                  listType="picture-card"
                  @preview="handlePreview"
                ></a-upload>
                <span @click="type='license'">
                  <a-upload
                    :fileList="up.license"
                    listType="picture-card"
                    @preview="handlePreview"
                    action="/fileUpload"
                    :data="{ isShowSmall: 'Y' }"
                    :beforeUpload="beforeUpload"
                    @change="handleChange"
                    v-decorator="['license',{ rules: [{ required: true, message: '请上传营业执照' }] }]"
                  >
                    <div v-if="up.license && up.license.length === 0">
                      <a-icon type="plus" />
                      <div>上传</div>
                    </div>
                  </a-upload>
                </span>
              </a-form-item>
            </a-col>
          </a-row>
          <a-form-item :colon="false" label=" " style="text-align:right;">
            <a-button :disabled="imgLoading" type="primary" htmlType="submit">保存并下一步</a-button>
          </a-form-item>
        </a-form>
      </div>

      <div v-show="stepNum===1">
        <a-form
          :form="form2"
          :label-col="{ span: 6 }"
          :wrapper-col="{ span: 15 }"
          @submit="handleSubmit2"
        >
          <a-row>
            <a-col :span="15">
              <a-form-item label="实际操作人">
                <a-radio-group
                  @change="opermanChange"
                  v-decorator="['operman',{ initialValue:1,rules: [{ required: true, message: '请选择实际操作人' }] }]"
                >
                  <a-radio :value="1">法人</a-radio>
                  <a-radio :value="2">
                    代办人
                    <a-tooltip placement="right" title="当实际操作人不为法人时，即为代办人。代办人需法人授权，提供授权书。">
                      <a-icon type="question-circle" />
                    </a-tooltip>
                  </a-radio>
                </a-radio-group>
              </a-form-item>
            </a-col>
          </a-row>
          <div class="block-title">
            <div class="block-title-txt">法人信息</div>
            <a-divider />
          </div>
          <a-row>
            <a-col :span="15">
              <a-form-item label="证件类型">大陆身份证</a-form-item>
              <a-form-item label="法人姓名">
                <a-input
                  :maxLength="10"
                  v-decorator="['legalCardName',{ rules: [{ required: true, message: '请输入姓名' }] }]"
                />
              </a-form-item>
              <a-form-item label="证件号码">
                <a-input
                  :maxLength="20"
                  v-decorator="['legalCardNo',{ rules: [{ required: true, message: '请输入证件号码' },{ validator: validateRules.checkCardId }] }]"
                />
              </a-form-item>
              <a-form-item
                class="card-img"
                label="证件照正面"
                extra="照片支持.jpg .jpeg .bmp .gif .png格式，大小不超过5M"
              >
                <a-upload
                  :fileList="auth02"
                  :showUploadList="{ showRemoveIcon: false }"
                  listType="picture-card"
                  @preview="handlePreview"
                ></a-upload>
                <span @click="type='legalCardImgFront'">
                  <a-upload
                    :fileList="up.legalCardImgFront"
                    listType="picture-card"
                    @preview="handlePreview"
                    action="/fileUpload"
                    :data="{ isShowSmall: 'Y' }"
                    :beforeUpload="beforeUpload"
                    @change="handleChange"
                    v-decorator="['legalCardImgFront',{ rules: [{ required: true, message: '请上传证件照正面' }] }]"
                  >
                    <div v-if="up.legalCardImgFront && up.legalCardImgFront.length === 0">
                      <a-icon type="plus" />
                      <div>上传</div>
                    </div>
                  </a-upload>
                </span>
              </a-form-item>
              <a-form-item
                class="card-img"
                label="证件照背面"
                extra="照片支持.jpg .jpeg .bmp .gif .png格式，大小不超过5M"
              >
                <a-upload
                  :fileList="auth03"
                  :showUploadList="{ showRemoveIcon: false }"
                  listType="picture-card"
                  @preview="handlePreview"
                ></a-upload>
                <span @click="type='legalCardImgBack'">
                  <a-upload
                    :fileList="up.legalCardImgBack"
                    listType="picture-card"
                    @preview="handlePreview"
                    action="/fileUpload"
                    :data="{ isShowSmall: 'Y' }"
                    :beforeUpload="beforeUpload"
                    @change="handleChange"
                    v-decorator="['legalCardImgBack',{ rules: [{ required: true, message: '请上传证件照背面' }] }]"
                  >
                    <div v-if="up.legalCardImgBack && up.legalCardImgBack.length === 0">
                      <a-icon type="plus" />
                      <div>上传</div>
                    </div>
                  </a-upload>
                </span>
              </a-form-item>
            </a-col>
          </a-row>
          <div v-if="operman===2">
            <div class="block-title">
              <div class="block-title-txt">代办人信息</div>
              <a-divider />
            </div>
            <a-row>
              <a-col :span="15">
                <a-form-item label="证件类型">大陆身份证</a-form-item>
                <a-form-item label="代办人姓名">
                  <a-input
                    :maxLength="10"
                    v-decorator="['agencyCardName',{ rules: [{ required: true, message: '请输入姓名' }] }]"
                  />
                </a-form-item>
                <a-form-item label="证件号码">
                  <a-input
                    :maxLength="20"
                    v-decorator="['agencyCardNo',{ rules: [{ required: true, message: '请输入证件号码' },{ validator: validateRules.checkCardId }] }]"
                  />
                </a-form-item>
                <a-form-item
                  class="card-img"
                  label="证件照正面"
                  extra="照片支持.jpg .jpeg .bmp .gif .png格式，大小不超过5M"
                >
                  <a-upload
                    :fileList="auth02"
                    :showUploadList="{ showRemoveIcon: false }"
                    listType="picture-card"
                    @preview="handlePreview"
                  ></a-upload>
                  <span @click="type='agencyCardImgFront'">
                    <a-upload
                      :fileList="up.agencyCardImgFront"
                      listType="picture-card"
                      @preview="handlePreview"
                      action="/fileUpload"
                      :data="{ isShowSmall: 'Y' }"
                      :beforeUpload="beforeUpload"
                      @change="handleChange"
                      v-decorator="['agencyCardImgFront',{ rules: [{ required: true, message: '请上传证件照正面' }] }]"
                    >
                      <div v-if="up.agencyCardImgFront && up.agencyCardImgFront.length === 0">
                        <a-icon type="plus" />
                        <div>上传</div>
                      </div>
                    </a-upload>
                  </span>
                </a-form-item>
                <a-form-item
                  class="card-img"
                  label="证件照背面"
                  extra="照片支持.jpg .jpeg .bmp .gif .png格式，大小不超过5M"
                >
                  <a-upload
                    :fileList="auth03"
                    :showUploadList="{ showRemoveIcon: false }"
                    listType="picture-card"
                    @preview="handlePreview"
                  ></a-upload>
                  <span @click="type='agencyCardImgBack'">
                    <a-upload
                      :fileList="up.agencyCardImgBack"
                      listType="picture-card"
                      @preview="handlePreview"
                      action="/fileUpload"
                      :data="{ isShowSmall: 'Y' }"
                      :beforeUpload="beforeUpload"
                      @change="handleChange"
                      v-decorator="['agencyCardImgBack',{ rules: [{ required: true, message: '请上传证件照背面' }] }]"
                    >
                      <div v-if="up.agencyCardImgBack && up.agencyCardImgBack.length === 0">
                        <a-icon type="plus" />
                        <div>上传</div>
                      </div>
                    </a-upload>
                  </span>
                </a-form-item>
                <a-form-item
                  class="card-img"
                  label="代办人授权书"
                  extra="照片支持.jpg .jpeg .bmp .gif .png格式，大小不超过5M"
                >
                  <a-upload
                    :fileList="auth04"
                    :showUploadList="{ showRemoveIcon: false }"
                    listType="picture-card"
                    @preview="handlePreview"
                  ></a-upload>
                  <span @click="type='agencyAuth'">
                    <a-upload
                      :fileList="up.agencyAuth"
                      listType="picture-card"
                      @preview="handlePreview"
                      action="/fileUpload"
                      :data="{ isShowSmall: 'Y' }"
                      :beforeUpload="beforeUpload"
                      @change="handleChange"
                      v-decorator="['agencyAuth',{ rules: [{ required: true, message: '请上传代办人授权书' }] }]"
                    >
                      <div v-if="up.agencyAuth && up.agencyAuth.length === 0">
                        <a-icon type="plus" />
                        <div>上传</div>
                      </div>
                    </a-upload>
                  </span>
                  <a-button style="vertical-align: bottom;" type="link">
                    <a href="/entp/download">下载模板</a>
                  </a-button>
                </a-form-item>
              </a-col>
            </a-row>
          </div>
          <a-form-item :colon="false" label=" " style="text-align:right;">
            <a-button :disabled="imgLoading" @click="stepNum=0" style="margin-right:10px;">返回上一步</a-button>
            <a-button :disabled="imgLoading" type="primary" htmlType="submit">保存并下一步</a-button>
          </a-form-item>
        </a-form>
      </div>

      <div v-show="stepNum===2">
        <a-form
          :form="form3"
          :label-col="{ span: 6 }"
          :wrapper-col="{ span: 15 }"
          @submit="handleSubmit3"
        >
          <div class="block-title">
            <div class="block-title-txt">企业信息</div>
            <a-divider />
          </div>
          <a-row>
            <a-col :span="15">
              <a-form-item label="认证方式">
                <span
                  v-for="item in entpTypeList"
                  :key="item.code"
                >{{item.code==basicInfo.entpType?item.desc:''}}</span>
              </a-form-item>
              <a-form-item label="证件类型">
                <span
                  v-for="item in certTypeList"
                  :key="item.code"
                >{{item.code==basicInfo.certType?item.desc:''}}</span>
              </a-form-item>
              <a-form-item label="企业名称">{{basicInfo.entpName}}</a-form-item>
              <a-form-item
                :label="basicInfo.certType=== '1'? '统一社会信用代码' : '注册码'"
              >{{basicInfo.certNo}}</a-form-item>

              <a-form-item label="注册地址">{{addressArr.join("")}}{{basicInfo.address}}</a-form-item>
              <a-form-item label="营业执照">
                <a-upload
                  :fileList="up.license"
                  :showUploadList="{ showRemoveIcon: false }"
                  listType="picture-card"
                  @preview="handlePreview"
                ></a-upload>
              </a-form-item>
            </a-col>
          </a-row>
          <div class="block-title">
            <div class="block-title-txt">法人信息</div>
            <a-divider />
          </div>
          <a-row>
            <a-col :span="15">
              <a-form-item label="证件类型">大陆身份证</a-form-item>
              <a-form-item label="法人姓名">{{extendInfo.legalCardName}}</a-form-item>
              <a-form-item label="证件号码">{{extendInfo.legalCardNo}}</a-form-item>
              <a-form-item class="card-img" label="证件照正面">
                <a-upload
                  :fileList="up.legalCardImgFront"
                  :showUploadList="{ showRemoveIcon: false }"
                  listType="picture-card"
                  @preview="handlePreview"
                ></a-upload>
              </a-form-item>
              <a-form-item class="card-img" label="证件照背面">
                <a-upload
                  :fileList="up.legalCardImgBack"
                  :showUploadList="{ showRemoveIcon: false }"
                  listType="picture-card"
                  @preview="handlePreview"
                ></a-upload>
              </a-form-item>
            </a-col>
          </a-row>
          <div v-if="operman===2">
            <div class="block-title">
              <div class="block-title-txt">代办人信息</div>
              <a-divider />
            </div>
            <a-row>
              <a-col :span="15">
                <a-form-item label="证件类型">大陆身份证</a-form-item>
                <a-form-item label="代办人姓名">{{extendInfo.agencyCardName}}</a-form-item>
                <a-form-item label="证件号码">{{extendInfo.agencyCardNo}}</a-form-item>
                <a-form-item class="card-img" label="证件照正面">
                  <a-upload
                    :fileList="up.agencyCardImgFront"
                    :showUploadList="{ showRemoveIcon: false }"
                    listType="picture-card"
                    @preview="handlePreview"
                  ></a-upload>
                </a-form-item>
                <a-form-item class="card-img" label="证件照背面">
                  <a-upload
                    :fileList="up.agencyCardImgBack"
                    :showUploadList="{ showRemoveIcon: false }"
                    listType="picture-card"
                    @preview="handlePreview"
                  ></a-upload>
                </a-form-item>
                <a-form-item class="card-img" label="代办人授权书">
                  <a-upload
                    :fileList="up.agencyAuth"
                    :showUploadList="{ showRemoveIcon: false }"
                    listType="picture-card"
                    @preview="handlePreview"
                  ></a-upload>
                </a-form-item>
              </a-col>
            </a-row>
          </div>
          <a-form-item :colon="false" label=" " style="text-align:right;">
            <a-button :disabled="imgLoading" @click="stepNum=1" style="margin-right:10px;">返回上一步</a-button>
            <a-button :disabled="imgLoading" type="primary" htmlType="submit">保存并下一步</a-button>
          </a-form-item>
        </a-form>
      </div>
    </div>
    <a-modal :visible="previewVisible" :footer="null" @cancel="handleCancel">
      <img alt="example" style="width: 100%" :src="previewImage" />
    </a-modal>
  </div>
</template>

<script>
import { addressBack } from "@/utils/addressBack";
import auth01 from "@/assets/imgs/auth01.png";
import auth02 from "@/assets/imgs/auth02.jpg";
import auth03 from "@/assets/imgs/auth03.jpg";
import auth04 from "@/assets/imgs/auth04.jpg";
export default {
  data() {
    return {
      previewVisible: false,
      previewImage: '',
      auth01: [{ uid: "-1", url: auth01, name: "xxx.png", status: "done" }],
      auth02: [{ uid: "-1", url: auth02, name: "xxx.png", status: "done" }],
      auth03: [{ uid: "-1", url: auth03, name: "xxx.png", status: "done" }],
      auth04: [{ uid: "-1", url: auth04, name: "xxx.png", status: "done" }],
      up: {
        license: [],
        legalCardImgFront: [],
        legalCardImgBack: [],
        agencyCardImgFront: [],
        agencyCardImgBack: [],
        agencyAuth: []
      },
      type: "",
      imgLoading: false,
      stepNum: 0,
      form: this.$form.createForm(this, { name: "save" }),
      certType: "",
      entpTypeList: [],
      certTypeList: [],
      entpNameAbledEdit: true,
      residences: [],
      addressArr: [],
      form2: this.$form.createForm(this, { name: "save2" }),
      operman: 1,
      form3: this.$form.createForm(this, { name: "save3" }),
      basicInfo: {},
      extendInfo: {}
    };
  },
  created() {
    this.getEnum();
    let step = this.$route.query.step;
    if (step) {
      this.stepNum = parseInt(step) - 1;
      this.getAuthentication();
    } else {
      this.initRegion();
    }
  },
  mounted() {
    let entpName = this.$route.query.entpName;
    let step = this.$route.query.step;
    if (entpName && !step) {
      this.form.setFieldsValue({ entpName });
      this.entpNameAbledEdit = false;
    }
  },
  methods: {
    handleCancel() {
      this.previewVisible = false;
    },
    handlePreview(file) {
      this.previewImage = file.url || file.preview;
      this.previewVisible = true;
    },
    getEnum() {
      this.api.enum01({ types: ["certType", "entpType"] }).then(res => {
        this.entpTypeList = res.data.entpType;
        this.certTypeList = res.data.certType;
      });
    },
    addressChange(value, valueTxt) {
      this.addressArr = [
        valueTxt[0].label,
        valueTxt[1].label,
        valueTxt[2].label
      ];
    },
    regionLoadData(selectedOptions) {
      const targetOption = selectedOptions[selectedOptions.length - 1];
      targetOption.loading = true;
      this.api.region01({ regionId: targetOption.value }).then(res => {
        let arr = [];
        for (let [key, value] of Object.entries(res.data)) {
          let obj = {
            value: key,
            label: value,
            isLeaf: false,
            level: targetOption.level + 1
          };
          if (targetOption.level === 2) {
            delete obj.isLeaf;
          }
          arr.push(obj);
        }
        targetOption.children = arr;
        targetOption.loading = false;
        this.residences = JSON.parse(JSON.stringify(this.residences));
      });
    },
    initRegion() {
      this.api.region01({ regionId: "" }).then(res => {
        let arr = [];
        for (let [key, value] of Object.entries(res.data)) {
          arr.push({
            value: key,
            label: value,
            isLeaf: false,
            level: 1
          });
        }
        this.residences = arr;
      });
    },
    beforeUpload(file) {
      if (this.imgLoading) {
        return false;
      }
      this.imgLoading = true;
      let arr = [
        "image/jpeg",
        "image/jpg",
        "image/gif",
        "image/png",
        "image/bmp"
      ];
      if (arr.indexOf(file.type) === -1) {
        message.error("照片支持.jpg .jpeg .bmp .gif .png格式");
        setLoadingImg(false);
        return false;
      }
      if (file.size / 1024 / 1024 > 5) {
        message.error("图片大小不超过5M");
        setLoadingImg(false);
        return false;
      }
      return true;
    },
    handleChange({ file, fileList }) {
      let up = { ...this.up };
      up[this.type] = fileList;
      this.up = up;
      if (file.status === "uploading") {
      } else if (file.status === "error") {
        this.imgLoading = false;
      } else if (file.status === "done") {
        this.imgLoading = false;
        file.fileId = file.response.data.fileId;
        file.url = file.response.data.fileSmUrl;
        file.thumbUrl = file.response.data.fileSmUrl;
        up[this.type] = [file];
        let timer = setTimeout(() => {
          let values = {};
          values[this.type] = file.response.data.fileId;
          if (this.type === "license") {
            this.form.setFieldsValue(values);
          } else {
            this.form2.setFieldsValue(values);
          }
          timer && clearTimeout(timer);
        }, 100);
      } else {
        up[this.type] = [];
        this.up = up;
        let timer = setTimeout(() => {
          let values = {};
          values[this.type] = "";
          if (this.type === "license") {
            this.form.setFieldsValue(values);
          } else {
            this.form2.setFieldsValue(values);
          }
          timer && clearTimeout(timer);
        }, 100);
      }
    },
    certTypeChange(e) {
      this.certType = e.target.value;
    },
    opermanChange(e) {
      this.operman = e.target.value;
    },
    handleSubmit(e) {
      e.preventDefault();
      this.form.validateFields((err, values) => {
        if (!err) {
          console.log("Received values of form: ", values);
          this.basicInfo = values;
          this.stepNum = 1;
        }
      });
    },
    handleSubmit2(e) {
      e.preventDefault();
      this.form2.validateFields((err, values) => {
        if (!err) {
          console.log("Received values of form: ", values);
          this.extendInfo = values;
          this.stepNum = 2;
        }
      });
    },

    handleSubmit3(e) {
      e.preventDefault();
      let basicInfo = this.basicInfo;
      let extendInfo = this.extendInfo;
      let data = {
        entpName: basicInfo.entpName,
        entpType: basicInfo.entpType,
        certType: basicInfo.certType,
        certNo: basicInfo.certNo,
        license: basicInfo.license,
        regionProvince: basicInfo.region[0],
        regionCity: basicInfo.region[1],
        regionDistrict: basicInfo.region[2],
        address: basicInfo.address,
        legalCardName: extendInfo.legalCardName,
        legalCardNo: extendInfo.legalCardNo,
        legalCardImgFront: extendInfo.legalCardImgFront,
        legalCardImgBack: extendInfo.legalCardImgBack
      };
      if (extendInfo.operman === 2) {
        data.agencyCardName = extendInfo.agencyCardName;
        data.agencyCardNo = extendInfo.agencyCardNo;
        data.agencyCardImgFront = extendInfo.agencyCardImgFront;
        data.agencyCardImgBack = extendInfo.agencyCardImgBack;
        data.agencyAuth = extendInfo.agencyAuth;
      }
      this.api.auth01(data).then(res => {
        this.$message.success(res.desc);
        this.$router.push("/home");
      });
    },

    getAuthentication() {
      this.api.auth02().then(res => {
        this.entpNameAbledEdit = res.data.updateName;
        this.certType = res.data.certType;
        if (res.data.agencyCardName) {
          this.operman = 2;
        }
        let license = res.data.license;
        let legalCardImgFront = res.data.legalCardImgFront;
        let legalCardImgBack = res.data.legalCardImgBack;
        let agencyCardImgFront = res.data.agencyCardImgFront;
        let agencyCardImgBack = res.data.agencyCardImgBack;
        let agencyAuth = res.data.agencyAuth;
        this.up = {
          license: [
            {
              uid: "-1",
              name: "xx.png",
              status: "done",
              url: license[1],
              thumbUrl: license[0]
            }
          ],
          legalCardImgFront: [
            {
              uid: "-1",
              name: "xx.png",
              status: "done",
              url: legalCardImgFront[1],
              thumbUrl: legalCardImgFront[0]
            }
          ],
          legalCardImgBack: [
            {
              uid: "-1",
              name: "xx.png",
              status: "done",
              url: legalCardImgBack[1],
              thumbUrl: legalCardImgBack[0]
            }
          ],
          agencyCardImgFront:
            this.operman === 2
              ? [
                  {
                    uid: "-1",
                    name: "xx.png",
                    status: "done",
                    url: agencyCardImgFront[1],
                    thumbUrl: agencyCardImgFront[0]
                  }
                ]
              : [],
          agencyCardImgBack:
            this.operman === 2
              ? [
                  {
                    uid: "-1",
                    name: "xx.png",
                    status: "done",
                    url: agencyCardImgBack[1],
                    thumbUrl: agencyCardImgBack[0]
                  }
                ]
              : [],
          agencyAuth:
            this.operman === 2
              ? [
                  {
                    uid: "-1",
                    name: "xx.png",
                    status: "done",
                    url: agencyAuth[1],
                    thumbUrl: agencyAuth[0]
                  }
                ]
              : []
        };
        this.addressArr = [
          res.data.regionProvinceName,
          res.data.regionCityName,
          res.data.regionDistrictName
        ];
        addressBack([
          res.data.regionProvince,
          res.data.regionCity,
          res.data.regionDistrict
        ]).then(res => {
          this.residences = res;
        });

        this.basicInfo = {
          region: [
            res.data.regionProvince,
            res.data.regionCity,
            res.data.regionDistrict
          ],
          entpName: res.data.entpName,
          address: res.data.address,
          entpType: res.data.entpType,
          certType: res.data.certType,
          certNo: res.data.certNo,
          license: license[2]
        };
        this.extendInfo = {
          operman: this.operman,
          legalCardName: res.data.legalCardName,
          legalCardNo: res.data.legalCardNo,
          legalCardImgFront: legalCardImgFront[2],
          legalCardImgBack: legalCardImgBack[2],
          agencyCardName: this.operman === 2 ? res.data.agencyCardName : "",
          agencyCardNo: this.operman === 2 ? res.data.agencyCardNo : "",
          agencyCardImgFront: this.operman === 2 ? agencyCardImgFront[2] : "",
          agencyCardImgBack: this.operman === 2 ? agencyCardImgBack[2] : "",
          agencyAuth: this.operman === 2 ? agencyAuth[2] : ""
        };
        setTimeout(() => {
          this.form.setFieldsValue(this.basicInfo);
          this.form2.setFieldsValue(this.extendInfo);
        }, 100);
      });
    }
  }
};
</script>
<style lang="less" scoped>
.authentication-page {
  padding: 10px;
  background: rgba(241, 242, 245, 1);
  .page-title {
    font-size: 14px;
    font-family: Microsoft YaHei;
    font-weight: 400;
    color: rgba(77, 77, 77, 1);
    line-height: 38px;
  }
  .authentication-page-content {
    background-color: #fff;
    padding-bottom: 40px;
    .block-title {
      .block-title-txt {
        padding: 0 10px;
      }

      .ant-divider.ant-divider-horizontal {
        margin-top: 5px;
      }
    }
    .ant-upload-picture-card-wrapper {
      width: auto;
      margin-right: 10px;
    }
  }
}
</style>
<style lang="less">
.authentication-page {
  .authentication-page-content {
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