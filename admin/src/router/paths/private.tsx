import { lazy } from "react";
import { Outlet } from 'react-router-dom';

import type { TypeRoute } from "@/interface/route";

export default [
  {
    id: "system",
    path: "/system",
    title: "系统管理",
    element: Outlet,
    children: [
      {
        id: "department",
        title: "部门列表",
        path: "/system/department",
        element: lazy(() => import("@/page/system/department")),
      },
      {
        id: "user",
        title: "用户列表",
        path: "/system/user",
        element: lazy(() => import("@/page/system/user")),
      },
      {
        id: "role",
        title: "角色列表",
        path: "/system/role",
        element: lazy(() => import("@/page/system/role")),
      },
      {
        id: "permission",
        title: "权限列表",
        path: "/system/permission",
        element: lazy(() => import("@/page/system/permission")),
      },
    ],
  },
  {
    id: "purchase",
    path: "/purchase",
    title: "采购管理",
    element: Outlet,
    children: [
      {
        id: "supplierOrder",
        title: "采购订单",
        path: "/purchase/supplierOrder",
        element: lazy(() => import("@/page/purchase/order/list")),
      },
      {
        id: "supplierOrderEdit",
        title: "编辑采购订单",
        hide: true,
        path: "/purchase/supplierOrderEdit",
        element: lazy(() => import("@/page/purchase/order/edit")),
      },
      {
        id: "supplierList",
        path: "/purchase/supplierList",
        title: "供应商",
        element: lazy(() => import("@/page/purchase/supplier/list")),
      },
      {
        id: "supplierDetails",
        title: "供应商详情",
        hide: true,
        path: "/purchase/supplierDetails/:id",
        element: lazy(() => import("@/page/purchase/supplier/details")),
      },
      {
        id: "supplierProduct",
        title: "产品库",
        path: "/purchase/supplierProduct",
        element: lazy(() => import("@/page/purchase/product/list")),
      },
      {
        id: "supplierProductDetails",
        title: "产品详情",
        hide: true,
        path: "/purchase/supplierProductDetails/:id",
        element: lazy(() => import("@/page/purchase/product/details")),
      },
      {
        id: "spec",
        title: "产品规格",
        path: "/purchase/spec",
        element: lazy(() => import("@/page/purchase/spec")),
      },
    ],
  },
  {
    id: "warehouse",
    path: "/warehouse",
    title: "货仓管理",
    element: Outlet,
    children: [
      {
        id: "warehousing",
        title: "待入库",
        path: "/warehouse/warehousing",
        element: lazy(() => import("@/page/warehouse/warehousing/list")),
      },
      {
        id: "warehouseAudit",
        title: "库存审核",
        path: "/warehouse/warehouseAudit",
        element: lazy(() => import("@/page/warehouse/audit")),
      },
      {
        id: "warehousingPurchase",
        title: "采购入库",
        hide: true,
        path: "/warehouse/warehousingPurchase/:id",
        element: lazy(() => import("@/page/warehouse/warehousing/purchase")),
      },
      {
        id: "position",
        title: "仓位管理",
        path: "/warehouse/position",
        element: lazy(() => import("@/page/warehouse/position")),
      },
      {
        id: "product",
        title: "产品盘点",
        path: "/warehouse/product",
        element: lazy(() => import("@/page/warehouse/product")),
      },
    ],
  },
  {
    id: 'finance',
    path: '/finance',
    title: '财务管理',
    element: Outlet,
    children: [
      {
        id: 'financePayment',
        title: '应付款',
        path: '/finance/financePayment',
        element: lazy(() => import('@/page/finance/payment'))
      },
      {
        id: 'financeAccount',
        title: '供应商收款账户',
        path: '/finance/financeAccount',
        element: lazy(() => import('@/page/finance/account'))
      }
    ]
  }
] as TypeRoute.Route[];