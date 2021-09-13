import Shaking from './Shaking';
import { Switch } from 'react-router-dom';

import type { RouteMap } from '@/interface/route';

export default ({ routes = [] }: RouteMap) => (
  <Switch>
    {routes.map(v => <Shaking key={v.name} {...v} />)}
  </Switch>
);
