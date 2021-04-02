import { BrowserRouter, Switch } from 'react-router-dom';
import RouteView from './RoutView';
import { Router } from '@/router';
export default () => (
  <BrowserRouter>
    <Switch>
      <RouteView routes={Router} />
    </Switch>
  </BrowserRouter>
);