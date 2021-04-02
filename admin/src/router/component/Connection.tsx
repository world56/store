import RouteView from './RoutView';
import type { RouteMap } from '@/interface/route';
export default ({ routes = [] }: RouteMap): JSX.Element => <RouteView routes={routes} />;