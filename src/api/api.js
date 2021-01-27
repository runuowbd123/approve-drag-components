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

    forgot01: "/acct/getPhone", // 忘记密码--确认账户
    forgot02: "/acct/sendNote", // 忘记密码--发送验证码
    forgot03: "/acct/checkPhone", // 忘记密码--检验验证码
    forgot04: "/acct/updatePwd", // 忘记密码--修改密码

    register: '/api/register', // 注册

  };

for (let [key, value] of Object.entries(apiUrl)) {
  api[key] = (params) => {
    return $axios_qfy.post(value, params);
  };
}

export default api;
