import { lazy } from "react";
import type * as RouteTypes from "@/interface/route";

const Connection = lazy(() => import("../component/Connection"));

const routes: RouteTypes.RoutePropsList = [
  {
    name: "user",
    path: "/user",
    component: Connection,
    routes: [
      {
        name: "login",
        path: "/user/login",
        exact: true,
        component: lazy(() => import("@/page/basics/login")),
      },
    ],
  },
  {
    name: "home",
    path: "/",
    component: lazy(() => import("@/page/home")),
  },
];

export default routes;
