import type { RouteObject } from "@remix-run/router";
import React from "react";

export namespace TypeRoute {
  export interface Route extends Omit<RouteObject, "children" | "element"> {
    title?: string;
    hide?: boolean | undefined;
    children?: Route[];
    element: React.LazyExoticComponent<React.ComponentType>;
  }
}
