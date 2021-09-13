import { Button } from 'antd';
import { logOut } from '@/api/user';

const Home: React.FC = (props) => {

  console.log('@props', props);

  return <>
    <h1>
      <Button onClick={logOut}>onclick</Button>
    </h1>
  </>
};

export default Home;
