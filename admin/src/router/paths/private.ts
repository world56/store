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
    name: "purchase",
    path: "/purchase",
    title: "采购管理",
    component: Middleware,
    routes: [
      {
        name: "supplierOrder",
        title: "采购订单列表",
        path: "/purchase/supplierOrder",
        component: lazy(() => import("@/page/purchase/order/list")),
      },
      {
        name: "supplierOrderEdit",
        title: "采购订单",
        hidden: true,
        path: "/purchase/supplierOrderEdit",
        component: lazy(() => import("@/page/purchase/order/edit")),
      },
      {
        name: "spec",
        title: "产品规格",
        path: "/purchase/spec",
        component: lazy(() => import("@/page/purchase/spec")),
      },
      {
        name: "supplierProduct",
        title: "供应产品库",
        path: "/purchase/supplierProduct",
        component: lazy(() => import("@/page/purchase/product/list")),
      },
      {
        name: "supplierProductDetails",
        title: "产品详情",
        hidden: true,
        path: "/purchase/supplierProductDetails/:id",
        component: lazy(() => import("@/page/purchase/product/details")),
      },
      {
        name: "supplierList",
        path: "/purchase/supplierList",
        title: "供应商列表",
        component: lazy(() => import("@/page/purchase/supplier/list")),
      },
      {
        name: "supplierDetails",
        title: "供应商详情",
        hidden: true,
        path: "/purchase/supplierDetails/:id",
        component: lazy(() => import("@/page/purchase/supplier/details")),
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
        title: "产品盘点",
        path: "/warehouse/product",
        component: lazy(() => import("@/page/warehouse/product")),
      },
    ],
  },
] as TypeRoute.RouteListType;
