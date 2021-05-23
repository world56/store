import { Router } from '@/router';
import RouteView from './RoutView';
import { BrowserRouter, Switch } from 'react-router-dom';
export default () => (
  <BrowserRouter>
    <Switch>
      <RouteView routes={Router} />
    </Switch>
  </BrowserRouter>
);