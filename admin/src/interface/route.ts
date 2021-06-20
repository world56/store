import type { ComponentType } from "react";
// import type { RouteComponentProps } from "react-router-dom";

export interface Routes {
  nav?: 1 | 0;
  name: string;
  path: string;
  title?: string;
  exact?: boolean;
  routes?: Routes[];
  component: ComponentType<RouteMap>;
};

export type RoutePropsList = Routes[];

export type RouteMap = {
  routes: RoutePropsList;
};

// export type InitProps = RouteComponentProps & RouteMap;
