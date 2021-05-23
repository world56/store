import store from '@/store';
import ReactDOM from 'react-dom';
import { Entrance } from '@/router';
import { ConfigProvider } from 'antd';
import { Provider } from 'react-redux';
import locale from 'antd/es/locale/zh_CN';

const Root = (
  <ConfigProvider locale={locale}>
    <Provider store={store}>
      <Entrance />
    </Provider>
  </ConfigProvider>
);

ReactDOM.render(Root, document.getElementById('root'));
