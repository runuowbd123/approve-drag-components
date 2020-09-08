export default [{
    path: '/',
    redirect: '/login'
  }, {
    path: "/login",
    name: "login",
    alias: "",
    component: () => import("@/views/loginManagement/login.vue"),
    meta: {
      isBack: false,
      breadTitle: "",
    },
  },
  {
    path: "/register",
    name: "register",
    component: () => import("@/views/loginManagement/register.vue"),
    meta: {
      isBack: false,
      breadTitle: "",
    },
  },
  {
    path: "/forgot",
    name: "forgot",
    component: () => import("@/views/loginManagement/forgot.vue"),
    meta: {
      isBack: false,
      breadTitle: "",
    },
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
      path: "process",
      name: "process",
      component: () => import("@/views/approve/Process.vue"),
      meta: {
        isBack: false,
        breadTitle: "",
      },
    },{
      path: "websocket",
      name: "websocket",
      component: () => import("@/views/websocket/index.vue"),
      meta: {
        isBack: false,
        breadTitle: "",
      },
    },{
      path: "websockettest1",
      name: "websockettest1",
      component: () => import("@/views/websocket/websockettest1.vue"),
      meta: {
        isBack: false,
        breadTitle: "",
      },
    }, ],
  },
];