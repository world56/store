import React from 'react';
import SafeFilter from './SafeFilter';
import { Route } from 'react-router-dom';
import Loading from '@/layout/PageLoading';

import type * as RouteTypes from '@/interface/route';

export default (r: RouteTypes.Routes) => {
  const createModule = React.useCallback(p => SafeFilter(p, r), [r]);
  return (
    <React.Suspense fallback={<Loading />}>
      <Route path={r.path} exact={r.exact} render={createModule} />
    </React.Suspense>
  );
};
