import styles from './index.module.sass';
import { Switch as AntdSwitch, Tooltip } from "antd";
import { QuestionCircleOutlined } from '@ant-design/icons';

import { ENUM_COMMON } from '@/enum/common';

import type { SwitchProps, TooltipProps } from 'antd';

interface TypeRestSwitchProps extends Omit<SwitchProps, 'checked'> {
  /**
   * @param checked 0=false 1=true 反之亦然
   * @description 原组件仅支持布尔值，新增了对Int类型的支持
   */
  checked?: number | boolean;
}

interface TypeSwitchProps extends React.FC<TypeRestSwitchProps> {
  /**
   * @name Title Table columns title参数
   */
  Title: typeof Title;
};

const Title: React.FC<TooltipProps> = (props) => (
  <Tooltip {...props}>
    <span>
      状态&nbsp;<QuestionCircleOutlined />
    </span>
  </Tooltip>
);

/**
 * @name Switch 变更状态
 */
const Switch: TypeSwitchProps = ({ checked, ...props }) => (
  <AntdSwitch
    checkedChildren="激活"
    unCheckedChildren="冻结"
    className={styles.switch}
    checked={typeof checked === 'number' ? Boolean(checked) : checked}
    style={{ background: checked ? ENUM_COMMON.COLOR.GREEN : ENUM_COMMON.COLOR.RED }}
    {...props}
  />
);

Switch.Title = Title;

export default Switch;
