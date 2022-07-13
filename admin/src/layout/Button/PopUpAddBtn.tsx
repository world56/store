import { Button } from 'antd';
import { PlusOutlined } from '@ant-design/icons';

import type { ButtonProps } from 'antd/lib/button/button';

/**
 * @name PopUpAddBtn 弹窗新增List按钮
 */
const PopUpAddBtn: React.FC<ButtonProps> = ({ children, ...props }) => (
  <Button
    {...props}
    type="dashed"
    style={{ width: '100%' }}
    icon={<PlusOutlined />}
  >
    {children}
  </Button>
);

export default PopUpAddBtn;
