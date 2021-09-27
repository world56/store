import { lazy } from "react";
import privateRoutes from "./private";

import type { TypeRoute } from "@/interface/route";

const Middleware = lazy(() => import("../component/Middleware"));

const routes: TypeRoute.RouteListType = [
  {
    name: "user",
    path: "/user",
    component: Middleware,
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
    component: lazy(() => import("@/components/Entrance")),
    routes: privateRoutes,
  },
];

export default routes;
