import { Popconfirm } from 'antd';

interface TabaleEditDelProps {
  /** @param onEdit 编辑按钮 值为void 不显示该按钮 */
  onEdit(): void;
  /** @param onRemove 删除按钮 值为void 不显示该按钮 */
  onRemove(): void;
};

/**
 * @name TabaleEditDel 表格组件 编辑、删除操作按钮
 * @description 如果传递了对应方法函数，则显示对应按钮，否则不显示按钮。
 */
const TabaleEditDel: React.FC<Partial<TabaleEditDelProps>> = ({
  onEdit,
  onRemove
}) => (
  <>
    {onEdit ? <span onClick={onEdit} className='processing cp m-r-5'>编辑</span> : null}
    {onRemove ? <Popconfirm title='确定删除该角色？删除后无法恢复！' onConfirm={onRemove}>
      <span className='error cp'>删除</span>
    </Popconfirm> : null}
  </>
);

export default TabaleEditDel;
