import { lazy } from 'react';
import privateRoutes from './private';
import LoaderWhiteList from '../loader/WhiteList'
import LoaderAuthentication from '../loader/Authentication';
import ExceptionCapture from '../component/ExceptionCapture';

import type { TypeRoute } from '@/interface/route';

export default [
  {
    id: 'login',
    path: "/login",
    loader: LoaderWhiteList,
    errorElement: <ExceptionCapture />,
    element: lazy(() => import("@/page/basics/login"))
  },
  {
    id: 'index',
    path: '/',
    loader: LoaderAuthentication,
    errorElement: <ExceptionCapture />,
    element: lazy(() => import('@/components/Entrance')),
    children: privateRoutes,
  },
] as TypeRoute.Route[];
