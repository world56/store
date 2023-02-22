import Tag from './Tag';
import CategorySelect from './Select';
import styles from './index.module.sass';
import { getCategoryName } from './utils';
import { useCallback, useState } from 'react';
import { useActions, useStore } from '@/hooks';
import { Btn, BtnEditDel } from '@/layout/Button';
import SpecTemplate from './components/SpecTemplate';
import { Modal, List, Avatar, Button, Empty } from 'antd';
import { SyncOutlined, FontSizeOutlined } from '@ant-design/icons';
import EditUnit, { type TypeEditUnitProps } from './components/Edit';

import { CATEGORY_NAME } from './utils';

type TypeEditCategory = Pick<TypeEditUnitProps, 'visible' | 'id'>;

export interface TypeCategoryProps<T = (keyof typeof CATEGORY_NAME)> {
  type: T;
};

export interface TypeCategorys extends React.FC<TypeCategoryProps> {
  /**
 * @name Select 类目tag（HTML）
 */
  Tag: typeof Tag;
  /**
   * @name Select 类目选择
   */
  Select: typeof CategorySelect;
  /**
   * @name SpecTemplate 产品规格模板（批量选择规格）
   */
  SpecTemplate: typeof SpecTemplate;
};


/**
 * @name Categorys 类目管理
 */
const Categorys: TypeCategorys = ({ type }) => {

  const actions = useActions();
  const { category } = useStore();

  const [visible, setVisible] = useState(false);
  const [edit, setEdit] = useState<TypeEditCategory>({ visible: false });

  const getWarehouseUnit = useCallback(() => {
    actions.getCategory([type]);
  }, [actions, type]);

  function onEdit(id?: number) {
    const visible = !edit.visible;
    setEdit({ id, visible });
    id || getWarehouseUnit();
  };

  function visibleChange() {
    setVisible(b => !b);
  };

  const list = category[type]?.LIST;

  const name = `${getCategoryName(type)}类目`;

  return (
    <>
      <Modal
        title={name}
        open={visible}
        onCancel={visibleChange}
        className={styles.layout}
        footer={[
          <Button onClick={getWarehouseUnit} key='1' type="dashed" icon={<SyncOutlined />}>刷新</Button>,
          <Button onClick={() => onEdit()} key='2' type='primary' icon={<FontSizeOutlined />}>新增</Button>,
          <Button onClick={visibleChange} key='3'>返回</Button>,
        ]}
      >
        {list ? <List
          dataSource={list}
          itemLayout="horizontal"
          renderItem={item => (
            <List.Item actions={[<BtnEditDel value={item.id} onEdit={onEdit} />]}>
              <List.Item.Meta
                title={item.name}
                description={item.remark}
                avatar={<Avatar>{item.name}</Avatar>}
              />
            </List.Item>
          )}
        /> : <Empty />}
      </Modal>
      <Btn onClick={visibleChange}>管理类型</Btn>
      <EditUnit {...edit} type={type} onClose={onEdit}
      />
    </>
  );
};

Categorys.Tag = Tag;
Categorys.Select = CategorySelect;
Categorys.SpecTemplate = SpecTemplate;

export default Categorys;
