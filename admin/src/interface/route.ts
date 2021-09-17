import type { ComponentType } from "react";
import type { RouteComponentProps } from "react-router-dom";

/**
 * @name RouteType 路由类型
 */
export namespace TypeRoute {
  export type InitRoutePropsType = RouteComponentProps & RouteMapType;

  export interface RouteParamType {
    nav?: boolean;
    name: string;
    path: string;
    title?: string;
    exact?: boolean;
    routes?: RouteParamType[];
    isHidden?:boolean;
    component: ComponentType<InitRoutePropsType>;
  }

  export type RouteListType = RouteParamType[];

  export interface RouteMapType {
    routes: RouteListType;
  }
}
