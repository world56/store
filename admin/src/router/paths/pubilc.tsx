import { lazy } from 'react';
import privateRoutes from './private';
import LoaderWhiteList from '../loader/WhiteList'
import LoaderAuthentication from '../loader/Authentication';

import type { TypeRoute } from '@/interface/route';

export default [
  {
    id: 'login',
    path: "/login",
    loader: LoaderWhiteList,
    element: lazy(() => import("@/page/basics/login"))
  },
  {
    id: 'index',
    path: '/',
    loader: LoaderAuthentication,
    element: lazy(() => import('@/components/Entrance')),
    children: privateRoutes,
  },
] as TypeRoute.Route[];
