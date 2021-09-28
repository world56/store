import Shaking from './Shaking';
import { Switch } from 'react-router-dom';

import type { TypeRoute } from '@/interface/route';

export default ({ routes = [] }: TypeRoute.RouteMapType) => (
  <Switch>
    {routes.map(v => <Shaking key={v.name} {...v} />)}
  </Switch>
);
