export default [{
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
    path: "/authentication",
    name: "authentication",
    component: () => import("@/views/homeManagement/authentication.vue"),
    meta: {
      isBack: false,
      breadTitle: "",
    },
  },
  {
    path: "/auth",
    name: "auth",
    component: () => import("@/views/homeManagement/auth.vue"),
    meta: {
      isBack: false,
      breadTitle: "",
    },
  },
  {
    path: "/",
    // redirect: '/login',
    component: () => import("@/views/layoutManagement/Index"),
    children: [{
      path: "home",
      name: "home",
      component: () => import("@/views/homeManagement/home.vue"),
      meta: {
        isBack: false,
        breadTitle: "",
      },
    }, {
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
    },],
  },
];