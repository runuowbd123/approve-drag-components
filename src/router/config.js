export default [{
  path: '/',
  redirect: '/sku'
},
{
  path: "/",
  component: () => import("@/views/layoutManagement/Index"),
  children: [{
    path: "formdesign",
    name: "formdesign",
    component: () => import("@/views/approve/FormDesign.vue"),
    meta: {
      isBack: false,
      breadTitle: "",
    },
  }, {
    path: "sku",
    name: "sku",
    component: () => import("@/views/sku/index.vue"),
    meta: {
      isBack: false,
      breadTitle: "",
    },
  }, {
    path: "process",
    name: "process",
    component: () => import("@/views/approve/Process.vue"),
    meta: {
      isBack: false,
      breadTitle: "",
    },
  }, {
    path: "websocket",
    name: "websocket",
    component: () => import("@/views/websocket/index.vue"),
    meta: {
      isBack: false,
      breadTitle: "",
    },
  }, {
    path: "websockettest1",
    name: "websockettest1",
    component: () => import("@/views/websocket/websockettest1.vue"),
    meta: {
      isBack: false,
      breadTitle: "",
    },
  }, {
    path: "map",
    name: "map",
    component: () => import("@/views/map/map.vue"),
    meta: {
      isBack: false,
      breadTitle: "",
    },
  }, {
    path: "im",
    name: "im",
    component: () => import("@/views/im/im.vue"),
    meta: {
      isBack: false,
      breadTitle: "",
    },
  }, {
    path: "echarts",
    name: "echarts",
    component: () => import("@/views/echarts/echarts.vue"),
    meta: {
      isBack: false,
      breadTitle: "",
    },
  }],
},
];