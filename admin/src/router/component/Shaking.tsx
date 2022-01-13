import { Suspense } from 'react';
import SafeFilter from './SafeFilter';
import { Route } from 'react-router-dom';
import Loading from '@/layout/PageLoading';

import type { TypeRoute } from '@/interface/route';

const Shaking = (r: TypeRoute.RouteParamType) => (
  <Suspense fallback={<Loading />}>
    <Route path={r.path} exact={r.exact} render={p => SafeFilter(p, r)} />
  </Suspense>
);

export default Shaking;
