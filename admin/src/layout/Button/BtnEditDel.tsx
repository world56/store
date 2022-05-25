import Btn from './Btn';
import { Popconfirm } from 'antd';

interface TypeBtnEditDelProps<T = unknown> {
  /** @name onEdit 编辑按钮 值为void 不显示该按钮 */
  onEdit?(val: T): void;
  /** @name onRemove 删除按钮 值为void 不显示该按钮 */
  onRemove?(val: T): void;
  /** @param value 传递给onEdit、onRemove方法的参数 */
  value: T;
};

/**
 * @name BtnEditDel 表格组件 编辑、删除操作按钮
 * @description 如果传递了对应方法函数，则显示对应按钮，否则不显示按钮。
 */
const BtnEditDel: React.FC<TypeBtnEditDelProps> = ({
  value,
  onEdit,
  onRemove
}) => (
  <>
    {onEdit ? <Btn onClick={() => onEdit(value)}>编辑</Btn> : null}
    {onRemove ? <Popconfirm title='确定删除？删除后无法恢复！' onConfirm={() => onRemove(value)}>
      <Btn type='danger'>删除</Btn>
    </Popconfirm> : null}
  </>
);

export default BtnEditDel;
