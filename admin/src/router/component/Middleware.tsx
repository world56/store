import RouteView from './RoutView';

import type { TypeRoute } from '@/interface/route';

const Middleware = ({ routes = [] }: TypeRoute.RouteMapType) => <RouteView routes={routes} />;

export default Middleware;
