import RouteView from './RoutView';
import { RouterTree, History } from '@/router';
import { Switch, Router } from 'react-router-dom';

const Entrance = () => (
  <Router history={History} >
    <Switch>
      <RouteView routes={RouterTree} />
    </Switch>
  </Router>
);

export default Entrance;

