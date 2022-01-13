import Shaking from './Shaking';
import { Switch } from 'react-router-dom';

import type { TypeRoute } from '@/interface/route';

const RoutView = ({ routes = [] }: TypeRoute.RouteMapType) => (
  <Switch>
    {routes.map(v => <Shaking key={v.name} {...v} />)}
  </Switch>
);

export default RoutView;
