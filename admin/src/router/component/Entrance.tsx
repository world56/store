import RouteView from './RoutView';
import { RouterTree, History } from '@/router';
import { Switch, Router } from 'react-router-dom';
export default () => (
  <Router history={History} >
    <Switch>
      <RouteView routes={RouterTree} />
    </Switch>
  </Router>
);
