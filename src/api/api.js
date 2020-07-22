import { $axios_qfy, $axios_intelligence } from "./index";

let api = {
    // Get 接口
    G0001(params) {
      return $axios_qfy.get("/fwCaptcha", { responseType: "arraybuffer" });
    },
    // 外部
    intelligence: (params, reqUrl) => {
      return $axios_intelligence.post("/outif/a305", params, reqUrl);
    },
  },
  apiUrl = {
    // Post 接口
    login01: "/qfyLogin", // 登录
    login02: "/getLoginInfo", // 登录2

    forgot01: "/acct/getPhone", // 忘记密码--确认账户
    forgot02: "/acct/sendNote", // 忘记密码--发送验证码
    forgot03: "/acct/checkPhone", // 忘记密码--检验验证码
    forgot04: "/acct/updatePwd", // 忘记密码--修改密码

    enum01: "/getEnum", // 码表
    region01: "/region", //省市区
    home01: "/home", // 首页
    home02: "/home/appDetail", // 首页应用详情

    auth01: "/entp/authDo", // 认证
    auth02: "/entp/authInfo", // 认证详情

    getAccountList: "/acct/findAccts", // 根据名字，获取帐号

    appManageList: "/appMng/list", // 应用管理列表
    setAdminAccount: "/appMng/adminDo", // 设置/修改应用管理员
    manageItemDetail: "/appMng/detail", // 应用管理列表详情
    bindAccount: "/appMng/bindOne", // 绑定单个帐号
    batchBindAccount: "/appMng/bindList", // 批量绑定帐号
    appStoreList: "/app/list", // 应用购买列表
    openApp: "/app/openApp", // 开通应用
    freeAppInfo: "/app/openAppTo", // 免费应用详情
    appDetail: "/app/appDetail", //应用详情

    contract01: "/entpOt/list", // 合同列表
    contract02: "/entpOt/confirm", // 合同确认
    contract03: "/entpOt/process", // 合同过程
    contract04: "/contP/list", // 纸质合同列表
    contract05: "/contP/apply", // 申请纸质合同
    contract06: "/contP/detail", // 纸质合同详情

    address01: "/addr/list", // 地址列表
    address02: "/addr/add", // 地址添加
    address03: "/addr/getInfo", // 地址详情
    address04: "/addr/upd", // 地址更新
    address05: "/addr/setDef", // 地址设置默认
    address06: "/addr/del", // 地址删除

    setting01: "/entpSet/info", // 企业信息
    setting02: "/entpSet/sendNote", // 发送手机号码验证码 发送原手机验证码的都调此接口
    setting03: "/entpSet/checkPhone", // 通用，核对手机验证码都调此接口
    setting04: "/entpSet/updPhone", // 修改手机号码
    setting05: "/entpSet/sendEmail", // 发送邮箱验证码
    setting06: "/entpSet/updEmail", // 修改邮箱
    setting07: "/entpSet/updPwd", // 修改密码

    bsApp01: "/bsApp/list", // 基础应用列表
    bsApp02: "/bsApp/getSets", // 获取应用权限设置
    bsApp03: "/bsApp/bAppSet/具体应用id", // 应用权限设置

    //通讯录管理
    deptData: "/dept/data",
    deptSave: "/dept/save",
    deptUpd: "/dept/upd",
    deptOrderBy: "/dept/orderBy",
    deptDel: "/dept/del",
    acctAcctImport: "/acct/acctImport",
    acctList: "/acct/list",
    acctSave: "/acct/save",
    acctUpd: "/acct/upd",
    acctDel: "/acct/del",
    acctReOpenSend: "/acct/reOpenSend",
    acctGetInfo: "/acct/getInfo",
    acctInviteTest: "/acct/inviteTest",
    acctGetPhoneComplete: "/acct/getPhoneComplete",
    acctgetDeptAcct: "/acct/getDeptAcct",
    acctDeptMng: "/acct/deptMng",
    jobData: "/job/data",
    jobInput: "/job/input",
    jobDel: "/job/del",
    acctSetPhoneComplete: "/acct/setPhoneComplete",

    // 资金管理模块
    moneyInfo: "/money/info",
    acctFindAccts: "/acct/findAccts",
    moneyUpdMoneyMng: "/money/updMoneyMng",
    moneyGetBalance: "/money/getBalance",
    moneyRBalance: "/money/rBalance",
    entpOrderAddTx: "/entpOrder/addTx",
    moneyGetApps: "/money/getApps",
    moneyAllotApp: "/money/allotApp",
    moneyTransfer: "/money/transfer",
    moneyReBack: "/money/reBack",
    entpLogEbList: "/entpLog/ebList",
    qfyGetEnum: "/getEnum",
    entpLogDetail: "/entpLog/detail",
    entpLogEpList: "/entpLog/epList",
    entpLogEtList: "/entpLog/etList",
    entpLogEdList: "/entpLog/edList",

    // 子管理员管理
    sAdminGetModouls: "/sAdmin/getModouls",
    sAdminAddAdmin: "/sAdmin/addAdmin",
    sAdminList: "/sAdmin/list",
    sAdminGetAdminInfo: "/sAdmin/getAdminInfo",
    sAdminUpdAdmin: "/sAdmin/updAdmin",
    sAdminDel: "/sAdmin/del",
    

    // 下面的即将废弃
    Q0001: "/qfyLogin",
    Q0002: "/entp/add",
    Q0003: "/entp/sendSms",
    Q0004: "/logout",

    w0001: "/region",
    w0002: "/getEnum",
    w0003: "/getBlance",
    w0004: "/logout",
    w0005: "/login4Acct",
    w0006: "/login4Entp",
    w0007: "/acct/reOpenSend",
    w0008: "/acct/del",
    w0009: "/acct/getInfo",
    w0010: "/acct/list",
    w0011: "/acct/save",
    w0012: "/acct/upd",
    w0013: "/addr/add",
    w0014: "/addr/del",
    w0015: "/addr/getInfo",
    w0016: "/addr/list",
    w0017: "/addr/setDef",
    w0018: "/addr/upd",
    w0019: "/appMng/adminDo",
    w0020: "/appMng/detail",
    w0021: "/appMng/findAccts",
    w0022: "/appMng/getAcct",
    w0023: "/appMng/list",
    w0024: "/dept/data",
    w0025: "/dept/del",
    w0026: "/dept/orderBy",
    w0027: "/dept/save",
    w0028: "/dept/upd",
    w0029: "/entp/add",
    w0030: "/entp/authDo",
    w0031: "/entp/authInfo",
    w0032: "/entp/sendSms",
    w0033: "/entpOt/confirm",
    w0034: "/entpOt/download",
    w0035: "/entpOt/list",
    w0036: "/entpOt/process",
    w0037: "/entpSet/checkPhone",
    w0038: "/entpSet/info",
    w0039: "/entpSet/sendEmail",
    w0040: "/entpSet/sendNote",
    w0041: "/entpSet/updEmail",
    w0042: "/entpSet/updPhone",
    w0043: "/entpSet/updPwd",
    w0044: "/home/acct",
    w0045: "/home/appUrl",
    w0046: "/home/entp",
    w0047: "/home/getBlance",
    w0048: "/home/openApp",
    w0049: "/home/quit",
    w0050: "/home/recharge",
    w0051: "/moneyLog/list",
    w0052: "/moneyLog/recharge",
    w0053: "/moneyPm/getInfo",
    w0054: "/moneyPm/list",
    w0055: "/entpOrder/getAppInfo", // 应用购买--应用详情
    w0056: "/entpOrder/addOrderCache", // 应用购买--下单续费
    w0057: "/entpOrder/getOrderCache", // 应用购买--下单续费--下一步获取缓存订单详情
    w0058: "/entpOrder/addOrder", // 应用购买--下单续费--确认订单
    w0059: "/entpOrder/details", // 应用购买--订单详情
    w0060: "/entpOrder/orderPay", // 应用购买--订单付款
    w0061: "/entpOrder/list", // 应用购买--订单列表-软 qfy/entpOrder/softList
    w0062: "/entpOrder/cancel", // 应用购买--订单取消
    w0063: "/contP/list", // 纸质合同列表
    w0064: "/contP/apply", // 申请纸质合同
    w0065: "/contP/detail", // 纸质合同详情
    w0066: "/entpOrder/appAcctList", // 续费选择帐号列表
  };

for (let [key, value] of Object.entries(apiUrl)) {
  api[key] = (params) => {
    return $axios_qfy.post(value, params);
  };
}

export default api;
