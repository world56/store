import type { ComponentType } from "react";

/**
 * @name RouteType 路由类型
 */
export namespace TypeRoute {
  export interface RouteParamType {
    name: string;
    path: string;
    title?: string;
    exact?: boolean;
    hidden?: boolean;
    routes?: RouteParamType[];
    component: ComponentType<InitRoutePropsType>;
  }

  export type RouteListType = RouteParamType[];

  export interface RouteMapType {
    routes: RouteListType;
  }

  export type InitRoutePropsType = RouteMapType;
}
