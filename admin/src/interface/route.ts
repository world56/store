import { ComponentType } from "react";
import { RouteComponentProps } from "react-router-dom";

export interface Routes {
  nav?: 1 | 0;
  name: string;
  path: string;
  title?: string;
  exact?: boolean;
  routes?: Routes[];
  component: ComponentType<InitProps>;
};

export type RoutePropsList = Routes[];

export type RouteMap = {
  routes: RoutePropsList;
};

export type InitProps = RouteComponentProps & RouteMap;
