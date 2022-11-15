import routes from './pubilc';
import { Suspense } from 'react';
import Loading from '../component/Loading';
import { Route, createRoutesFromElements, createBrowserRouter } from "react-router-dom";

import type { TypeRoute } from '@/interface/route';

/**
 * @name loadLazyRoutes 分割异步路由
 * @param routes 路由树
 * @desc 利用 React <Suspense/> 批量生成
 */
const loadLazyRoutes = (routes: TypeRoute.Route[]) => (
  routes.map(r => <Route
    key={r.id}
    path={r.path!}
    loader={r.loader}
    errorElement={r.errorElement}
    element={
      <Suspense fallback={<Loading />}>
        <r.element />
      </Suspense>
    }>
    {r.children?.length ? loadLazyRoutes(r.children) : null}
  </Route>)
);
const lazyRoutes = loadLazyRoutes(routes);
const transform = createRoutesFromElements(lazyRoutes);

export default createBrowserRouter(transform);
