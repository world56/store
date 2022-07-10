import Loading from './Loading';
import routes from '../paths/pubilc';
import { Suspense, useCallback } from 'react';
import ExceptionCapture from './ExceptionCapture';
import { DataBrowserRouter, Route } from "react-router-dom";

import type { TypeRoute } from "@/interface/route";

const Entrance = () => {

  const createRouteMaps = useCallback((routes: TypeRoute.Route[]) => (
    routes.map(r => <Route
      key={r.id}
      path={r.path!}
      loader={r.loader}
      element={
        <Suspense fallback={<Loading />}>
          <r.element />
        </Suspense>
      }>
      {r.children?.length ? createRouteMaps(r.children) : null}
    </Route>)
  ), []);

  return (
    <DataBrowserRouter fallbackElement={<Loading />}>
      <Route errorElement={<ExceptionCapture />}>
        {createRouteMaps(routes)}
      </Route>
    </DataBrowserRouter>
  );
};

export default Entrance;
