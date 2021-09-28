import RouteView from './RoutView';

import type { TypeRoute } from '@/interface/route';

export default ({ routes = [] }: TypeRoute.RouteMapType) => <RouteView routes={routes} />;
