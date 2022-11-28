import 'dayjs/locale/zh-cn';
import store from '@/store';
import routes from './router/paths';
import { ConfigProvider } from 'antd';
import { Provider } from 'react-redux';
import { createRoot } from 'react-dom/client';
import { RouterProvider } from "react-router-dom";

import { ANTD_DEFAULT_CONFIG } from '@/config/antd';

const Root = (
  <ConfigProvider {...ANTD_DEFAULT_CONFIG}>
    <Provider store={store}>
      <RouterProvider router={routes} />
    </Provider>
  </ConfigProvider>
);

createRoot(document.getElementById('root')!).render(Root);
