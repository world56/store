import { testJWT } from '@/api/user';

const Home: React.FC = (props) => {


  async function req() {
    await testJWT();
  }

  return <>
    <h1 onClick={req}>Home</h1>
  </>
};

export default Home;
