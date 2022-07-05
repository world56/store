import store from '@/store';
import ReactDOM from 'react-dom';
import { Entrance } from '@/router';
import { ConfigProvider } from 'antd';
import { Provider } from 'react-redux';
import locale from 'antd/es/locale/zh_CN';

const validateMessages = { required: "该字段不得为空" };

const Root = (
  <ConfigProvider form={{ validateMessages }} locale={locale}>
    <Provider store={store}>
      <Entrance />
    </Provider>
  </ConfigProvider>
);

ReactDOM.render(Root, document.getElementById('root'));
