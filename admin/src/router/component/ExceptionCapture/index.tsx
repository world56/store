import Error from './Error';
import { useRouteError } from 'react-router-dom';

const RouteError = () => {

  const error = useRouteError();

  if (error) {
    return <Error />
  } else {
    console.log(error);
    return <span>???</span>
  }

};

export default RouteError;
