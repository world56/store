import type React from "react";
import type { RouteProps } from "react-router-dom";

export namespace TypeRoute {
  export interface Route extends Omit<RouteProps, "children" | "element"> {
    title?: string;
    hide?: boolean | undefined;
    children?: Route[];
    element: React.LazyExoticComponent<React.ComponentType>;
  }
}
