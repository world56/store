import { Switch as AntdSwitch } from 'antd';

import { ENUM_COMMON } from '@/enum/common';

import type { SwitchProps } from 'antd/lib/switch';

type TypeFormSwitchExclude = 'checked' | 'onChange' | 'checkedChildren' | 'unCheckedChildren';

interface TypeFormSwitchProps<T = ENUM_COMMON.STATUS> extends Omit<SwitchProps, TypeFormSwitchExclude> {
  value?: T;
  onChange?(val: T): void;
};

/**
 * @name Switch 自定义定制Switch组件 
 * @param value 1:激活 0:冻结
 */
const Switch: React.FC<TypeFormSwitchProps> = ({
  value,
  onChange,
  ...props
}) => {

  function onSwitchValueChange(checked: boolean) {
    onChange?.(Number(checked));
  };

  return (
    <AntdSwitch
      {...props}
      checkedChildren="激活"
      unCheckedChildren="冻结"
      checked={Boolean(value)}
      onChange={onSwitchValueChange}
    />
  );
};

export default Switch;
