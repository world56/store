import { lazy } from 'react';
import privateRoutes from './private';
import Authentication from '../component/Authentication';

import type { TypeRoute } from '@/interface/route';

export default [
  {
    id: 'login',
    path: "/login",
    element: lazy(() => import("@/page/basics/login"))
  },
  {
    id: 'index',
    path: '/',
    loader: Authentication,
    element: lazy(() => import('@/components/Entrance')),
    children: privateRoutes,
  },
] as TypeRoute.Route[];
