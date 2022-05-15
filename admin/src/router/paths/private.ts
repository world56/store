import { lazy } from "react";

import type { TypeRoute } from "@/interface/route";

const Middleware = lazy(() => import("../component/Middleware"));

export default [
  {
    name: "system",
    path: "/system",
    title: "系统管理",
    component: Middleware,
    routes: [
      {
        name: "department",
        title: "部门列表",
        path: "/system/department",
        component: lazy(() => import("@/page/system/department")),
      },
      {
        name: "user",
        title: "用户列表",
        path: "/system/user",
        component: lazy(() => import("@/page/system/user")),
      },
      {
        name: "role",
        title: "角色列表",
        path: "/system/role",
        component: lazy(() => import("@/page/system/role")),
      },
      {
        name: "permission",
        title: "权限列表",
        path: "/system/permission",
        component: lazy(() => import("@/page/system/permission")),
      },
    ],
  },
  {
    name: "warehouse",
    path: "/warehouse",
    title: "货仓管理",
    component: Middleware,
    routes: [
      {
        name: "position",
        title: "仓位管理",
        path: "/warehouse/position",
        component: lazy(() => import("@/page/warehouse/position")),
      },
      {
        name: "product",
        title: "产品出入库",
        path: "/warehouse/product",
        component: lazy(() => import("@/page/warehouse/product")),
      },
    ],
  },
] as TypeRoute.RouteListType;
