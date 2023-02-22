import { Result, Button } from 'antd';
import styles from './index.module.sass';
import { useNavigate, useRouteError } from 'react-router-dom';

import { ENUM_HTTP } from "@/enum/http";

import type { ResultStatusType } from 'antd/es/result';

interface TypeRouteErrorParam {
  data: unknown;
  status: ResultStatusType;
  statusText: string;
}

/**
 * @name getRouteErrorStatus 过滤出当前状态以及提示语
 */
function getRouteErrorStatus(params: TypeRouteErrorParam) {
  const { status, statusText } = params;
  switch (status) {
    case ENUM_HTTP.HTTP_CODE.NOT_FOUND:
      return { title: '未知的页面地址', status, subTitle: '抱歉，您访问的页面不存在。' };
    case ENUM_HTTP.HTTP_CODE.FORBIDDEN:
      return { title: '未知的页面地址', status, subTitle: '抱歉，您无权访问此页面。' };
    default:
      return {
        title: "发生了未知错误",
        subTitle: statusText,
        status: ENUM_HTTP.HTTP_CODE.INTERNAL_SERVER_ERROR as ResultStatusType
      }
  };
};

const RouteError = () => {

  const error = useRouteError() as TypeRouteErrorParam;

  const navigate = useNavigate();

  function onJump() {
    navigate('/', { replace: true });
  }

  return <div className={styles.status}>
    <Result
      {...getRouteErrorStatus(error)}
      extra={<Button onClick={onJump} type="primary">返回首页</Button>}
    />
  </div>

};

export default RouteError;
