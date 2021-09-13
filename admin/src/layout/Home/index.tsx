import { Layout, Menu } from 'antd';
import { MenuUnfoldOutlined } from '@ant-design/icons';

const { Header, Sider, Content } = Layout;

const Home: React.FC = (props) => {

  return (
    <Layout>
      <Sider theme='light'>
        <Menu theme='light'>
          <Menu.Item key="1">nav</Menu.Item>
        </Menu>
      </Sider>
      <Layout>
        <Header>
          <MenuUnfoldOutlined />
        </Header>
        <Content>
          Content
        </Content>
      </Layout>
    </Layout>
  );
};

export default Home;
