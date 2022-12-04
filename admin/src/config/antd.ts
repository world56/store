import zhCN from "antd/locale/zh_CN";

import type { ConfigProviderProps } from "antd/es/config-provider";

/**
 * @name ANTD_DEFAULT_CONFIG antd 默认配置
 * @see https://ant.design/components/config-provider-cn
 */
export const ANTD_DEFAULT_CONFIG: ConfigProviderProps = {
  locale: zhCN,
  form: {
    validateMessages: { required: "该字段不得为空" },
  },
};
